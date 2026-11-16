# Workshop 2 — návod pro účastníky

Verze 2.0 • 16. 11. 2026 • Aktualizace s AI na zadání Nikoly Spěšného.

## Před workshopem

Přineste hotové úkoly z prvního setkání, ověřte přístup do firemního ChatGPT, repozitáře a prostoru Xerox. GitHub účet je osobní identita pro změny kódu. Cvičný ERP účet slouží pouze pro práci s fiktivními daty a při online provozu jej přidělí lektor. Účet ke správě Supabase nepotřebujete.

## Část 1 a 2

Nejprve kontrola předchozích úkolů a dotazy, potom [Xerox France](04_ukazka_xerox.md). Tyto části mají přednost; přesný čas ERP bloku lektor oznámí.

## Část 3 — skutečná aplikace

Tři týmy: A dva lidé, B dva lidé, C tři lidé. [Zadání a očekávané výsledky](../docs/mini-erp/TYMOVE_UKOLY.md). A filtruje faktury, B exportuje CSV, C importuje zákazníky.

1. Otevřete ERP na adrese předané lektorem. Ověřte tým, verzi a režim. Místní demo nesdílí data mezi počítači.
2. Přečtěte své Issue a stanovte očekávané výsledky před implementací.
3. Z aktuálního main založte vlastní větev podle Issue. V týmu používejte jeden hlavní zapisující chat s AI; role si vystřídejte.
4. S AI připravte malý plán, vyvíjejte pouze určený modul a kontrolujte diff.
5. S AI doplňte testy, spusťte GitHub Actions a opravte chyby. Zelený test má význam jen pokud ověřuje skutečné zadání.
6. Otevřete PR do main, propojte Issue a doložte skutečné kontroly i adresu náhledu.
7. A kontroluje B, B kontroluje C, C kontroluje A. Ruční převzetí se zapíše k testovanému commitu.
8. Merge řídí lektor. Poté ověřte společnou verzi.

[Podrobný postup a zahajovací prompt](../docs/mini-erp/POSTUP.md). Neznámý krok se zeptejte AI vysvětlit, neodevzdávejte změnu, které nerozumíte. Při nedokončení uložte commit/draft PR a další krok.
