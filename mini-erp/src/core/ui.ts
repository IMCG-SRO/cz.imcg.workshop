import {esc,money,total} from './rules';
import type {Item} from './types';
export const button=(label:string,attrs='')=>`<button class="button" ${attrs}>${label}</button>`;
export const badge=(label:string,tone='neutral')=>`<span class="badge ${tone}">${esc(label)}</span>`;
export const heading=(title:string,subtitle:string,action='')=>`<div class="page-heading"><div><span class="eyebrow">PRACOVNÍ PROSTOR / MINI ERP</span><h1>${title}</h1><p>${subtitle}</p></div>${action}</div>`;
export const table=(heads:string[],rows:string[][])=>`<div class="table-scroll"><table><thead><tr>${heads.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join(''):`<tr><td colspan="${heads.length}" class="empty">Zatím zde nejsou žádné záznamy.</td></tr>`}</tbody></table></div>`;
export const field=(label:string,name:string,value='',type='text',extra='')=>`<label>${label}<input name="${name}" type="${type}" value="${esc(value)}" ${extra}></label>`;
export const itemsTable=(items:Item[])=>table(['Položka','Množství','Cena za kus','Celkem'],items.map(i=>[esc(i.name),String(i.quantity),money(i.price),`<strong>${money(i.quantity*i.price)}</strong>`]))+`<div class="total">Celkem <strong>${money(total(items))}</strong></div>`;
export function modal(title:string,content:string,onSave?:(data:FormData)=>Promise<void>){
 const dialog=document.createElement('dialog');dialog.innerHTML=`<form><div class="modal-heading"><h2>${esc(title)}</h2><button type="button" class="icon-button" aria-label="Zavřít">×</button></div><div class="modal-body">${content}</div><p class="error" role="alert"></p><div class="modal-footer"><button type="button" class="button secondary cancel">Zavřít</button>${onSave?'<button class="button" type="submit">Uložit</button>':''}</div></form>`;document.body.append(dialog);const close=()=>{dialog.close();dialog.remove()};dialog.querySelectorAll('.cancel,.icon-button').forEach(b=>b.addEventListener('click',close));dialog.addEventListener('cancel',close);
 dialog.querySelector('form')!.onsubmit=async e=>{e.preventDefault();if(!onSave)return;const b=dialog.querySelector<HTMLButtonElement>('[type=submit]')!;b.disabled=true;try{await onSave(new FormData(e.target as HTMLFormElement));close()}catch(e){dialog.querySelector('.error')!.textContent=e instanceof Error?e.message:String(e);b.disabled=false}};dialog.showModal();return dialog;
}
export const text=(f:FormData,key:string)=>String(f.get(key)??'').trim();
