# Postup práce s AI, větvemi a Pull Requesty

Verze 0.1 • 16. 11. 2026 • Autor: ChatGPT.
Platí pro mini ERP. Původní textové úkoly byly odstraněny.

## 1. Zadání a očekávání

Z Issue přečíst cíl, omezení a podmínky převzetí. Sepsat běžný případ, chybný vstup a hraniční situaci včetně očekávaného výsledku. AI může pomoci formulovat očekávání, ale nesmí změnit zadání jen proto, aby vyhovovalo existujícímu kódu.

## 2. Vlastní větev

Ověřit splnění závislostí. Vytvořit větev pojmenovanou podle backlogu z aktuálního main. Nepracovat přímo v main. V týmu je jeden zapisující pracovní chat; nezávislá kontrola může běžet v jiném chatu bez oprávnění měnit obsah.

## 3. Vývoj s AI

Před implementací vyžádat plán a seznam dotčených souborů. Měnit jen určený modul; změny sdílených částí domluvit s lektorem. AI nesmí přidat placenou službu, tajný klíč ani zbytečnou závislost. Člověk porovná diff se zadáním a musí umět vysvětlit nové chování. Ukládat malé commity s popisem účelu.

## 4. Testy s AI

Testy vycházejí z podmínek převzetí a předem stanovených výsledků. Vedle pozitivního případu testují odmítnutí, hraniční hodnoty a neovlivnění původní funkce. Čas se v testech řídí explicitně. Žádný test nepřepisuje společná online data.

Spustit automatické kontroly přes GitHub Actions; nestačí prohlášení AI „testy by měly projít“. Výsledek se opírá o konkrétní běh a commit. Jako lektorskou demonstraci lze v testovací větvi záměrně rozbít datumové pravidlo, ověřit červený test a chybu opravit; chybná verze nesmí být sloučena.

## 5. Pull Request

Otevřít PR do main s odkazem na Issue. Použít následující minimum:

```markdown
## Problém a změna
Co požadavek řeší a jak se chová výsledek.

## Zadání
Closes #SKUTECNE_CISLO_ISSUE

## Ověření
- Automatické: odkaz na běh a testovaný commit.
- Ruční: scénář, vstup, očekávaný a skutečný výsledek, kontrolující a datum.
- Náhled: URL a commit.
- Neprovedeno / omezení: pravdivě uvést.

## Dokumentace
Co bylo aktualizováno a případně proč změna návodu není nutná.
```

Zástupné hodnoty je nutné před odevzdáním nahradit. Funkční PR musí obsahovat také příslušné testy. Čistě dokumentační PR uvádí kontrolu obsahu a odkazů; nesmí tvrdit testování neexistující aplikace.

## 6. Převzetí jiným týmem

A kontroluje B, B kontroluje C, C kontroluje A. Kontrolující otevře náhled správné větve a commitu, přečte zadání a provede pozitivní, negativní a hraniční scénář. Kontroluje také přehlednost změny; konzultant přebírá funkci z uživatelského pohledu, AI nebo vývojář může pomoci s kódem.

Výsledek zaznamená do PR. Chyba má kroky, vstup, očekávání a skutečný výsledek. Autoři opraví stejnou větev. Po změně kódu se znovu ověří dotčené scénáře na novém commitu. Žádné fiktivní lidské schválení.

## 7. Sloučení a společná kontrola

Sloučení řídí lektor po splnění kritérií. Před merge ověřit aktuálnost proti main a integrační kontroly; testy samotné původní větve nezaručují správnost kombinace změn.

Sloučit postupně. Pokud je dostupné, preferovat merge commit pro názornou historii větví. Po merge ověřit publikovaný main, jeho commit a základní průchod aplikací. Teprve potom uzavřít úkol a odstranit hotovou větev podle pravidel lektora. Historii důkazů uchovává PR.

## Definice hotového výsledku

- Splněné podmínky převzetí a přiměřený rozsah změny.
- Skutečně provedené a doložené automatické testy.
- Ruční převzetí jiným týmem na aktuálním commitu.
- Dokumentace odpovídající výsledku.
- Žádné tajné údaje a neplánované změny mimo modul.
- Merge a ověření integrované aplikace.

## Když dojde čas

Uložit commit a odkaz na draft PR. Uvést poslední funkční krok, skutečné výsledky testů, zbývající práci a další konkrétní krok. Neoznačovat úkol jako dokončený a neslučovat neověřenou změnu.

## Prompt pro zahájení

„Přečti Issue [odkaz], specifikaci v docs/mini-erp a platné AGENTS.md. Nejprve shrň podmínky převzetí a navrhni malý plán se seznamem souborů. Pracuj pouze ve větvi [větev], nikdy přímo v main. Zachovej rozsah modulu. Očekávané výsledky testů odvoď ze zadání. Dokládej jen kontroly, které skutečně proběhly. Změnu předej jako PR s vazbou na Issue; bez pokynu lektora ji neslučuj.“
