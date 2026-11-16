import { state, command } from "../core/store";
import { esc, money, price } from "../core/rules";
import { heading, table, field, modal, text, notify } from "../core/ui";
export const products = {
  render: () =>
    heading(
      "Produkty",
      "Jednoduchý katalog produktů a služeb.",
      '<button id="new-product" class="button">＋ Nový produkt</button>',
    ) +
    '<section class="panel"><div class="panel-heading"><h2>Katalog <span class="count">' +
    state.products.length +
    '</span></h2><span class="badge blue">CZK · bez DPH</span></div>' +
    table(
      ["Produkt", "Kód", "Jednotková cena", ""],
      state.products.map((p) => [
        `<div class="entity"><span class="avatar">◇</span><strong>${esc(p.name)}</strong></div>`,
        `<code>${esc(p.code)}</code>`,
        money(p.price),
        `<button class="text-button" data-product="${esc(p.id)}">Upravit ↗</button>`,
      ]),
    ) +
    "</section>",
  bind: (refresh: () => void) => {
    const edit = (id?: string) => {
      const p = state.products.find((x) => x.id === id);
      modal(
        p ? "Upravit produkt" : "Nový produkt",
        `<div class="form-grid">${field("Kód produktu", "code", p?.code, "text", 'required maxlength="80"')}${field("Název", "name", p?.name, "text", 'required maxlength="200"')}${field("Cena v Kč bez DPH", "price", p ? String(p.price / 100) : "", "text", 'required inputmode="decimal"')}</div>`,
        async (f) => {
          await command({
            type: "product",
            data: {
              id: p?.id || crypto.randomUUID(),
              code: text(f, "code"),
              name: text(f, "name"),
              price: price(text(f, "price")),
            },
          });
          refresh();
          notify("Produkt byl uložen.");
        },
      );
    };
    document
      .querySelector("#new-product")!
      .addEventListener("click", () => edit());
    document
      .querySelectorAll<HTMLElement>("[data-product]")
      .forEach((b) => (b.onclick = () => edit(b.dataset.product)));
  },
};
