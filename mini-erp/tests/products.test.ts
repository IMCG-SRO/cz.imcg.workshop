import { it, expect } from "vitest";
import { productCommand } from "../src/modules/product-domain";
import { seed } from "../src/core/seed";
it("produkt: validace ceny a nezměněné historické položky", () => {
  const s = seed();
  const old = s.orders[0].items[0].price;
  productCommand(
    s,
    { type: "product", data: { ...s.products[4], price: 123 } },
    { actor: "test", today: "2026-11-16" },
  );
  expect(s.orders[0].items[0].price).toBe(old);
  for (const price of [0, -1, 1.5, 100000001])
    expect(() =>
      productCommand(
        s,
        { type: "product", data: { id: "x", code: "X", name: "X", price } },
        { actor: "test", today: "2026-11-16" },
      ),
    ).toThrow();
});
