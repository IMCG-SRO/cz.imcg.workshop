import type { Customer } from "../../core/types";
import { esc } from "../../core/rules";
import { modal, notify, table } from "../../core/ui";
import { readCustomers } from "./csv";

export function importControl() {
  return '<button type="button" class="button secondary" id="customer-import-csv">Import CSV</button>';
}

export function bindImport(
  existing: Customer[],
  save: (rows: Customer[]) => Promise<void>,
  refresh: () => void,
) {
  document.querySelector("#customer-import-csv")?.addEventListener("click", () => {
    let rows: Omit<Customer, "id">[] = [];
    let saving = false;
    let selection = 0;
    const dialog = modal(
      "Import zákazníků z CSV",
      `<p>UTF-8 · kód, název, e-mail a adresa · nejvýše 100 záznamů a 100 kB</p>
      <label>Soubor CSV<input type="file" accept=".csv,text/csv" data-customer-file></label>
      <div data-customer-preview aria-live="polite"></div>`,
      async () => {
        if (rows.length === 0) throw Error("Nejprve načtěte platný soubor s náhledem.");
        saving = true;
        input.disabled = true;
        try {
          await save(rows.map((row) => ({ ...row, id: crypto.randomUUID() })));
        } catch (error) {
          throw Error(`Import se nepodařilo uložit. ${error instanceof Error ? error.message : String(error)}`);
        } finally {
          saving = false;
          input.disabled = false;
        }
        refresh();
        notify(`Import zákazníků dokončen. Počet záznamů: ${rows.length}.`);
      },
    );
    const input = dialog.querySelector<HTMLInputElement>("[data-customer-file]")!;
    const preview = dialog.querySelector<HTMLElement>("[data-customer-preview]")!;
    const confirm = dialog.querySelector<HTMLButtonElement>("button[type=submit]")!;
    const cancel = dialog.querySelector<HTMLButtonElement>(".cancel")!;
    confirm.textContent = "Potvrdit import";
    confirm.disabled = true;
    cancel.textContent = "Zrušit";

    // Sdílený dialog obsluhuje submit a zavření. Během zápisu tyto události zachytíme dřív.
    dialog.addEventListener("submit", (event) => {
      if (saving) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
    dialog.addEventListener("cancel", (event) => {
      if (saving) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
    dialog.addEventListener("click", (event) => {
      if (saving && event.target instanceof Element && event.target.closest(".cancel,.icon-button")) {
        event.stopImmediatePropagation();
      }
    }, true);

    input.addEventListener("change", async () => {
      const current = ++selection;
      const file = input.files?.[0];
      rows = [];
      confirm.disabled = true;
      dialog.querySelector(".error")!.textContent = "";
      preview.textContent = file ? "Načítám náhled…" : "";
      if (!file) return;

      try {
        const result = await readCustomers(file, existing);
        if (current !== selection || !dialog.isConnected) return;
        rows = result.rows;
        if (result.errors.length) {
          preview.innerHTML = `<ul class="error">${result.errors.map((error) => `<li>${esc(error)}</li>`).join("")}</ul>`;
          return;
        }
        preview.innerHTML = `<p>Náhled importu · ${rows.length} záznamů</p>` + table(
          ["Kód", "Název", "E-mail", "Adresa"],
          rows.map(({ code, name, email, address }) => [code, name, email, address].map(esc)),
        );
        confirm.disabled = false;
      } catch (error) {
        if (current !== selection || !dialog.isConnected) return;
        preview.textContent = error instanceof Error ? error.message : String(error);
      }
    });
  });
}
