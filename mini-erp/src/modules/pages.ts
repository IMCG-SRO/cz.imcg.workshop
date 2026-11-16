import {customers} from './customers';
import {products} from './products';
export const pages:Record<string,{render:()=>string;bind:(refresh:()=>void)=>void}>={customers,products};
