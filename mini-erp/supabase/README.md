# Sdílená databáze mini ERP

Potvrzený projekt: **Workshop IMCG**, ref `ubwzwlzwsddszwvxvpfc`, region EU (Irsko). Existující GitHub integrace již nasadila počáteční migraci. Nevytváříme druhý projekt ani placené databázové větve.

## Prostředí a účty

Jeden databázový projekt obsahuje oddělené prostory MAIN, A, B, C. Všichni mají MAIN, účastníci navíc svůj tým a tým, který přebírají (A kontroluje B, B kontroluje C, C kontroluje A). Lektor má všechny prostory. Členství vynucuje server, přepínač v prohlížeči oprávnění nevytváří. Účastníci nemají správu Supabase ani přímý zápis do databázových tabulek.

Založeno sedm cvičných účtů ucastnik01–07 a lektor s technickými e-mailovými identitami @workshop.example. Nebyly rozesílány pozvánky ani e-maily. Hesla předá lektor soukromě; nejsou v Gitu. Do formuláře stačí jméno bez domény. Žádná veřejná registrace v aplikaci není; config.toml požaduje její vypnutí i v Auth.

Účty byly vytvořeny přes podporované Auth Admin API v krátkodobé, chráněné serverové funkci. Po dokončení je tato funkce zneaktivněná (HTTP 410) a nemá žádnou administrační operaci. Service-role klíč zůstal pouze v serverovém prostředí; nebyl načten do klienta ani vypsán.

## Konfigurace aplikace

Veřejná URL a publishable klíč jsou v src/core/connection.ts. Mohou být ve webu; přístup k datům vyžaduje přihlášení a členství. Jejich administrátorský protějšek se ve webu nesmí objevit. Úplný pár VITE_SUPABASE_URL a VITE_SUPABASE_PUBLISHABLE_KEY může připojení přepsat. Neúplný pár se odmítne.

Main začíná v MAIN, týmové náhledy v A/B/C podle VITE_DEFAULT_WORKSPACE. Volba ?mode=demo je výslovný místní režim bez sdílených dat. Chyba online spojení do dema automaticky nepřepíná.

## Migrace a bezpečnost

Jediný zdroj je [kořenové supabase/migrations](../../supabase/migrations). Working directory integrace je tečka a Git větev main. Veřejné RPC jsou SECURITY INVOKER wrappery, privilegované implementace jsou v neexponovaném schématu erp_private s explicitní kontrolou členství. Audit má explicitní zákaz klientského přístupu. Před sloučením se provádí lokální SQL testy; po sloučení se ověřuje skutečná historie migrací a advisors v Supabase.

V0.1 ukládá doménové kolekce jako JSONB dokument na prostor. PostgreSQL transakce a zámek řádku zajišťují atomické příkazy. Nejde o produkční účetní systém. Výchozí data jsou fiktivní: pět zákazníků, pět produktů, čtyři objednávky a čtyři faktury na prostor před ověřovacími operacemi.

## Obnova dat

Automatický seed je vypnutý. V Node.js 24 lze z `mini-erp/` vytvořit SQL s daty pro den cvičení příkazem `node scripts/create-seed.mjs A 2026-11-27 > seed-A.sql`. Vynecháním data se použije aktuální den v `Europe/Prague`. Správce SQL před použitím přečte, exportuje aktuální data a ověří cílový prostor. Obnova není povolená běžným ERP účtům. Do Gitu nikdy neukládat exporty Auth, hesla ani relace.

[Záznam skutečných kontrol](../../docs/mini-erp/OVERENI.md) · [Publikování webu](../DEPLOY.md)
