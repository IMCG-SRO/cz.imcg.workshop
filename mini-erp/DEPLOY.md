# Publikování přes GitHub Pages

## Současný provoz

Aktualizováno 18. 11. 2026. Pages jsou aktivní: [MAIN](https://imcg-sro.github.io/cz.imcg.workshop/), [A](https://imcg-sro.github.io/cz.imcg.workshop/A/), [B](https://imcg-sro.github.io/cz.imcg.workshop/B/), [C](https://imcg-sro.github.io/cz.imcg.workshop/C/). [Deploy ze 17. 11.](https://github.com/IMCG-SRO/cz.imcg.workshop/actions/runs/44146407098) úspěšně dokončil všechny čtyři buildy, balení i zveřejnění. Následující první aktivace je pouze postup pro případ nového nastavení.

Repozitář IMCG-SRO/cz.imcg.workshop je od kontroly 17. 11. 2026 veřejný. GitHub Pages lze pro veřejný repozitář používat v bezplatném tarifu. Viditelnost repozitáře se tímto workflow nemění.

## První aktivace správcem

1. Otevřít [Settings → Pages](https://github.com/IMCG-SRO/cz.imcg.workshop/settings/pages).
2. V **Build and deployment → Source** zvolit **GitHub Actions**. Tuto aktivaci musí provést přihlášený správce; běžný GITHUB_TOKEN ji provést neumí.
3. Otevřít **Actions → Publish ERP and team previews → Run workflow → main**. Po změně aplikace v main se workflow spouští automaticky.
4. Počkat na úspěšné joby build, package a deploy. Krok Check GitHub Pages configuration ověří aktivaci Pages před publikováním. Samotný úspěšný build neznamená zveřejnění webu.

Dřívější proměnná `ERP_PAGES_ENABLED` už není potřeba a workflow ji nepoužívá.

## Společná verze a týmové náhledy

Skutečnou adresu ukáže úspěšný deploy v prostředí github-pages. Kořen je společná verze, cesty `/A/`, `/B/`, `/C/` jsou náhledy týmů. Do vzniku týmové větve používá náhled main; zobrazený commit identifikuje skutečný zdroj.

Spouštění z feature větve je záměrně blokované. Při úpravách týmových větví spustí lektor workflow z main; každý běh znovu sestaví všechny čtyři aktuální varianty, takže nepřepíše jiné náhledy starší kopií.

Výchozí veřejná konfigurace míří na Workshop IMCG. Další GitHub Variables nejsou pro toto připojení nutné. Pro jiný projekt nebo oddělená připojení nastavte GitHub Variables `ERP_MAIN_URL`, `ERP_MAIN_PUBLISHABLE_KEY`, `ERP_TEST_URL`, `ERP_TEST_PUBLISHABLE_KEY`. Jen veřejné klíče; service-role ani hesla sem nepatří. URL a klíč zadávat vždy jako pár.

Po publikování zkontrolujte získanou adresu, přihlášení, izolaci a správné databázové cíle. V Actions musí být vidět skutečné výsledky kontrol.

`Mini ERP checks` provádí testy a build v každém PR a ukládá sestavený web jako artifact. Nepoužívá žádná databázová hesla a nepíše do sdílené databáze. Build týmových náhledů má pouze read oprávnění, nasazovací job nespouští jejich kód.
