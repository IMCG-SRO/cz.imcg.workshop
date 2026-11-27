import { total } from "../../core/rules";
import { client, online, state, workspace } from "../../core/store";
import type { Invoice, State } from "../../core/types";
import { action, button } from "../../core/ui";

const header =
  "cislo_faktury;zakaznik;datum_vystaveni;datum_splatnosti;castka_czk;stav";

function csvText(value: string) {
  const text = /^[=+@-]/.test(value.trimStart()) ? "'" + value : value;
  return /[;"\r\n]/.test(text) ? '"' + text.replaceAll('"', '""') + '"' : text;
}

export function invoicesToCsv(invoices: readonly Invoice[]) {
  const rows = invoices.map((invoice) =>
    [
      csvText(invoice.number),
      csvText(invoice.customer.name),
      invoice.issuedOn,
      invoice.dueOn,
      (total(invoice.items) / 100).toFixed(2).replace(".", ","),
      invoice.paidOn ? "Uhrazená" : "Neuhrazená",
    ].join(";"),
  );
  return "\uFEFF" + [header, ...rows].join("\r\n");
}

export function exportControl(_invoices: Invoice[]) {
  return button("Stáhnout CSV", 'id="invoice-export" type="button"');
}

export function bindExport(invoices: Invoice[]) {
  const control = document.querySelector<HTMLButtonElement>("#invoice-export");
  const renderedWorkspace = workspace;
  control?.addEventListener(
    "click",
    action(async () => {
      if (workspace !== renderedWorkspace || state.invoices !== invoices) {
        throw Error("Obnovte data aktuálního prostoru a zkuste export znovu.");
      }

      control.disabled = true;
      try {
        let allInvoices = invoices;
        if (online) {
          if (!client) throw Error("Sdílená databáze není dostupná.");
          // Scope this read explicitly even if a workspace switch failed or is pending.
          const { data, error } = await client.rpc("erp_snapshot", {
            workspace: renderedWorkspace,
          });
          if (error) throw Error(error.message);
          allInvoices = (data as State).invoices;
        }

        if (workspace !== renderedWorkspace || !control.isConnected) return;

        const blob = new Blob([invoicesToCsv(allInvoices)], {
          type: "text/csv;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "faktury.csv";
        document.body.append(link);
        try {
          link.click();
        } finally {
          link.remove();
          setTimeout(() => URL.revokeObjectURL(url), 0);
        }
      } finally {
        control.disabled = false;
      }
    }),
  );
}
