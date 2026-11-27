import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import type { Customer } from "../../core/types";
import { readPreview } from "./csv";
import { createImportBatch } from "./index";

const header = "kod;nazev;email;adresa";
const csv = (text: string) => new Blob([text]);
const fixture = (name: string) =>
  csv(
    readFileSync(
      new URL(`../../../public/cviceni/zakaznici-${name}.csv`, import.meta.url),
      "utf8",
    ),
  );

describe("Náhled zákazníků z CSV", () => {
  it("přečte platný cvičný soubor včetně diakritiky a uvozovaného středníku", async () => {
    const result = await readPreview(fixture("platni"), []);
    expect(result.errors).toEqual([]);
    expect(result.rows).toEqual([
      {
        record: 1,
        customer: {
          code: "NOVY01",
          name: "Žlutý obchod",
          email: "kontakt@example.com",
          address: "Praha",
        },
      },
      {
        record: 2,
        customer: {
          code: "NOVY02",
          name: "Firma; ukázka",
          email: "",
          address: "Brno",
        },
      },
    ]);
  });

  it("zvládne BOM, CRLF, uvozovky uvnitř hodnot a víceřádkový záznam", async () => {
    const result = await readPreview(
      csv(
        `\uFEFF${header}\r\n x1 ;"Firma ""A""";;"ulice\r\nměsto"\r\nX2;;;Praha\r\n`,
      ),
      [],
    );
    expect(result.rows[0].customer).toEqual({
      code: "X1",
      name: 'Firma "A"',
      email: "",
      address: "ulice\r\nměsto",
    });
    expect(result.errors).toEqual(["Záznam 2: Chybí název."]);
  });

  it("odhalí chybějící název ve cvičném souboru a zablokuje i platný záznam", async () => {
    const result = await readPreview(fixture("chyba"), []);
    expect(result.errors).toEqual(["Záznam 2: Chybí název."]);
    const save = vi.fn(async () => {});
    const batch = createImportBatch(save);
    batch.stage(result);
    expect(batch.ready).toBe(false);
    expect(await batch.confirm()).toBe(0);
    expect(save).not.toHaveBeenCalled();
  });

  it("uvádí číslo záznamu u chybného e-mailu, sloupců i uvozovek", async () => {
    const result = await readPreview(
      csv(`${header}\nX1;Firma;bez-zavinace;\nX2;Firma;\nX3;"Firma;;`),
      [],
    );
    expect(result.errors).toEqual([
      "Záznam 1: Neplatný e-mail.",
      "Záznam 2: Očekávají se 4 sloupce.",
      "Záznam 3: Nesprávné uvozovky v CSV.",
    ]);
  });

  it("hlásí chybějící kód a duplicity v souboru i v prostoru bez ohledu na velikost písmen", async () => {
    const result = await readPreview(
      csv(
        `${header}\nx1;Firma;;\n X1 ;Jiná firma;;\nAlFa;Existující;;\n;Bez kódu;;`,
      ),
      [{ code: "alfa" }],
    );
    expect(result.errors).toEqual([
      "Záznam 2: Kód se opakuje ze záznamu 1.",
      "Záznam 3: Kód již existuje v tomto prostoru.",
      "Záznam 4: Chybí kód.",
    ]);
  });

  it("odmítne chybnou hlavičku, prázdnou dávku a neplatné UTF-8", async () => {
    expect(
      (await readPreview(csv("kod,nazev,email,adresa"), [])).errors[0],
    ).toMatch(/Hlavička/);
    expect((await readPreview(csv(header + "\n"), [])).errors[0]).toMatch(
      /žádné záznamy/,
    );
    expect(
      (await readPreview(new Blob([Uint8Array.of(0xc3, 0x28)]), [])).errors[0],
    ).toMatch(/UTF-8/);
  });

  it("povolí 100 záznamů a odmítne 101. záznam", async () => {
    const records = Array.from({ length: 100 }, (_, i) => `X${i};Firma;;`);
    const text = [header, ...records].join("\n");
    expect((await readPreview(csv(text), [])).rows).toHaveLength(100);
    const result = await readPreview(csv(text + "\nX100;Firma;;"), []);
    expect(result.errors[0]).toMatch(/^Záznam 101:.*100 záznamů/);
  });

  it("měří limit 100 kB v bajtech včetně diakritiky", async () => {
    const prefix = `${header}\nX;Žluťoučký;"";`;
    const bytes = csv(prefix).size;
    const atLimit = csv(prefix + " ".repeat(100_000 - bytes));
    expect((await readPreview(atLimit, [])).errors).toEqual([]);
    const overLimit = new Blob([atLimit, " "]);
    expect((await readPreview(overLimit, [])).errors).toEqual([
      "Soubor smí mít nejvýše 100 kB.",
    ]);
  });
});

describe("Potvrzení importu", () => {
  it("náhled ani zrušení nevolá zápis", async () => {
    const save = vi.fn(async () => {});
    const batch = createImportBatch(save);
    batch.stage(await readPreview(fixture("platni"), []));
    expect(batch.ready).toBe(true);
    expect(save).not.toHaveBeenCalled();
    batch.clear();
    expect(await batch.confirm()).toBe(0);
    expect(save).not.toHaveBeenCalled();
  });

  it("odešle celou dávku jednou a další náhled označí uložené kódy", async () => {
    let finish!: () => void;
    const pending = new Promise<void>((resolve) => {
      finish = resolve;
    });
    const save = vi.fn<(rows: Customer[]) => Promise<void>>(() => pending);
    const batch = createImportBatch(save);
    const file = fixture("platni");
    batch.stage(await readPreview(file, []));
    const confirmed = batch.confirm();
    expect(batch.saving).toBe(true);
    expect(await batch.confirm()).toBe(0);
    const rows = save.mock.lastCall?.[0];
    expect(rows?.map(({ code }) => code)).toEqual(["NOVY01", "NOVY02"]);
    expect(rows?.[0].id).toBeTruthy();
    expect(rows?.[0].id).not.toBe(rows?.[1].id);
    finish();
    expect(await confirmed).toBe(2);
    expect(await batch.confirm()).toBe(0);
    expect(save).toHaveBeenCalledTimes(1);
    expect((await readPreview(file, rows ?? [])).errors).toHaveLength(2);
  });

  it("propustí chybu zápisu a při opakování použije tutéž dávku", async () => {
    const save = vi
      .fn<(rows: Customer[]) => Promise<void>>()
      .mockRejectedValueOnce(Error("Kód již existuje"))
      .mockResolvedValueOnce(undefined);
    const batch = createImportBatch(save);
    batch.stage(await readPreview(fixture("platni"), []));
    await expect(batch.confirm()).rejects.toThrow("Kód již existuje");
    expect(batch.ready).toBe(true);
    expect(await batch.confirm()).toBe(2);
    expect(save.mock.calls[1][0]).toEqual(save.mock.calls[0][0]);
    expect(batch.ready).toBe(false);
  });
});
