import { validDate } from '../src/core/rules.ts';
import { seed } from '../src/core/seed.ts';

const [workspace, referenceDay] = process.argv.slice(2);
if (!['A', 'B', 'C', 'MAIN'].includes(workspace) ||
    (referenceDay !== undefined && !validDate(referenceDay))) {
  console.error('Použití: node scripts/create-seed.mjs A|B|C|MAIN [RRRR-MM-DD] > seed.sql');
  process.exit(1);
}

const data = JSON.stringify(seed(referenceDay)).replaceAll("'", "''");
console.log('-- Výchozí fiktivní data. Spouští pouze správce po exportu současného stavu.');
console.log(`update public.erp_workspaces set data='${data}'::jsonb where id='${workspace}';`);
