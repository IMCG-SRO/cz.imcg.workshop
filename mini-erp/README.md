# IMCG mini ERP

Výuková webová aplikace pro Workshop 2. Data jsou fiktivní; doklady nejsou účetními doklady.

## Spuštění pro vývoj

Node.js 22 nebo 24: `npm ci`, `npm run dev`. Kontroly: `npm test` a `npm run build`. Výstup je v `dist/` a lze jej hostovat staticky. Účastníci mohou vyvíjet z ChatGPT; místní instalace není podmínkou používání aplikace.

Týmová rozšíření jsou samostatné moduly v `src/extensions/`. Jejich vstupní body jsou připraveny, funkce nejsou hotové. [Zadání](../docs/mini-erp/TYMOVE_UKOLY.md).

Výchozí připojení míří na existující projekt Workshop IMCG. Přihlašovací účty přiděluje lektor. Lokální demo lze otevřít přes `?mode=demo`; jeho data zůstávají pouze v konkrétním prohlížeči. Ve zdrojích je jen veřejná konfigurace a publishable klíč, nikoli administrátorské údaje. [Správa databáze](supabase/README.md).
