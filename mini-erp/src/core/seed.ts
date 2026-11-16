import type { State } from "./types";
import { today, addDays } from "./rules.ts";
export function seed(day = today()): State {
  const customers = [
    ["ALFA", "Alfa kanceláře", "Praha"],
    ["BETA", "Beta consulting", "Brno"],
    ["DELTA", "Delta servis", "Plzeň"],
    ["NOVA", "Nova technologie", "Liberec"],
    ["OMEGA", "Omega studio", "Olomouc"],
  ].map(([code, name, address], i) => ({
    id: "c" + i,
    code,
    name,
    email: "kontakt@example.com",
    address,
  }));
  const products = [
    ["NB01", "Notebook Business 14", 2499000],
    ["MON01", "Monitor 27″", 649000],
    ["DOK01", "Dokovací stanice", 329000],
    ["KLA01", "Klávesnice", 149000],
    ["SERV01", "Konzultace • hodina", 180000],
  ].map(([code, name, price], i) => ({
    id: "p" + i,
    code: String(code),
    name: String(name),
    price: Number(price),
  }));
  const orders: State["orders"] = Array.from({ length: 4 }, (_, i) => ({
    id: "o" + i,
    number: "OBJ-00" + (i + 1),
    customerId: customers[i].id,
    items: [
      {
        productId: "p4",
        name: products[4].name,
        quantity: i + 1,
        price: products[4].price,
      },
    ],
    status: "invoiced",
    createdOn: addDays(day, -20),
  }));
  const invoices: State["invoices"] = orders.map((o, i) => ({
    id: "f" + i,
    number: "FA-00" + (i + 1),
    orderId: o.id,
    customer: { ...customers[i] },
    items: structuredClone(o.items),
    issuedOn: addDays(day, -14),
    dueOn: addDays(day, [-1, 0, 1, -5][i]),
    paidOn: i === 3 ? addDays(day, -2) : null,
    paidBy: i === 3 ? "lektor" : null,
  }));
  return { customers, products, orders, invoices };
}
