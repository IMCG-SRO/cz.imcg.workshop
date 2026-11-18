# Workshop 2 IMCG

Repozitář obsahuje výukové mini ERP a podklady pro Workshop 2. Účastníci vyvíjejí rozšíření v samostatných větvích a výsledky ověřují v jiném týmu. Pro komunikaci a běžné podklady používej češtinu. V ukázce Xerox zachovej anglické projektové prompty.

## Kde začít

- [README.md](README.md) je rozcestník, [podklady/](podklady/README.md) obsahují program a návody.
- Před prací na ERP přečti [mini-erp/AGENTS.md](mini-erp/AGENTS.md), i když pracuješ z kořene. Obsahuje rozsah týmových zadání a příkazy pro ověření.
- Databázové migrace pro integraci jsou v [supabase/migrations/](supabase/README.md). Publikování z GitHubu popisuje [mini-erp/DEPLOY.md](mini-erp/DEPLOY.md).
- Pokud máš pouze přístup přes GitHub konektor, výslovně načti tyto pokyny z větve, se kterou pracuješ. Uveď, pokud přesný obsah nebo commit nevidíš.

## Práce v repozitáři

- Před zápisem ověř zadání, repozitář a cílovou větev. Používej vlastní větev a PR do `main`. Existující týmovou větev použij pro pokračování stejného zadání. Zachovej práci ostatních a historii větví.
- Sloučení do `main` řídí lektor. U týmových zadání použij odkaz na Issue v PR a výsledek uzavři až po ověření publikované společné verze podle [pracovního postupu](docs/mini-erp/POSTUP.md).
- Repozitář je veřejný. Používej fiktivní data. Hesla, klíče správce, přístupové tokeny, zálohy a skutečné zákaznické podklady patří mimo Git, Issues, PR i logy. Ve webové aplikaci je možné použít veřejný Supabase publishable klíč.
- Změny živé databáze, účtů, oprávnění a publikování patří správci nebo lektorovi. Placené služby vyžadují jejich souhlas.
- Uveď skutečně provedené kontroly, jejich výsledek a testovaný commit. Nedořešenou práci zachovej ve větvi nebo draft PR a předej odkaz, poslední ověřený stav a konkrétní další krok.
