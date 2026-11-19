import { state, command } from "../core/store";
import { esc } from "../core/rules";
import { heading, table, field, modal, text, notify } from "../core/ui";
import { importControl, bindImport } from "../extensions/customer-import";
export const customers = {
  render: () =>
    heading(
      "Zákazníci",
      "Všechny obchodní vztahy na jednom místě.",
      '<button class="button" id="new-customer">＋ Nový zákazník</button>',
    ) +
    `<section class="panel"><div class="panel-heading"><h2>Adresář zákazníků <span class="count">${state.customers.length}</span></h2>${importControl()}</div>` +
    table(
      ["Zákazník", "Kód", "E-mail", "Město / adresa", ""],
      state.customers.map((c) => [
        `<div class="entity"><span class="avatar">${esc(c.name.slice(0, 2).toUpperCase())}</span><strong>${esc(c.name)}</strong></div>`,
        `<code>${esc(c.code)}</code>`,
        esc(c.email) || "—",
        esc(c.address) || "—",
        `<button class="text-button" data-customer="${esc(c.id)}">Detail / upravit ↗</button>`,
      ]),
    ) +
    "</section>",
  bind: (refresh: () => void) => {
    const edit = (id?: string) => {
      const c = state.customers.find((x) => x.id === id);
      modal(
        c ? "Upravit zákazníka" : "Nový zákazník",
        `<div class="form-grid">${field("Kód zákazníka", "code", c?.code, "text", 'required maxlength="80"')}${field("Název", "name", c?.name, "text", 'required maxlength="200"')}${field("E-mail (volitelný)", "email", c?.email, "email", 'maxlength="254"')}${field("Adresa (volitelná)", "address", c?.address, "text", 'maxlength="500"')}</div>`,
        async (f) => {
          await command({
            type: "customer",
            data: {
              id: c?.id || crypto.randomUUID(),
              code: text(f, "code"),
              name: text(f, "name"),
              email: text(f, "email"),
              address: text(f, "address"),
            },
          });
          refresh();
          notify("Zákazník byl uložen.");
        },
      );
    };
    document
      .querySelector("#new-customer")
      ?.addEventListener("click", () => edit());
    document
      .querySelectorAll<HTMLElement>("[data-customer]")
      .forEach((b) => (b.onclick = () => edit(b.dataset.customer)));
    bindImport(
      state.customers,
      async (rows) => {
        await command({ type: "import", data: rows });
      },
      refresh,
    );
  },
};
