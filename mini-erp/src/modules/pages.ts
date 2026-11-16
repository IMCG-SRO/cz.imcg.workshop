import {customers} from './customers';
import {products} from './products';
import {orders} from './orders';
export const pages:Record<string,{render:()=>string;bind:(refresh:()=>void)=>void}>={customers,products,orders};
