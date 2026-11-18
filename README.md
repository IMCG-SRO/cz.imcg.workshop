# Workshop 2 IMCG

Verze 2.1 · 18. 11. 2026. Praktická práce se sdíleným prostorem a týmový vývoj mini ERP s AI.

## Program

1. Kontrola hotových úkolů z prvního workshopu a společné dotazy.
2. Práce nad existujícím prostorem [Xerox France E-invoicing and E-reporting](https://chatgpt.com/space/page_6af572749f0481a4b558f621dea35aaf): orientace, otázka se zdrojem a pravidla řízené změny.
3. Mini ERP ve třech týmech 2+2+3: Issue, větev, vývoj s AI, automatické testy, převzetí jiným týmem a řízené sloučení.

[Hlavní přehled Workshopu 2](https://chatgpt.com/space/page_c1ccd2a35d7081a497a6980d45ae6089) · [Program a příprava](podklady/01_program_a_priprava.md) · [Lektorský průvodce](podklady/02_lektorsky_pruvodce.md) · [Návod účastníků](podklady/03_navod_pro_ucastniky.md)

## Aplikace a zadání

[Společná aplikace](https://imcg-sro.github.io/cz.imcg.workshop/) · [Tým A](https://imcg-sro.github.io/cz.imcg.workshop/A/) · [Tým B](https://imcg-sro.github.io/cz.imcg.workshop/B/) · [Tým C](https://imcg-sro.github.io/cz.imcg.workshop/C/)

Základ obsahuje zákazníky, produkty, objednávky, faktury, úhrady a přehled. A doplní filtr faktur ([#20](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/20)), B export CSV ([#21](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/21)), C import zákazníků s náhledem ([#22](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/22)). Zadání zůstávají otevřená pro účastníky; technický zkušební průchod neznamená jejich odevzdání.

- [Specifikace a dokumentace](docs/mini-erp/README.md)
- [Týmová zadání a očekávání](docs/mini-erp/TYMOVE_UKOLY.md)
- [Pracovní postup](docs/mini-erp/POSTUP.md)
- [Backlog a stav Issues](docs/mini-erp/BACKLOG.md)
- [Příprava a délka bloku](docs/mini-erp/PRIPRAVA.md)
- [Provedené kontroly](docs/mini-erp/OVERENI.md)
- [Spuštění a vývoj](mini-erp/README.md) · [Publikování](mini-erp/DEPLOY.md)

## Současný stav

GitHub Pages běží; deploy ze 17. 11. 2026 dokončil buildy MAIN/A/B/C, balení i publikování. Sdílená databáze Workshop IMCG používá jeden projekt a čtyři logické prostory MAIN/A/B/C, sedm účastnických účtů a lektora. Hesla předává lektor neveřejně.

Poslední zpráva o technické generálce z 17. 11. uvádí úspěšný průchod všech tří rozšíření, 49 testů, kontrolu UI a sdílené databáze i odstranění dočasných řešení a testovacích dat. Tato čísla popisují generálku, nikoli počet testů ponechaných ve výchozím main. [Rozlišení důkazů a zbývající příprava](docs/mini-erp/OVERENI.md).

Plný ERP blok má odhad 150–180 minut. Původních 65 minut pokryje jen část postupu. Datum konání a konečný časový rámec zůstávají k potvrzení.

Původních devět individuálních Markdown úkolů bylo odstraněno a zůstává pouze v historii Gitu. Pro workshop používejte současná týmová zadání.
