export interface Customer {
  id: string;
  code: string;
  name: string;
  email: string;
  address: string;
}
export interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
}
export interface Item {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}
export interface Order {
  id: string;
  number: string;
  customerId: string;
  items: Item[];
  status: "draft" | "confirmed" | "invoiced";
  createdOn: string;
}
export interface Invoice {
  id: string;
  number: string;
  orderId: string;
  customer: Customer;
  items: Item[];
  issuedOn: string;
  dueOn: string;
  paidOn: string | null;
  paidBy: string | null;
}
export interface State {
  customers: Customer[];
  products: Product[];
  orders: Order[];
  invoices: Invoice[];
}
export type Command =
  | { type: "customer"; data: Customer }
  | { type: "product"; data: Product }
  | { type: "order"; data: Order }
  | { type: "confirm"; id: string }
  | { type: "invoice"; id: string; dueOn: string }
  | { type: "pay"; id: string }
  | { type: "import"; data: Customer[] };
export interface Context {
  today: string;
  actor: string;
}
