import { describe, it, expect } from "vitest";
import { price, total, validDate, addDays } from "../src/core/rules";
describe("Peníze a kalendář", () => {
  it("počítá v haléřích bez desetinné odchylky", () => {
    expect(price("0,10") + price("0.20")).toBe(30);
    expect(total([{ productId: "1", name: "x", quantity: 3, price: 10 }])).toBe(
      30,
    );
  });
  it("odmítne nepovolenou cenu", () => {
    for (const v of ["0", "-1", "1.001", "abc", "1000001"])
      expect(() => price(v)).toThrow();
  });
  it("kontroluje skutečný kalendář a přechod roku", () => {
    expect(validDate("2026-02-30")).toBe(false);
    expect(validDate("2026-02-28")).toBe(true);
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
  });
});
