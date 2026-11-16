import type {State,Command,Context} from '../core/types';
import {customerCommand} from './customer-domain';
export type Handler=(state:State,command:Command,context:Context)=>void;
export const handlers:Partial<Record<Command['type'],Handler>>={customer:customerCommand,import:customerCommand};
