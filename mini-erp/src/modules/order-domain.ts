import type {Handler} from './commands';import {checkItems} from '../core/rules';
export const orderCommand:Handler=(s,c,ctx)=>{
 if(c.type==='confirm'){const order=s.orders.find(x=>x.id===c.id);if(!order||order.status!=='draft')throw Error('Potvrdit lze pouze existující koncept.');checkItems(order.items);order.status='confirmed';return}
 if(c.type!=='order')return;const d=c.data,old=s.orders.find(x=>x.id===d.id);if(!d.id||d.id.length>100)throw Error('Neplatné ID.');if(old&&old.status!=='draft')throw Error('Potvrzenou objednávku nelze měnit.');if(!s.customers.some(x=>x.id===d.customerId))throw Error('Zákazník neexistuje.');checkItems(d.items);
 const seen=new Set<string>();const items=d.items.map(i=>{const p=s.products.find(p=>p.id===i.productId);if(!p)throw Error('Produkt neexistuje.');if(seen.has(p.id))throw Error('Produkt je v objednávce vícekrát.');seen.add(p.id);const previous=old?.items.find(x=>x.productId===p.id);return {productId:p.id,name:previous?.name||p.name,quantity:i.quantity,price:previous?.price||p.price}});
 const order={id:d.id,number:old?.number||'OBJ-'+String(s.orders.length+1).padStart(3,'0'),customerId:d.customerId,items,status:'draft' as const,createdOn:old?.createdOn||ctx.today};
 const index=s.orders.findIndex(x=>x.id===d.id);if(index<0)s.orders.push(order);else s.orders[index]=order;
};
