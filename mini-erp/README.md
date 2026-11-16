# IMCG mini ERP

Výuková webová aplikace pro Workshop 2. Data jsou fiktivní; doklady nejsou účetními doklady.

## Spuštění pro vývoj

Node.js 22 nebo 24: `npm ci`, `npm run dev`. Kontroly: `npm test` a `npm run build`. Výstup je v `dist/` a lze jej hostovat staticky. Účastníci mohou vyvíjet z ChatGPT; místní instalace není podmínkou používání aplikace.

Týmová rozšíření jsou samostatné moduly v `src/extensions/`. Jejich vstupní body jsou připraveny, funkce nejsou hotové. [Zadání](../docs/mini-erp/TYMOVE_UKOLY.md).

Demonstrační režim používá úložiště konkrétního prohlížeče. Není to sdílená databáze ani zabezpečené přihlašování. Online režim se nastavuje podle `supabase/README.md`; vyžaduje vlastní projekt správce.
