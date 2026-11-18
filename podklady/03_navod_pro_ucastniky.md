# Workshop 2 Návod pro účastníky

Verze 2.1 · 18. 11. 2026. [Přehled workshopu](https://chatgpt.com/space/page_c1ccd2a35d7081a497a6980d45ae6089) · [Aplikace](https://imcg-sro.github.io/cz.imcg.workshop/) · [Repozitář](https://github.com/IMCG-SRO/cz.imcg.workshop).

## Co si připravit

Přineste hotový Můj první pracovní pokus na vlastní podstránce, zkušenost s Chatem a Workem, vlastní plugin nebo skill s výsledkem testu a ranní automatizaci se skutečným výstupem. Přihlaste se do firemního ChatGPT a svého GitHub účtu. Ověřte přístup k Xerox, jeho zdrojům a repozitáři.

GitHub účet určuje autorství změny kódu. Oddělený cvičný ERP účet ucastnik01–07 slouží k fiktivním datům, přidělí jej lektor. Správu Supabase nepotřebujete.

## 1 Zkušenosti z prvního workshopu

Během přibližně dvou minut ukažte svůj pracovní pokus, přínos a jednu otázku. Úkoly během společného kola nedokončujeme.

## 2 Práce nad Xerox France

Otevřete [projektový prostor](https://chatgpt.com/space/page_6af572749f0481a4b558f621dea35aaf) a [pracovní pravidla](https://chatgpt.com/space/page_5e555369c93481a499861a09ad54d169). Najděte relevantní souhrn a konkrétní zdroj. Položte jednu věcnou otázku, otevřete uvedený podklad a ověřte alespoň jedno tvrzení. Dokumentace i projektové prompty jsou anglicky, společný výklad česky.

Příklad otázky bez zápisu:

```text
Read How to Work with This Space first:
https://chatgpt.com/space/page_5e555369c93481a499861a09ad54d169
From the accessible Xerox France documentation, answer: [my question].
Answer in English in this chat only. Cite the specific page or original file and location. Distinguish the documented status date from the page update date. If the original SharePoint source is inaccessible or the answer is missing, say so. Do not change any page, file, archive, log or instructions.
```

Prostor nabízí souhrny a vybrané detaily; přesnou specifikaci ověřujete v originálu. Odkaz na SharePoint neznamená automatický přístup k souboru. Návrh připravujte ve vlastním projektu. Zápis do sdílené dokumentace vyžaduje konkrétní zadání a archivaci se záznamem Page Updated podle pravidel prostoru.

## 3 Týmové mini ERP

| Tým | Lidé | Úkol | Kontroluje |
| --- | --- | --- | --- |
| A | 2 | [#20 Filtr faktur](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/20) | práci týmu B |
| B | 2 | [#21 Export CSV](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/21) | práci týmu C |
| C | 3 | [#22 Import zákazníků](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/22) | práci týmu A |

[Zadání, vzorová data a kritéria](../docs/mini-erp/TYMOVE_UKOLY.md). Plný ERP blok má odhad 150–180 minut; přesný čas oznámí lektor.

1. Otevřete [ERP](https://imcg-sro.github.io/cz.imcg.workshop/), přihlaste se přiděleným účtem a zkontrolujte pracovní prostor, režim a verzi. Náhledy jsou [A](https://imcg-sro.github.io/cz.imcg.workshop/A/), [B](https://imcg-sro.github.io/cz.imcg.workshop/B/) a [C](https://imcg-sro.github.io/cz.imcg.workshop/C/).
2. Přečtěte své Issue. Před implementací stanovte běžný, chybný a hraniční případ s očekávaným výsledkem.
3. Z aktuálního main vytvořte týmovou větev: A feature/erp-11-filtr-faktur, B feature/erp-12-export-faktur, C feature/erp-13-import-zakazniku. V týmu používejte jeden hlavní zapisující chat s AI a role si střídejte.
4. Nechte AI načíst specifikaci a mini-erp/AGENTS.md, vysvětlit zadání a navrhnout plán se soubory. Měňte vlastní rozšíření a testy; sdílené části domluvte s lektorem.
5. S AI doplňte testy podle zadání. Skutečně spusťte npm test a npm run build v mini-erp/ a kontroly GitHub Actions. Přečtěte chybu a opravte příčinu.
6. Otevřete PR do main s odkazem na Issue. Uveďte co se mění, skutečné výsledky kontrol, URL náhledu a commit. Publikování týmových náhledů z main spouští lektor.
7. Převezměte práci přiděleného týmu. Na správném commitu proveďte běžný, chybný a hraniční scénář a výsledek zapište do PR. Autor vlastní práci neschvaluje.
8. Připomínku opravte ve stejné větvi a PR. Po kontrole lektor řídí merge; potom ověřte společnou aplikaci a její commit.

## Prompty pro práci s AI

```text
Read Issue [URL], docs/mini-erp/SPECIFIKACE.md, TYMOVE_UKOLY.md and mini-erp/AGENTS.md in IMCG-SRO/cz.imcg.workshop. First explain the acceptance criteria in Czech and propose a small plan with affected files. Work only in [team branch], never directly in main. Implement only our extension and its tests. Derive expected results from the assignment. Report only checks actually run. Open a PR linked to the Issue; do not merge without the lecturer's instruction.
```

```text
Compare the actual diff of PR [URL] at commit [SHA] with Issue [URL]. For every acceptance criterion state met, not met or cannot verify and explain the evidence. Check scope, tests and edge cases. Return findings in this chat only; do not change or approve anything in GitHub.
```

[Podrobný postup](../docs/mini-erp/POSTUP.md). Pokud propojení přesnou větev nevidí, vložte aktuální obsah či diff a označte jeho původ.

## Výsledek a pokračování

Hotový výsledek obsahuje funkci podle kritérií, testy se skutečným během, PR, ruční převzetí jiným týmem, řízené merge a ověření main. Do osobní podstránky zapište tým, Issue, PR, testovaný commit, výsledek a další krok.

Když dojde čas, uchovejte commit a draft PR, poslední funkční krok, provedené testy a konkrétní pokračování. Hesla ani administrátorské klíče do chatu či Gitu nevkládejte. Místní demo přes ?mode=demo ukládá data jen v konkrétním prohlížeči.
