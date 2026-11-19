import type { Invoice } from "../../core/types";

const paymentOptions = {
  all: "Všechny",
  unpaid: "Neuhrazené",
  paid: "Uhrazené",
};
const dueDateOptions = {
  all: "Všechny",
  overdue: "Po splatnosti",
  current: "Dnes a později",
};
type Filters = {
  payment: keyof typeof paymentOptions;
  dueDate: keyof typeof dueDateOptions;
};

const defaultFilters: Filters = { payment: "all", dueDate: "all" };
let selectedFilters = defaultFilters;

export function invoiceFilter(
  invoices: readonly Invoice[],
  today: string,
  { payment, dueDate }: Filters = selectedFilters,
): Invoice[] {
  return invoices.filter((invoice) => {
    const paid = Boolean(invoice.paidOn);
    const overdue = invoice.dueOn < today;
    const matchesPayment = payment === "all" || paid === (payment === "paid");
    const matchesDueDate =
      dueDate === "all" || overdue === (dueDate === "overdue");
    return matchesPayment && matchesDueDate;
  });
}

function optionsHtml(options: Record<string, string>, selected: string) {
  return Object.entries(options)
    .map(
      ([value, label]) =>
        `<option value="${value}"${value === selected ? " selected" : ""}>${label}</option>`,
    )
    .join("");
}

export function filterControl() {
  return `<div role="group" aria-label="Filtry faktur" style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:12px;padding:12px 24px">
    <label>Úhrada<select id="invoice-filter-payment">${optionsHtml(paymentOptions, selectedFilters.payment)}</select></label>
    <label>Splatnost<select id="invoice-filter-due-date">${optionsHtml(dueDateOptions, selectedFilters.dueDate)}</select></label>
    <button type="button" class="button secondary" id="invoice-filter-reset">Zrušit filtry</button>
  </div>`;
}

export function bindFilter(refresh: () => void) {
  const payment = document.querySelector<HTMLSelectElement>(
    "#invoice-filter-payment",
  );
  const dueDate = document.querySelector<HTMLSelectElement>(
    "#invoice-filter-due-date",
  );
  const reset = document.querySelector<HTMLButtonElement>(
    "#invoice-filter-reset",
  );
  if (!payment || !dueDate || !reset) return;

  function apply(filters: Filters, controlId: string) {
    selectedFilters = filters;
    refresh();
    // Překreslení nahradí ovládací prvky novými.
    document.getElementById(controlId)?.focus();
  }

  payment.addEventListener("change", () => {
    apply(
      { ...selectedFilters, payment: payment.value as Filters["payment"] },
      payment.id,
    );
  });
  dueDate.addEventListener("change", () => {
    apply(
      { ...selectedFilters, dueDate: dueDate.value as Filters["dueDate"] },
      dueDate.id,
    );
  });
  reset.addEventListener("click", () => apply(defaultFilters, reset.id));
}
