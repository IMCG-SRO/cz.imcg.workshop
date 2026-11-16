# Plán vývoje a skutečné GitHub Issues

Verze 0.1 • 16. 11. 2026 • Autor: ChatGPT.
Všechny níže uvedené položky byly založeny jako skutečné Issues. Otevřené Issue není hotová funkcionalita. Podmínky převzetí jsou v každém Issue.

| ID | Issue | Fáze | Závislosti | Větev při zahájení |
| --- | --- | --- | --- | --- |
| ERP-01 | [#10 Návrh mini ERP, rozsah a plán přípravy](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/10) | Příprava | — | `docs/erp-01-navrh` |
| ERP-02 | [#11 Základ aplikace, struktura a pravidla vývoje](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/11) | Příprava | [#10](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/10) | `feature/erp-02-zaklad` |
| ERP-03 | [#12 Databáze, cvičné účty a oddělení dat](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/12) | Příprava | [#11](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/11) | `feature/erp-03-databaze` |
| ERP-04 | [#13 Evidence zákazníků](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/13) | Příprava | [#12](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/12) | `feature/erp-04-zakaznici` |
| ERP-05 | [#14 Evidence produktů](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/14) | Příprava | [#12](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/12) | `feature/erp-05-produkty` |
| ERP-06 | [#15 Objednávky a výpočet ceny](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/15) | Příprava | [#13](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/13), [#14](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/14) | `feature/erp-06-objednavky` |
| ERP-07 | [#16 Faktury z objednávek a evidence úhrady](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/16) | Příprava | [#15](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/15) | `feature/erp-07-faktury` |
| ERP-08 | [#17 Úvodní přehled ERP](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/17) | Příprava | [#16](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/16) | `feature/erp-08-prehled` |
| ERP-09 | [#18 Publikování main, týmových náhledů a automatické kontroly](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/18) | Příprava | [#11](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/11), [#12](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/12) | `feature/erp-09-publikovani` |
| ERP-10 | [#19 Zkušební průchod, scénář workshopu a výchozí vydání](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/19) | Příprava | [#13](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/13), [#14](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/14), [#15](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/15), [#16](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/16), [#17](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/17), [#18](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/18) | `feature/erp-10-generalka` |
| ERP-11 | [#20 Tým A: Filtrování faktur podle úhrady a splatnosti](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/20) | Workshop A (2 lidé) | [#19](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/19) | `feature/erp-11-filtr-faktur` |
| ERP-12 | [#21 Tým B: Export faktur do CSV](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/21) | Workshop B (2 lidé) | [#19](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/19) | `feature/erp-12-export-faktur` |
| ERP-13 | [#22 Tým C: Import zákazníků z CSV s náhledem](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/22) | Workshop C (3 lidé) | [#19](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/19) | `feature/erp-13-import-zakazniku` |

## Pořadí

1. Návrh ERP-01 a jeho PR.
2. Základ ERP-02.
3. Databáze a účty ERP-03.
4. Zákazníci ERP-04 a produkty ERP-05 (oddělené funkce, vlastní větve).
5. Objednávky ERP-06, potom faktury ERP-07 a přehled ERP-08.
6. Publikování ERP-09 lze připravovat od základu a databáze; před generálkou musí fungovat.
7. Generálka ERP-10 a označení výchozí verze.
8. Teprve při workshopu týmové ERP-11, ERP-12 a ERP-13.

Budoucí větve nejsou založeny předčasně: vzniknou z aktuálního main až při skutečném zahájení práce. Tím se omezí zbytečně zastaralé základy.

## Evidence práce

Issue nejprve obsahuje zadání a očekávání. Vlastní větev uchová změny a skutečné commity. PR odkazuje na Issue, ukazuje diff, kontroly a výsledek převzetí. Po skutečném sloučení může uzavřít Issue. Nezakládají se prázdné ani zpětně předstírané PR jen kvůli ukázce historie.

Jména vlastníků, kontrolujících a termíny přidělí lektor; zatím nejsou domýšlena. Původní Markdown úkoly byly odstraněny; jejich Issues #1–#9 nejsou součástí ERP backlogu.


## Stav implementace 16. 11. 2026

Základní moduly jsou implementované v PR #24–#30, automatizace v #31. Online databáze (#12), aktivace Pages (#18) a úplný účastnický pilot (#19) zůstávají otevřené. Týmové #20–#22 zůstávají účastníkům. [Skutečné výsledky](OVERENI.md).

## Dokončení databáze

Projekt Workshop IMCG je aktivní, obě migrace aplikované a osm přihlášení ověřených. Přístupy týmů a reálné operace přes HTTP API prošly. ERP-03 / #12 je dokončený; #18 a #19 zůstávají pro Pages a skutečný účastnický pilot. [Aktuální ověření](OVERENI.md).
