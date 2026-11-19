import type { Item } from "./types";
export const today = () =>
  new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
export function addDays(day: string, n: number) {
  const d = new Date(day + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
export const money = (value: number) =>
  new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK" }).format(
    value / 100,
  );
export const date = (value: string) =>
  value
    ? new Intl.DateTimeFormat("cs-CZ").format(new Date(value + "T12:00:00Z"))
    : "—";
export function price(value: string) {
  if (!/^\d+([,.]\d{1,2})?$/.test(value.trim()))
    throw Error("Cena musí být číslo s nejvýše dvěma desetinnými místy.");
  const [a, b = ""] = value.replace(",", ".").split(".");
  const n = Number(a) * 100 + Number(b.padEnd(2, "0"));
  if (n <= 0 || n > 100000000)
    throw Error("Cena musí být větší než 0 a nejvýše 1 000 000 Kč.");
  return n;
}
export function total(items: Item[]) {
  return items.reduce((n, i) => n + i.quantity * i.price, 0);
}
export function checkItems(items: Item[]) {
  if (!items.length || items.length > 100)
    throw Error("Objednávka musí obsahovat 1 až 100 položek.");
  for (const i of items)
    if (
      !Number.isInteger(i.quantity) ||
      i.quantity < 1 ||
      i.quantity > 999 ||
      !Number.isInteger(i.price) ||
      i.price < 1 ||
      i.price > 100000000
    )
      throw Error("Zkontrolujte množství (1–999) a jednotkovou cenu.");
}
export function validDate(d: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(d) &&
    !isNaN(Date.parse(d)) &&
    new Date(d + "T12:00:00Z").toISOString().slice(0, 10) === d
  );
}
export const esc = (v: unknown) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
