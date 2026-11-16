import {customers} from './customers';
import {products} from './products';
import {orders} from './orders';
import {invoices} from './invoices';
export const pages:Record<string,{render:()=>string;bind:(refresh:()=>void)=>void}>={customers,products,orders,invoices};
