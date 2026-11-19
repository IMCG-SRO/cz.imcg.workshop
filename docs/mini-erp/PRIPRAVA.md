# Příprava a podmínky Workshopu 2

Aktualizováno 19. 11. 2026. [Skutečné kontroly a historie](OVERENI.md).

## Připravené prostředí

Repozitář IMCG-SRO/cz.imcg.workshop je veřejný. [GitHub Pages](https://imcg-sro.github.io/cz.imcg.workshop/) běží; poslední doložený deploy 17. 11. dokončil čtyři buildy, balení a publikování. Není potřeba nová aktivace ani proměnná ERP_PAGES_ENABLED. [Provozní postup](../../mini-erp/DEPLOY.md).

Existující databázový projekt Workshop IMCG má dvě migrace a logické prostory MAIN/A/B/C. Sedm účastnických účtů a lektor se přihlašují samostatně, členství řídí přístup i k převzetí jiného týmu. Nevytváří se druhý databázový projekt ani placené větvení. Hesla se předávají neveřejně.

Základ ERP funguje. Podle poslední zprávy z 17. 11. prošly všechny tři týmové úlohy technickou generálkou a po odstranění dočasných řešení a testovacích dat se prostředí vrátilo do výchozího stavu. Tento průchod nenahrazuje pilot skutečným účastníkem.

## Kontrolní seznam správce a lektora

- [x] ERP základ, databáze, účty, izolace a publikování připravené.
- [x] Přesná zadání #20–#22 a oddělené složky rozšíření.
- [x] Ověřená automatizace testů, buildu a náhledů.
- [x] Technický zkušební průchod a návrat do výchozího stavu podle zprávy z 17. 11.
- [x] Termín cvičení je pátek 27. 11. 2026.
- [ ] Potvrdit časový rámec.
- [ ] Doplnit skutečné lidi, GitHub loginy, role a neveřejné předání ERP účtů.
- [ ] Ověřit přístup každého účastníka do ChatGPT, GitHubu, Xerox a příslušných originálů.
- [ ] Doložit pilot konkrétním běžným účastníkem a změřit čas.
- [ ] Ověřit aktuální ochranu main a požadované kontroly; poslední starší čtení ochrany není důkazem dnešního nastavení.
- [ ] Dokončit podmínky #19 a označení výchozího vydání.
- [ ] Před workshopem zkontrolovat stav služeb, výchozí data a commit MAIN/A/B/C.
- [ ] Před případným resetem exportovat fiktivní data a ověřit konkrétní cílový prostor.

## Odhad plného ERP bloku

| Krok | Minuty |
| --- | --- |
| Ukázka ERP, Issue, větve a PR | 20 |
| Zadání a očekávané výsledky | 15 |
| Vývoj s AI | 45 |
| Automatické testy a opravy | 25 |
| Ruční převzetí jiným týmem | 25 |
| Postupné merge a společná kontrola | 15 |
| Zpětná vazba | 5 |
| Základní součet | 150 |

S rezervou je odhad 150–180 minut. Celý workshop včetně 25 minut úvodu, 45 minut Xerox, 10 minut přestávky a 5 minut uzavření vyžaduje přibližně 235–265 minut. Jde o odhad, ne potvrzený termín.

Pokud zůstane 9:30–12:00, části 1 a 2 proběhnou celé a ERP má 65 minut. Cílem je tehdy srozumitelný dílčí výsledek, commit a draft PR se skutečnými výsledky a dalším krokem. Vývoj, testy a převzetí se dokončí v navazujícím bloku.

## Provoz a náhledy

Připojení používá existující služby; změna tarifu či založení placené služby není součástí workshopu. Při výpadku lze výslovně použít ?mode=demo, jeho data však zůstávají v daném prohlížeči. Automatické testy nezapisují do sdílené online databáze.

Po změně týmové větve spouští lektor Publish ERP and team previews z main. Feature workflow samo nepublikuje. Každý běh znovu sestaví všechny varianty; před vznikem týmové větve používá náhled main. Kontrolující vždy zapisuje skutečný commit, který převzal.
