# Publikování přes GitHub Pages

Zdroj zůstává v soukromém repozitáři. Správce musí ověřit, zda jeho GitHub plán podporuje Pages pro soukromý repozitář. Samotný workflow tarif nezmění ani nezaloží placenou službu.

1. V repozitáři otevřít **Settings → Pages → Build and deployment → Source: GitHub Actions**. Pokud možnost není dostupná, nejprve rozhodnout o jiném hostingu; nezveřejňovat automaticky repozitář.
2. **Actions → Publish ERP and team previews → Run workflow → main**. Spouštění z feature větve je záměrně blokované. Při úpravách týmových větví spustí lektor workflow z main; každý běh znovu sestaví všechny čtyři aktuální varianty, takže nepřepíše jiné náhledy starší kopií.
3. Skutečnou adresu ukáže úspěšný deploy. Kořen je společná verze, cesty `/A/`, `/B/`, `/C/` jsou náhledy týmů. Do vzniku týmové větve náhled používá main; zobrazený commit identifikuje skutečný zdroj.
4. Bez databázové konfigurace jde o **místní demo**, nikoli o sdílená data. Pro online režim nastavte GitHub Variables `ERP_MAIN_URL`, `ERP_MAIN_PUBLISHABLE_KEY`, `ERP_TEST_URL`, `ERP_TEST_PUBLISHABLE_KEY`. Jen veřejné klíče; service-role ani hesla sem nepatří. URL a klíč zadávat vždy jako pár.
5. Zkontrolujte získanou adresu, přihlášení, izolaci a správné databázové cíle. V Actions musí být vidět skutečné výsledky kontrol.

`Mini ERP checks` provádí testy a build v každém PR a ukládá sestavený web jako artifact. Nepoužívá žádná databázová hesla a nepíše do sdílené databáze. Build týmových náhledů má pouze read oprávnění, nasazovací job nespouští jejich kód.

Aktuální omezení přípravy: připojený GitHub nástroj neumí nastavit Pages a prohlížeč nebyl přihlášený do GitHubu. Nastavení Pages ani veřejná adresa proto dosud nejsou potvrzené. Připravený workflow není důkazem nasazení.
