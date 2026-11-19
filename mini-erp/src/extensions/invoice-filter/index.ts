import type { Invoice } from "../../core/types";
/** Tým A: implementujte UI a pravidla v tomto modulu. */
export function invoiceFilter(invoices: Invoice[], _today: string): Invoice[] {
  return invoices;
}
export function filterControl() {
  return "";
}
export function bindFilter(_refresh: () => void) {}
