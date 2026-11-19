import type { State, Command, Context } from "../core/types";
import { customerCommand } from "./customer-domain";
import { productCommand } from "./product-domain";
import { orderCommand } from "./order-domain";
import { invoiceCommand } from "./invoice-domain";
export type Handler = (
  state: State,
  command: Command,
  context: Context,
) => void;
export const handlers: Partial<Record<Command["type"], Handler>> = {
  customer: customerCommand,
  import: customerCommand,
  product: productCommand,
  order: orderCommand,
  confirm: orderCommand,
  invoice: invoiceCommand,
  pay: invoiceCommand,
};
