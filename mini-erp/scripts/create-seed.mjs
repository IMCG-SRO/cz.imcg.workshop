import {seed} from '../src/core/seed.ts';
const workspace=process.argv[2];
if(!['A','B','C','MAIN'].includes(workspace)){console.error('Použití: node scripts/create-seed.mjs A|B|C|MAIN > seed.sql');process.exit(1)}
const data=JSON.stringify(seed()).replaceAll("'","''");
console.log('-- Výchozí fiktivní data. Spouští pouze správce po exportu současného stavu.');
console.log(`update public.erp_workspaces set data='${data}'::jsonb where id='${workspace}';`);
