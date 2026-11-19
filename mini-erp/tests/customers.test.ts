import { it, expect } from "vitest";
import { customerCommand } from "../src/modules/customer-domain";
import { seed } from "../src/core/seed";
const ctx = { actor: "test", today: "2026-11-16" };
it("zákazník: normalizace a odmítnutí duplicity", () => {
  const s = seed();
  customerCommand(
    s,
    {
      type: "customer",
      data: { id: "x", code: " new ", name: " Firma ", email: "", address: "" },
    },
    ctx,
  );
  expect(s.customers.at(-1)?.code).toBe("NEW");
  expect(() =>
    customerCommand(
      s,
      {
        type: "customer",
        data: {
          id: "y",
          code: "NEW",
          name: "Duplicitní",
          email: "",
          address: "",
        },
      },
      ctx,
    ),
  ).toThrow();
});
it("odmítne prázdný název a chybný e-mail", () => {
  for (const d of [
    { name: " ", email: "" },
    { name: "Firma", email: "bad" },
  ])
    expect(() =>
      customerCommand(
        seed(),
        { type: "customer", data: { id: "x", code: "X", address: "", ...d } },
        ctx,
      ),
    ).toThrow();
});
