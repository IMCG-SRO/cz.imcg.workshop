import { esc } from "../../core/rules";
import type { Customer } from "../../core/types";
import { button, modal, notify, table } from "../../core/ui";
import { readPreview, type ImportPreview } from "./csv";

export function importControl() {
  return button("Import CSV", 'id="import-csv" type="button"');
}

export function bindImport(
  existing: Customer[],
  save: (rows: Customer[]) => Promise<void>,
  refresh: () => void,
) {
  document.querySelector("#import-csv")?.addEventListener("click", () => {
    const batch = createImportBatch(save);
    const dialog = modal(
      "Import zákazníků z CSV",
      `<label>Soubor CSV<input type="file" accept=".csv,text/csv" autofocus></label>
      <p>UTF-8, středník, hlavička <code>kod;nazev;email;adresa</code>.
      Nejvýše 100 záznamů a 100 kB.</p>
      <p data-import-status role="status"></p><div data-import-preview></div>`,
    );
    const input = dialog.querySelector<HTMLInputElement>('input[type="file"]')!;
    const cancel = dialog.querySelector<HTMLButtonElement>(".cancel")!;
    const close = dialog.querySelector<HTMLButtonElement>(".icon-button")!;
    const status = dialog.querySelector("[data-import-status]")!;
    const preview = dialog.querySelector("[data-import-preview]")!;
    const error = dialog.querySelector(".error")!;
    const footer = dialog.querySelector(".modal-footer")!;
    footer.insertAdjacentHTML(
      "beforeend",
      button("Potvrdit import", 'data-import-confirm type="button" disabled'),
    );
    const confirm = footer.querySelector<HTMLButtonElement>(
      "[data-import-confirm]",
    )!;
    cancel.textContent = "Zrušit";

    dialog.addEventListener(
      "cancel",
      (event) => {
        if (!batch.saving) return;
        event.stopImmediatePropagation();
        event.preventDefault();
      },
      { capture: true },
    );
    dialog.addEventListener("close", batch.clear);

    input.addEventListener("change", async () => {
      batch.clear();
      confirm.disabled = true;
      preview.replaceChildren();
      error.textContent = status.textContent = "";
      const file = input.files?.[0];
      if (!file) return;

      input.disabled = true;
      status.textContent = "Načítám CSV…";
      try {
        const result = await readPreview(file, existing);
        if (!dialog.open) return;
        batch.stage(result);
        status.textContent = `Záznamy v náhledu: ${result.rows.length}`;
        const issues = result.errors.length
          ? `<ul class="error" role="alert">${result.errors.map((issue) => `<li>${esc(issue)}</li>`).join("")}</ul>`
          : "";
        preview.innerHTML =
          issues +
          table(
            ["Záznam", "Kód", "Název", "E-mail", "Adresa"],
            result.rows.map(({ record, customer }) => [
              String(record),
              esc(customer.code),
              esc(customer.name),
              esc(customer.email),
              esc(customer.address),
            ]),
          );
        confirm.disabled = !batch.ready;
      } catch {
        status.textContent = "";
        error.textContent = "Soubor se nepodařilo přečíst.";
      } finally {
        input.disabled = false;
      }
    });

    confirm.addEventListener("click", async () => {
      if (!batch.ready) return;
      confirm.disabled =
        input.disabled =
        cancel.disabled =
        close.disabled =
          true;
      error.textContent = "";
      status.textContent = "Ukládám zákazníky…";
      let count: number;
      try {
        count = await batch.confirm();
      } catch (cause) {
        status.textContent = "";
        error.textContent = `Import se nezdařil. ${cause instanceof Error ? cause.message : String(cause)}`;
        confirm.disabled = !batch.ready;
        input.disabled = cancel.disabled = close.disabled = false;
        return;
      }
      dialog.close();
      dialog.remove();
      refresh();
      notify(`Import dokončen. Uloženo zákazníků: ${count}.`);
    });
  });
}

export function createImportBatch(save: (rows: Customer[]) => Promise<void>) {
  let rows: Customer[] = [];
  let saving = false;

  return {
    get saving() {
      return saving;
    },
    get ready() {
      return !saving && rows.length > 0;
    },
    stage(preview: ImportPreview) {
      rows = preview.errors.length
        ? []
        : preview.rows.map(({ customer }) => ({
            ...customer,
            id: crypto.randomUUID(),
          }));
    },
    clear() {
      rows = [];
    },
    async confirm() {
      if (saving || !rows.length) return 0;
      saving = true;
      const count = rows.length;
      try {
        await save(rows);
        rows = [];
        return count;
      } finally {
        saving = false;
      }
    },
  };
}
