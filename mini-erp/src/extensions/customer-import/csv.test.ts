import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { seed } from "../../core/seed";
import { parseCustomers, readCustomers } from "./csv";

const header = "kod;nazev;email;adresa";
const existing = seed("2026-11-27").customers;
const sample = (name: string) =>
  readFileSync(new URL(`../../../public/cviceni/zakaznici-${name}.csv`, import.meta.url), "utf8");

it("načte workshopový vzor s diakritikou, středníkem a volitelným e-mailem", () => {
  expect(parseCustomers(sample("platni"), existing)).toEqual({
    rows: [
      { code: "NOVY01", name: "Žlutý obchod", email: "kontakt@example.com", address: "Praha" },
      { code: "NOVY02", name: "Firma; ukázka", email: "", address: "Brno" },
    ],
    errors: [],
  });
});

it("přijme BOM, CRLF, mezery kolem hodnot a escapované uvozovky", async () => {
  const file = new File([`\uFEFF${header}\r\n novy ;"Firma ""A""; B";;"Praha\r\nBrno"\r\n`], "customers.csv");
  expect(await readCustomers(file, existing)).toEqual({
    rows: [{ code: "NOVY", name: 'Firma "A"; B', email: "", address: "Praha\r\nBrno" }],
    errors: [],
  });
});

it("při chybě druhého záznamu odmítne celou dávku", () => {
  const result = parseCustomers(sample("chyba"), existing);
  expect(result.rows).toEqual([]);
  expect(result.errors).toEqual(["Záznam 2 – Název je povinný, nejvýše 200 znaků."]);
});

it("rozpozná duplicitu v souboru i v aktuálním prostoru bez ohledu na velikost písmen", () => {
  const result = parseCustomers(`${header}\nnovy;Nový;;\nNOVY;Duplicitní;;\naLfA;Existující;;`, existing);
  expect(result.rows).toEqual([]);
  expect(result.errors).toEqual([
    "Záznam 2 – Kód NOVY je v souboru vícekrát.",
    "Záznam 3 – Kód ALFA již existuje v tomto prostoru.",
  ]);
});

it("vyžaduje správnou hlavičku a číslo chybného datového záznamu", () => {
  expect(() => parseCustomers("kod;nazev\nA;Firma", existing)).toThrow("Hlavička");
  expect(() => parseCustomers(`${header}\nA;"Nedokončená`, existing)).toThrow("Záznam 1");
  expect(parseCustomers(`${header}\nA;Firma;chyba;;\nB;Firma;chyba;`, existing).errors)
    .toEqual(["Záznam 1 – Očekávají se přesně čtyři sloupce.", "Záznam 2 – E-mail nemá platný formát."]);
});

it("přijme 100 záznamů, zastaví 101. a odmítne soubor nad 100 kB", async () => {
  const rows = Array.from({ length: 100 }, (_, i) => `K${i};Firma;;`);
  const full = [header, ...rows].join("\n");
  expect(parseCustomers(full, existing).rows).toHaveLength(100);
  expect(() => parseCustomers(full + "\nK100;Firma;;", existing)).toThrow("Záznam 101");
  await expect(readCustomers(new File(["a".repeat(100_001)], "large.csv"), existing)).rejects.toThrow("100 kB");
});

it("nahlásí soubor mimo UTF-8", async () => {
  await expect(readCustomers(new File([new Uint8Array([0xff])], "bad.csv"), existing)).rejects.toThrow("UTF-8");
});
