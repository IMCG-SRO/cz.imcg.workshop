import type { Invoice } from "../../core/types";
import { today, total } from "../../core/rules";

const header = "cislo_faktury;zakaznik;datum_vystaveni;datum_splatnosti;castka_czk;stav";

function csvText(value: string) {
  const safe = /^[\s\uFEFF]*[=+\-@]|^[\t\r\n]/.test(value) ? "'" + value : value;
  return /[;"\r\n]/.test(safe) ? `"${safe.replaceAll('"', '""')}"` : safe;
}

export function invoiceCsv(invoices: readonly Invoice[], day = today()) {
  const lines = invoices.map((invoice) => {
    const status = invoice.paidOn ? "Uhrazená" :
      invoice.dueOn < day ? "Po splatnosti" : "Neuhrazená";
    return [
      csvText(invoice.number),
      csvText(invoice.customer.name),
      invoice.issuedOn,
      invoice.dueOn,
      (total(invoice.items) / 100).toFixed(2).replace(".", ","),
      status,
    ].join(";");
  });
  return "\uFEFF" + [header, ...lines].join("\r\n") + "\r\n";
}

export function exportControl(_invoices: Invoice[]) {
  return '<button type="button" class="button secondary" id="invoice-export-csv">Stáhnout CSV</button>';
}

export function bindExport(invoices: Invoice[]) {
  document.querySelector("#invoice-export-csv")?.addEventListener("click", () => {
    const day = today();
    const url = URL.createObjectURL(new Blob([invoiceCsv(invoices, day)], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `faktury-${day}.csv`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}
