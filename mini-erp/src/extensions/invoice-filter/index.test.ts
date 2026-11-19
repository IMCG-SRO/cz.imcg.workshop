import { afterEach, expect, it, vi } from "vitest";
import { today } from "../../core/rules";
import { seed } from "../../core/seed";
import { bindFilter, invoiceFilter } from "./index";

const workshopDay = "2026-11-27";
const invoices = seed(workshopDay).invoices;
const allNumbers = ["FA-001", "FA-002", "FA-003", "FA-004"];

type Filters = NonNullable<Parameters<typeof invoiceFilter>[2]>;
const cases: Array<[Filters["payment"], Filters["dueDate"], string[]]> = [
  ["all", "all", allNumbers],
  ["unpaid", "all", ["FA-001", "FA-002", "FA-003"]],
  ["paid", "all", ["FA-004"]],
  ["all", "overdue", ["FA-001", "FA-004"]],
  ["all", "current", ["FA-002", "FA-003"]],
  ["unpaid", "overdue", ["FA-001"]],
  ["paid", "overdue", ["FA-004"]],
  ["unpaid", "current", ["FA-002", "FA-003"]],
  ["paid", "current", []],
];

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it.each(cases)(
  "úhrada %s a splatnost %s → %j",
  (payment, dueDate, expected) => {
    const result = invoiceFilter(invoices, workshopDay, { payment, dueDate });
    expect(result.map((invoice) => invoice.number)).toEqual(expected);
    expect(invoices).toEqual(seed(workshopDay).invoices);
  },
);

it("použije pražskou půlnoc a rozliší včerejší, dnešní a zítřejší splatnost", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-11-26T23:00:00Z"));
  const pragueDay = today();
  expect(pragueDay).toBe(workshopDay);
  const withTomorrow = invoices.map((invoice) =>
    invoice.number === "FA-003" ? { ...invoice, dueOn: "2026-11-28" } : invoice,
  );

  const overdue = invoiceFilter(withTomorrow, pragueDay, {
    payment: "all",
    dueDate: "overdue",
  });
  const current = invoiceFilter(withTomorrow, pragueDay, {
    payment: "all",
    dueDate: "current",
  });
  expect(overdue.map((invoice) => invoice.dueOn)).toEqual([
    "2026-11-26",
    "2026-11-22",
  ]);
  expect(current.map((invoice) => invoice.dueOn)).toEqual([
    "2026-11-27",
    "2026-11-28",
  ]);
});

it("výchozí stav i reset zobrazí všechny faktury", () => {
  const controls = [
    "invoice-filter-payment",
    "invoice-filter-due-date",
    "invoice-filter-reset",
  ].map((id) =>
    Object.assign(new EventTarget(), { id, value: "all", focus: vi.fn() }),
  );
  const [payment, dueDate, reset] = controls;
  vi.stubGlobal("document", {
    querySelector: (selector: string) =>
      controls.find(({ id }) => selector === "#" + id),
    getElementById: (controlId: string) =>
      controls.find(({ id }) => id === controlId),
  });
  const visibleNumbers = () =>
    invoiceFilter(invoices, workshopDay).map((invoice) => invoice.number);
  expect(visibleNumbers()).toEqual(allNumbers);

  const refresh = vi.fn(visibleNumbers);
  bindFilter(refresh);
  payment.value = "paid";
  payment.dispatchEvent(new Event("change"));
  dueDate.value = "current";
  dueDate.dispatchEvent(new Event("change"));
  reset.dispatchEvent(new Event("click"));

  expect(refresh.mock.results.map(({ value }) => value)).toEqual([
    ["FA-004"],
    [],
    allNumbers,
  ]);
});
