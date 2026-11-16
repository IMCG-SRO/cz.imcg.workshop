import {customers} from './customers';
export const pages:Record<string,{render:()=>string;bind:(refresh:()=>void)=>void}>={customers};
