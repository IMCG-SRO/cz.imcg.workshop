import {it,expect} from 'vitest';import {invoiceCommand} from '../src/modules/invoice-domain';import {seed} from '../src/core/seed';
const ctx={actor:'test',today:'2026-11-16'};
function fixture(){const s=seed();s.orders[0].status='confirmed';s.invoices=[];return s}
it('faktura: právě jeden doklad a neměnný snímek zákazníka',()=>{const s=fixture();invoiceCommand(s,{type:'invoice',id:'o0',dueOn:'2026-11-30'},ctx);s.customers[0].name='Změněno';expect(s.invoices[0].customer.name).toBe('Alfa kanceláře');expect(()=>invoiceCommand(s,{type:'invoice',id:'o0',dueOn:'2026-11-30'},ctx)).toThrow();expect(s.invoices).toHaveLength(1)});
it('odmítne neplatné datum a předchozí splatnost',()=>{for(const dueOn of ['2026-11-15','2026-02-30','bad'])expect(()=>invoiceCommand(fixture(),{type:'invoice',id:'o0',dueOn},ctx)).toThrow()});
it('opakovaná úhrada zachová prvního autora a datum',()=>{const s=seed();invoiceCommand(s,{type:'pay',id:'f0'},ctx);invoiceCommand(s,{type:'pay',id:'f0'},{actor:'druhy',today:'2026-11-17'});expect(s.invoices[0].paidBy).toBe('test');expect(s.invoices[0].paidOn).toBe(ctx.today)});
