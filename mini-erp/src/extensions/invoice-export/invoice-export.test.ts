import { afterEach, describe, expect, it, vi } from "vitest";
import type { Invoice } from "../../core/types";
import { bindExport, invoicesToCsv } from "./index";

const store = vi.hoisted(() => ({
  workspace: "B",
  state: { invoices: [] as Invoice[] },
  online: true,
  client: { rpc: vi.fn() },
}));
vi.mock("../../core/store", () => store);

const header =
  "cislo_faktury;zakaznik;datum_vystaveni;datum_splatnosti;castka_czk;stav";
const invoice: Invoice = {
  id: "invoice-1",
  number: "FA-001",
  orderId: "order-1",
  customer: {
    id: "customer-1",
    code: "Z01",
    name: "Žluťoučký kůň",
    email: "",
    address: "",
  },
  items: [
    { productId: "product-1", name: "Položka", quantity: 1, price: 1205 },
  ],
  issuedOn: "2026-11-12",
  dueOn: "2026-11-26",
  paidOn: null,
  paidBy: null,
};

describe("CSV faktur", () => {
  it("zachová diakritiku, data a částky a rozliší oba stavy úhrady", () => {
    const paid = {
      ...invoice,
      number: "FA-002",
      paidOn: "2026-11-27",
      items: [{ ...invoice.items[0], quantity: 2, price: 90000 }],
    };
    expect(invoicesToCsv([invoice, paid])).toBe(
      "\uFEFF" +
        header +
        "\r\nFA-001;Žluťoučký kůň;2026-11-12;2026-11-26;12,05;Neuhrazená" +
        "\r\nFA-002;Žluťoučký kůň;2026-11-12;2026-11-26;1800,00;Uhrazená",
    );
  });

  it("zapíše pouze BOM a hlavičku pro prázdný prostor", () => {
    expect(invoicesToCsv([])).toBe("\uFEFF" + header);
  });

  it("escapuje středník, uvozovky i konce řádků uvnitř buňky", () => {
    const customer = {
      ...invoice.customer,
      name: 'Žluť; "kůň"\r\nPraha\nBrno\rPlzeň',
    };
    expect(invoicesToCsv([{ ...invoice, customer }])).toContain(
      '\r\nFA-001;"Žluť; ""kůň""\r\nPraha\nBrno\rPlzeň";2026-11-12;',
    );
  });

  it.each(["=", "+", "-", "@", " \t="])(
    "ochrání text začínající na %j v obou vstupních sloupcích",
    (prefix) => {
      const number = prefix + "1";
      const customer = { ...invoice.customer, name: prefix + '1;"firma"' };
      expect(invoicesToCsv([{ ...invoice, number, customer }])).toContain(
        `\r\n'${number};"'${prefix}1;""firma""";2026-11-12;`,
      );
    },
  );
});

describe("Stažení faktur", () => {
  afterEach(() => {
    store.online = true;
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  function bindDownload() {
    const link = { click: vi.fn(), remove: vi.fn() };
    let download!: () => Promise<void>;
    const control = {
      addEventListener: (_event: string, listener: typeof download) => {
        download = listener;
      },
      disabled: false,
      isConnected: true,
    };
    const notification = {
      setAttribute: vi.fn(),
      remove: vi.fn(),
      textContent: "",
    };
    vi.stubGlobal("document", {
      querySelector: () => control,
      createElement: (tag: string) => (tag === "a" ? link : notification),
      body: { append: vi.fn() },
    });
    const createUrl = vi
      .spyOn(URL, "createObjectURL")
      .mockReturnValue("blob:csv");
    vi.useFakeTimers();
    bindExport(store.state.invoices);
    return { download, createUrl, link, notification };
  }

  it("stáhne úplný snapshot aktuálního prostoru se správnými bajty BOM", async () => {
    store.workspace = "B";
    store.state.invoices = [invoice];
    const second = { ...invoice, number: "FA-002" };
    store.client.rpc.mockResolvedValueOnce({
      data: { invoices: [invoice, second] },
    });
    const { download, createUrl, link } = bindDownload();
    await download();

    expect(store.client.rpc).toHaveBeenLastCalledWith("erp_snapshot", {
      workspace: "B",
    });
    expect(link.click).toHaveBeenCalledOnce();
    const blob = createUrl.mock.calls[0][0] as Blob;
    const bytes = new Uint8Array(await blob.arrayBuffer());
    expect([...bytes.slice(0, 3)]).toEqual([0xef, 0xbb, 0xbf]);
    expect(new TextDecoder().decode(bytes)).toContain(
      "\r\nFA-002;Žluťoučký kůň;",
    );
    expect(store.state.invoices).toEqual([invoice]);
  });

  it("v demu použije úplný seznam z obrazovky", async () => {
    store.workspace = "B";
    store.online = false;
    const second = { ...invoice, number: "FA-002" };
    store.state.invoices = [invoice, second];
    const { download, createUrl } = bindDownload();
    await download();

    expect(await (createUrl.mock.calls[0][0] as Blob).text()).toBe(
      invoicesToCsv([invoice, second]).slice(1),
    );
  });

  it("při chybě čtení nezpřístupní staré faktury ani prázdný soubor", async () => {
    store.workspace = "C";
    store.state.invoices = [invoice];
    store.client.rpc.mockResolvedValueOnce({
      error: { message: "Prostor nelze načíst." },
    });
    const { download, createUrl, notification } = bindDownload();
    await download();

    expect(store.client.rpc).toHaveBeenLastCalledWith("erp_snapshot", {
      workspace: "C",
    });
    expect(createUrl).not.toHaveBeenCalled();
    expect(notification.textContent).toBe("Prostor nelze načíst.");
  });

  it("zahodí výsledek, pokud se během načítání změní prostor", async () => {
    store.workspace = "B";
    store.state.invoices = [invoice];
    store.client.rpc.mockImplementationOnce(async () => {
      store.workspace = "C";
      return { data: { invoices: [invoice] } };
    });
    const { download, createUrl } = bindDownload();
    await download();

    expect(createUrl).not.toHaveBeenCalled();
  });
});
