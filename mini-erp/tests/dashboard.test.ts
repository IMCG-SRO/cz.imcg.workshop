import { it, expect } from "vitest";
import { summary } from "../src/modules/dashboard-domain";
import { seed } from "../src/core/seed";
it("přehled: dnešní splatnost není po splatnosti a zaplacená faktura se nezapočítá", () => {
  const s = seed("2026-11-16");
  const x = summary(s, "2026-11-16");
  expect(x.unpaid).toBe(1080000);
  expect(x.overdue).toBe(180000);
  expect(x.overdueCount).toBe(1);
});
it("prázdný prostor má nulový přehled", () =>
  expect(
    summary(
      { customers: [], products: [], orders: [], invoices: [] },
      "2026-11-16",
    ),
  ).toEqual({
    customers: 0,
    orders: 0,
    unpaid: 0,
    overdue: 0,
    overdueCount: 0,
  }));
