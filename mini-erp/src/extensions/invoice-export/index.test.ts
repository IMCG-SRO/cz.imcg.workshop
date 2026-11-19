import { expect, it } from "vitest";
import { seed } from "../../core/seed";
import { invoiceCsv } from "./index";

const day = "2026-11-27";
const header = "\uFEFFcislo_faktury;zakaznik;datum_vystaveni;datum_splatnosti;castka_czk;stav\r\n";

it("exportuje celý předaný prostor s pevnými sloupci, částkami a daty", () => {
  const invoices = seed(day).invoices;
  const before = structuredClone(invoices);
  expect(invoiceCsv(invoices, day)).toBe(header +
    "FA-001;Alfa kanceláře;2026-11-13;2026-11-26;1800,00;Po splatnosti\r\n" +
    "FA-002;Beta consulting;2026-11-13;2026-11-27;3600,00;Neuhrazená\r\n" +
    "FA-003;Delta servis;2026-11-13;2026-12-27;5400,00;Neuhrazená\r\n" +
    "FA-004;Nova technologie;2026-11-13;2026-11-22;7200,00;Uhrazená\r\n");
  expect(invoices).toEqual(before);
  expect([...new TextEncoder().encode(invoiceCsv(invoices, day)).slice(0, 3)])
    .toEqual([0xEF, 0xBB, 0xBF]);
});

it("v prázdném prostoru zapíše pouze hlavičku", () => {
  expect(invoiceCsv([], day)).toBe(header);
});

it("uzavře pole se středníkem, uvozovkami a koncem řádku", () => {
  const [invoice] = seed(day).invoices;
  invoice.customer.name = 'Žluťoučký; "kůň"\r\nPraha';
  invoice.items[0].price = 123456;
  expect(invoiceCsv([invoice], day)).toContain('FA-001;"Žluťoučký; ""kůň""\r\nPraha";2026-11-13;2026-11-26;1234,56;');
});

it.each(["=1+1", "+1+1", "-1+1", "@SUM(A1)", "  =1+1"])(
  "ošetří textový začátek vzorce %s",
  (value) => {
    const [invoice] = seed(day).invoices;
    invoice.number = value;
    invoice.customer.name = value;
    expect(invoiceCsv([invoice], day)).toContain(`'${value};'${value};`);
  },
);
