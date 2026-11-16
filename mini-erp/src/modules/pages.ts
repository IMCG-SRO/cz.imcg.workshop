import {customers} from './customers';
import {products} from './products';
import {orders} from './orders';
import {invoices} from './invoices';
import {home} from './dashboard';
export const pages:Record<string,{render:()=>string;bind:(refresh:()=>void)=>void}>={home,customers,products,orders,invoices};
