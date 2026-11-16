# Supabase — databáze mini ERP

Toto je jediná kanonická složka databázových migrací. V integraci GitHub → Supabase musí být **Working directory: `.`** a produkční Git větev `main`. Nepovolovat placené preview větve kvůli tomuto workshopu.

`migrations/20261116102540_erp.sql` vytváří tabulky, RLS a atomické příkazy. Neobsahuje mazání ani reset existujících tabulek. Pokud se SQL dříve spouštělo ručně, nejprve ověřit schéma a historii migrací; migraci neopakovat naslepo ani neobcházet chybu mazáním tabulek.

Konfigurace neobsahuje vzdálený projekt ani tajné údaje. Nepředstírá, že je projekt dostupný. Automatické seedování je vypnuté, aby nový deploy nepřepsal rozehranou práci.

[Přihlášení, účty, prostory a počáteční data](../mini-erp/supabase/README.md) · [Konfigurace webu](../mini-erp/DEPLOY.md)

Po nasazení musí být doloženo: migrace v historii cílového projektu, tři tabulky ERP, zapnuté RLS, sedm účtů s členstvím a ověřené přihlášení. Samotné propojení GitHubu ještě není důkazem hotového nasazení.
