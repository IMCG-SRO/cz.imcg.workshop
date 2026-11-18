# Workshop 2 Lektorský průvodce

Verze 2.1 · 18. 11. 2026. [Program](01_program_a_priprava.md) · [Aplikace](https://imcg-sro.github.io/cz.imcg.workshop/) · [Repozitář](https://github.com/IMCG-SRO/cz.imcg.workshop).

## Před zahájením

Otevři společnou aplikaci a náhledy A/B/C, ověř zobrazený commit a online režim. Sdílená databáze a Pages již fungují. Přiřaď sedm lidí k týmům a ERP účtům; hesla předej jednotlivě. Přístup správce nenahrazuje kontrolu účtů účastníků. Ověř připojení GitHubu a přístup ke Xerox a jeho zdrojům.

V main zůstává základ aplikace s připravenými vstupními body rozšíření. Zkušební řešení všech tří úkolů byla podle zprávy z 17. 11. odstraněna. [Kontrolní seznam](06_kontrola_pripravy.md) a [evidence ověření](../docs/mini-erp/OVERENI.md).

## Část 1 Kontrola předchozí práce

Vyhraď 25 minut. Každý krátce představí pracovní pokus a zkušenost, srovnání Chatu a Worku, test vlastního pluginu či skillu a skutečný výsledek automatizace. Zachyť jednu otázku a další krok. Případný individuální problém se během celého kola nedokončuje.

## Část 2 Xerox France

Vyhraď 45 minut podle [připravené ukázky](04_ukazka_xerox.md):

| Délka | Ukázka |
| --- | --- |
| 5 min | Project Home, účel a pracovní pravidla |
| 8 min | Struktura, souhrn a konkrétní originální zdroj |
| 10 min | Dotaz, zdroj odpovědi a kontrola jednoho tvrzení |
| 7 min | Návrh krátkého výstupu a řízená změna na cvičné stránce |
| 8 min | Vlastní dotazy účastníků |
| 7 min | Pravidla spolupráce a společné vyhodnocení |

Projektová dokumentace zůstává anglicky, výklad česky. Při pouhém dotazu odpověď zůstává v chatu. Pro ukázku zápisu předem urči bezpečný cíl. Před nahrazením textu archivuj přesnou starou verzi a po změně doplň Page Updated se zadavatelem, editorem, časem Europe/Prague a archivním odkazem. SharePointové originály se nemění. [Závazný postup prostoru](https://chatgpt.com/space/page_5e555369c93481a499861a09ad54d169).

## Část 3 Týmové mini ERP

Nejprve předveď hotový obchodní případ: zákazník, objednávka se dvěma produkty, potvrzení, faktura, úhrada a přehled. Potom v GitHubu ukaž skutečný přípravný Issue a jeho PR: zadání, větev, commit, diff, provedené kontroly a merge. Historie přípravy je v PR #23–#37. AI kontrolu neprezentuj jako lidské schválení.

| Krok | Délka v plném scénáři | Výsledek |
| --- | --- | --- |
| ERP a ukázka Issue, větve a PR | 20 min | Tým rozumí aplikaci i historii |
| Zadání a očekávání | 15 min | Běžný, chybný a hraniční případ |
| Vývoj s AI | 45 min | Změna v určeném modulu a commity |
| Automatické testy a opravy | 25 min | Skutečný běh kontrol na daném commitu |
| Převzetí jiným týmem | 25 min | Záznam ručních scénářů v PR |
| Postupné merge a společná kontrola | 15 min | Ověřená integrovaná aplikace |
| Zpětná vazba | 5 min | Co se tým naučil |
| Rezerva dle průběhu | 0–30 min | Celkem 150–180 minut |

Tým A (2 lidé) řeší #20 filtr faktur, B (2) #21 export CSV, C (3) #22 import zákazníků. Autor zadání a kontrolující nejsou totožní: A kontroluje B, B kontroluje C, C kontroluje A. V týmu určete zapisujícího, testujícího a ve třech také konzultanta požadavku; role lze střídat.

Týmy mění jen vlastní složku pod mini-erp/src/extensions/ a vlastní testy. Sdílenou změnu nejprve domluv. Použij [postup a zahajovací prompt](../docs/mini-erp/POSTUP.md), [přesná kritéria](../docs/mini-erp/TYMOVE_UKOLY.md) a mini-erp/AGENTS.md.

## Náhledy a testy

[MAIN](https://imcg-sro.github.io/cz.imcg.workshop/) · [A](https://imcg-sro.github.io/cz.imcg.workshop/A/) · [B](https://imcg-sro.github.io/cz.imcg.workshop/B/) · [C](https://imcg-sro.github.io/cz.imcg.workshop/C/).

Při změně týmové větve spusť Publish ERP and team previews z main. Workflow spuštěné přímo z feature větve nepublikuje. Dokud větev neexistuje, náhled používá základ main. Vždy ověř zobrazený commit; adresa sama nedokazuje, že se díváš na právě změněný kód.

Testy vycházejí ze zadání a předem stanovených očekávání. Demonstraci chybného datumového pravidla dělej pouze v testovací větvi a po červeném testu ji oprav. Do main patří pouze ověřená změna. Ruční převzetí zachytí scénář, vstup, očekávání, výsledek, kontrolujícího a commit. Oprava zůstává ve stejné větvi a stejném PR.

## Potíže a přerušení

Neviditelný soubor řeš kontrolou účtu, větve a cesty; případně vlož přesný obsah či diff do chatu. Při chybě spojení nejprve přečti hlášení. Výslovné místní demo nesdílí data mezi počítači a nenahrazuje online kontrolu. Konflikt ani selhání kontrol neobcházej přepsáním cizí práce.

Části 1 a 2 mají přednost. Pokud zůstane původní blok 10:50–11:55, udělej zkrácenou ukázku a začátek práce. Ulož commit a draft PR s posledním funkčním krokem, skutečnými výsledky testů a nejbližším dalším krokem. Neoznačuj nedokončené rozšíření jako hotové.

## Uzavření

Každý tým vrátí odkaz na PR, Issue a náhled, stručně ukáže změnu, doloží testy a nezávislé převzetí. Merge řídí lektor a po něm zkontroluje publikovaný main. Do osobní podstránky účastníci zapíší zkušenost a případný další krok.
