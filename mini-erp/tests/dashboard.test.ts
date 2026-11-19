import { it, expect } from "vitest";
import { summary } from "../src/modules/dashboard-domain";
import { seed } from "../src/core/seed";

const workshopDay = "2026-11-27";

it("přehled: dnešní splatnost není po splatnosti a zaplacená faktura se nezapočítá", () => {
  const s = seed(workshopDay);
  const x = summary(s, workshopDay);
  expect(s.invoices.map((invoice) => invoice.dueOn)).toEqual([
    "2026-11-26",
    "2026-11-27",
    "2026-12-27",
    "2026-11-22",
  ]);
  expect(x.unpaid).toBe(1080000);
  expect(x.overdue).toBe(180000);
  expect(x.overdueCount).toBe(1);
});
it("prázdný prostor má nulový přehled", () =>
  expect(
    summary(
      { customers: [], products: [], orders: [], invoices: [] },
      workshopDay,
    ),
  ).toEqual({
    customers: 0,
    orders: 0,
    unpaid: 0,
    overdue: 0,
    overdueCount: 0,
  }));
