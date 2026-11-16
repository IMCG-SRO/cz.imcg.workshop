# Workshop 2 Návod pro účastníky

Verze 1.0 pro repozitář, 16. 11. 2026. Navazuje na podklady z 11. 11. 2026.

[Úvod repozitáře](../README.md) · [Přehled podkladů](README.md)

*Pracovní prostor a GitHub v praxi  •  9:30–12:00*

Na workshop přineste hotové pokusy z prvního setkání. Potom si vyzkoušíte dotaz nad společnými podklady a vlastní malou změnu v GitHubu s pomocí AI. Každý pracuje na vlastním účtu.

| Čas | Program |
| --- | --- |
| 9:30–9:55 | Kontrola hotových úkolů |
| 9:55–10:40 | Pracovní prostor Xerox |
| 10:40–10:50 | Přestávka |
| 10:50–11:55 | GitHub a AI v praxi |
| 11:55–12:00 | Uzavření |

## Co si připravit předem

- Vlastní podstránku s dosavadním používáním AI a vyplněným formulářem Můj první pracovní pokus.

- Výsledky zkoušky Chatu a Worku a jednu zkušenost, kterou chcete sdílet.

- Vlastní plugin nebo skill a výsledek jeho testu.

- Ranní automatizaci: čas, zdroje a skutečný výsledek běhu. Pokud nefunguje, stručný popis problému.

- Přihlášení do firemního ChatGPT, vlastní GitHub účet a přístup k přidělenému repozitáři.

### Co řeknete v úvodním kole

Během přibližně dvou minut představte svůj pracovní úkol, výsledek pokusu a jednu otázku nebo zkušenost. Úkoly v tomto bloku společně nedokončujeme.

Moje hlavní zkušenost: ____________________________________
Moje otázka: ______________________________________________

[Podklady Workshopu 2](https://chatgpt.com/space/page_c1ccd2a35d7081a497a6980d45ae6089)

## Práce ve sdíleném prostoru Xerox

Lektor ukáže prostor Xerox Francie – E-invoicing a E-reporting. Najděte přehled projektu, jeho správce a aktuální podklady. Odkaz je v [přípravě ukázky Xerox](04_ukazka_xerox.md).

### Váš krátký pokus

1. Otevřete jeden z podkladů, které lektor určil pro ukázku.

2. Položte jednu konkrétní otázku a vyžádejte si zdroj odpovědi.

3. Otevřete uvedený zdroj a ověřte alespoň jedno tvrzení.

4. Řekněte, co jste zjistili a která informace zůstala nejasná.

```text
Read-only question about Xerox France E-invoicing and E-reporting.

First read How to Work with This Space:
https://chatgpt.com/space/page_5e555369c93481a499861a09ad54d169

Question: [question, relevant process or system, and status date if applicable]
Answer format: [short explanation or source-backed comparison]

Answer in English in this chat only. Do not create, edit, delete, move or update pages, files, archives, logs, instructions or schedules. Cite the relevant page or original source and its location. Distinguish documented facts, inference and missing evidence. If the original SharePoint file is inaccessible, say what could not be verified. A question does not authorise changes.
```

### Pravidla pro společnou práci

- Začněte přehledem projektu a ověřte, která verze podkladů platí.

- Společné pokyny mění správce. Jeden chat věnujte jednomu tématu.

- Pracovní varianty připravujte ve vlastním projektu pod firemním účtem. Do společného prostoru předejte zkontrolovaný přehled.

- Rozlišujte návrh a potvrzené rozhodnutí. Výstup označte autorem, verzí, datem a zdroji.

- Při ukládání určete přesnou cílovou stránku. Otevřete vrácený odkaz a ověřte výsledek.

Tato pravidla slouží nácviku a navazují na návrhy desater v Příručce AI. Konkrétní pravidla projektu potvrdí správce. Přístup k prostoru sám nezaručuje přístup ke každému odkazovanému souboru.

Moje otázka: ______________________________________________
Ověřené tvrzení a zdroj: ____________________________________
Otevřená otázka: ___________________________________________

## Vlastní změna v GitHubu

Cvičení používá dokumentaci fiktivní SAP úpravy. Každý má jednu kartu v zadani a vlastní cílový soubor v docs/scenare. Cílem je naučit práci se změnou, nikoli programovat SAP.

Repozitář: IMCG-SRO/cz.imcg.workshop  Moje číslo úkolu: __________
Moje větev: cviceni/NN-github-login  Kontroluje kolega: __________

### Pojmy

Repozitář obsahuje soubory a jejich historii. Větev odděluje vaši rozpracovanou změnu. Commit ukládá jeden krok. Pull request navrhuje převzetí změny a umožní kontrolu. Merge sloučí schválenou změnu do cílové větve main.

### Postup ve webu GitHubu

1. Otevřete README.md a svou kartu zadání. Najděte cílový soubor a přečtěte kritéria hotového výsledku.

2. Ve výběru větví zvolte aktuální main, zadejte vlastní název cviceni/NN-github-login a vytvořte větev. Ověřte zobrazený název.

3. S pomocí ChatGPT připravte malou úpravu. Porovnejte ji se zadáním a ověřte všechny příklady.

4. Ve své větvi otevřete cílový soubor a tužkou jej upravte. Zkontrolujte náhled a uložte přes Commit changes s krátkou zprávou o změně.

5. Otevřete Pull requests a New pull request. Base je main, compare je vaše větev. Ve Files changed se má měnit pouze váš cílový soubor.

6. Doplňte název a popis pull requestu: co a proč se mění, které zadání řešíte a jak jste výsledek ověřili. Odešlete jej a předejte kolegovi ke kontrole.

7. Připomínku opravte ve stejné větvi a uložte další commit. Stejný pull request se aktualizuje. Po kontrole lektor řídí sloučení a vy ověříte výsledek v main.

Všechny úpravy provádíte přes web. Zkontrolujte svou větev před každým uložením. Pokud web nabízí fork nebo chybí oprávnění, obraťte se na lektora. Heslo ani přístupové tokeny do chatu nevkládejte.

## AI kontrola a výsledek cvičení

### Načtení zadání přes propojení

Pomocí připojeného GitHubu načti repozitář IMCG-SRO/cz.imcg.workshop, větev main, soubory README.md, moje zadání [CESTA K ZADÁNÍ] a cílový soubor [CESTA K SOUBORU]. Uveď repozitář, načtenou větev, cesty a dostupný odkaz na zdroj. Vysvětli mi můj úkol a kritéria hotového výsledku. Pokud přesnou větev či soubor nedokážeš načíst, řekni to a nepoužívej jinou verzi. Nic nikam nezapisuj.

### Návrh změny

Z přiloženého zadání a současného obsahu souboru navrhni nejmenší úpravu, která splní všechna kritéria. Vrať celý nový obsah cílového Markdown souboru, stručný seznam změn a návrh zprávy commitu. Měň jen můj cílový soubor. Nevymýšlej další funkce ani pravidla. Nic do GitHubu nezapisuj. Současný obsah: [VLOŽ OBSAH]. Zadání: [VLOŽ ZADÁNÍ].

### Kontrola kolegova pull requestu

- Otevřete Files changed a přečtěte zadání kolegy. Porovnejte všechny podmínky a příklady.

- Ověřte, že se mění jen přidělený soubor a nepřibylo jiné pravidlo.

- Napište konkrétní připomínku, nebo po skutečné kontrole přidejte schválení přes Review changes. Autor neschvaluje vlastní pull request.

- Pokud nemáte právo schválit, přidejte komentář s výsledkem kontroly a požádejte lektora o další postup.

AI může pomoci s kontrolou skutečného diffu. Její výsledek porovnejte se zadáním sami. Pokud propojení nevidí přesný soubor nebo vaši větev, vložte aktuální obsah a diff ručně.

### Hotový výsledek

Máte vlastní větev, malý commit, pull request s popisem ověření, kontrolu kolegou a ověřený výsledek v main po sloučení. Cílem je zvládnout všechny kroky během workshopu.

Odkaz na můj pull request: __________________________________
Co jsem změnil a ověřil: ____________________________________
Kdo provedl kontrolu: _______________________________________
Stav po workshopu: _________________________________________
Pokud pokračuji příště, můj další krok je: ______________________

Při potížích si uchovejte odkaz na větev nebo pull request. Zaznamenejte poslední hotový krok a konkrétní překážku. Pokračování příště naváže na tuto práci.
