import type { Handler } from "./commands";
import { validDate } from "../core/rules";
export const invoiceCommand: Handler = (s, c, ctx) => {
  if (c.type === "pay") {
    const i = s.invoices.find((x) => x.id === c.id);
    if (!i) throw Error("Faktura neexistuje.");
    if (!i.paidOn) {
      i.paidOn = ctx.today;
      i.paidBy = ctx.actor;
    }
    return;
  }
  if (c.type !== "invoice") return;
  const o = s.orders.find((x) => x.id === c.id);
  if (!o || o.status !== "confirmed")
    throw Error("Fakturovat lze pouze potvrzenou objednávku.");
  if (s.invoices.some((x) => x.orderId === o.id))
    throw Error("Faktura již existuje.");
  if (!validDate(c.dueOn) || c.dueOn < ctx.today)
    throw Error("Splatnost nesmí předcházet datu vystavení.");
  const customer = s.customers.find((x) => x.id === o.customerId);
  if (!customer) throw Error("Zákazník neexistuje.");
  s.invoices.push({
    id: crypto.randomUUID(),
    number: "FA-" + String(s.invoices.length + 1).padStart(3, "0"),
    orderId: o.id,
    customer: structuredClone(customer),
    items: structuredClone(o.items),
    issuedOn: ctx.today,
    dueOn: c.dueOn,
    paidOn: null,
    paidBy: null,
  });
  o.status = "invoiced";
};
