# Workshop 2 Program a příprava

Verze 2.1 · 19. 11. 2026. Sedm účastníků, tři týmy 2+2+3. Cvičení proběhne v pátek 27. 11. 2026. Konečný časový rámec se ještě upřesní.

## Cíl

Účastníci sdílejí zkušenosti z prvního workshopu, v lektorské ukázce uvidí, jak se pracuje s reálnou projektovou dokumentací a jak ověřit odpověď AI a společně dodají malou změnu webové aplikace pomocí AI a GitHubu.

## Program a čas

| Část | Obsah a výsledek | Délka |
| --- | --- | --- |
| 1 Kontrola předchozích úkolů | Osobní pracovní pokus, Chat a Work, vlastní plugin nebo skill, skutečný výsledek ranní automatizace; zkušenost a otázka každého | 25 min |
| 2 Prostor Xerox France | Lektor vysvětlí účel prostoru a předvede navigaci, dotaz na AI, ověření odpovědi ve zdroji a řízenou změnu | 45 min |
| Přestávka | Přihlášení a přechod na ERP | 10 min |
| 3 Mini ERP a GitHub | Týmové zadání, vývoj s AI, testy, PR, převzetí a merge | odhad 150–180 min |
| Uzavření | Výsledek, odkaz na PR a další krok | 5 min |

Celý scénář tak vyžaduje přibližně 235–265 minut. Původní rámec 9:30–12:00 zůstává kratší variantou: části 1 a 2 proběhnou celé, ERP dostane 65 minut a rozpracovaná změna se uchová v commitu a draft PR. Zbytek se dokončí v navazujícím bloku.

## 1 Kontrola hotových úkolů

Každý přinese vlastní podstránku a formulář Můj první pracovní pokus, zkušenost s Chatem a Workem, plugin nebo skill s výsledkem testu a nastavenou ranní automatizaci se skutečným výstupem běhu. Přibližně dvě minuty na člověka: výsledek, přínos, jedna otázka. Úkoly v tomto kole společně nedokončujeme.

## 2 Xerox France

Použijeme existující [projektový prostor](https://chatgpt.com/space/page_6af572749f0481a4b558f621dea35aaf) a [How to Work with This Space](https://chatgpt.com/space/page_5e555369c93481a499861a09ad54d169). Výklad probíhá česky, dokumentace a projektové prompty zůstávají anglicky. Prostor je strukturovaná dokumentace se souhrny a vybranými detaily; originály jsou na SharePointu.

Lektor projde prostor, vysvětlí, k čemu slouží, a ukáže, jak najít relevantní stránku a původní zdroj. Položí ukázkový dotaz a ve zdroji ověří jedno tvrzení. Vysvětlí rozdíl mezi datem stavu projektu a datem úpravy stránky i mezi dotazem bez zápisu a změnou dokumentace. Řízenou změnu předvede na určené cvičné stránce podle pravidel archivu a Page Updated. Účastníci ukázku sledují bez vlastního cvičení. [Scénář a prompty](04_ukazka_xerox.md).

## 3 Týmové mini ERP

[Společná aplikace](https://imcg-sro.github.io/cz.imcg.workshop/) · [Repozitář](https://github.com/IMCG-SRO/cz.imcg.workshop).

| Tým | Lidé | Zadání | Větev | Přebírá |
| --- | --- | --- | --- | --- |
| A | 2 | [#20 Filtr faktur](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/20) | feature/erp-11-filtr-faktur | tým C |
| B | 2 | [#21 Export faktur CSV](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/21) | feature/erp-12-export-faktur | tým A |
| C | 3 | [#22 Import zákazníků](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/22) | feature/erp-13-import-zakazniku | tým B |

Jeden hlavní zapisující chat na tým, role si účastníci střídají. Nejprve porozumění zadání a očekávané výsledky, potom vlastní větev, plán s AI a malá implementace. Následují skutečné automatické kontroly, PR s náhledem a commitem, převzetí jiným týmem, opravy a merge řízený lektorem. Nakonec ověření společné aplikace.

## Připraveno a zbývá

- Základ ERP, databáze, osm přihlášení, týmové prostory a publikování jsou připravené. [Stav a důkazy](../docs/mini-erp/OVERENI.md).
- Technická generálka všech tří cvičení byla podle poslední zprávy dokončena 17. 11.; prostředí se vrátilo do výchozího stavu.
- Doplnit finální délku a [konkrétní rozdělení lidí a GitHub účtů](05_rozdeleni_ucastniku.csv).
- Před setkáním ověřit přístupy účastníků do ChatGPT a GitHubu, přihlášení do ERP a publikovaný commit. Pro ukázku Xerox ověřit z účtu lektora přístup do prostoru a k vybranému originálu na SharePointu.
- Dokončit otevřené organizační podmínky [#19](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/19), včetně účastnického pilotu a označení výchozího vydání.

[Kontrolní seznam](06_kontrola_pripravy.md) · [Podrobná příprava ERP](../docs/mini-erp/PRIPRAVA.md)
