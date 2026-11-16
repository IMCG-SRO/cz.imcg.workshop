import type { State } from "../core/types";
import { total } from "../core/rules";
export function summary(s: State, today: string) {
  const unpaid = s.invoices.filter((i) => !i.paidOn);
  return {
    customers: s.customers.length,
    orders: s.orders.length,
    unpaid: unpaid.reduce((sum, i) => sum + total(i.items), 0),
    overdue: unpaid
      .filter((i) => i.dueOn < today)
      .reduce((sum, i) => sum + total(i.items), 0),
    overdueCount: unpaid.filter((i) => i.dueOn < today).length,
  };
}
