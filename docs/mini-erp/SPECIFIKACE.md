# Funkční specifikace mini ERP

Verze 0.1 • 16. 11. 2026 • Autor: ChatGPT na zadání Nikoly Spěšného.
Návrh pro výukovou aplikaci. Nejde o produkční SAP ani účetní systém.

## Cíl a rozsah

Fiktivní obchodní firma prodává několik produktů. Proces: zákazník → koncept objednávky → potvrzená objednávka → jedna faktura → označení úhrady. Český web, měna CZK, bez DPH, slev a kurzových přepočtů.

Základ je implementován; aktuální provoz a kontroly popisuje [záznam ověření](OVERENI.md). Filtrování faktur, export CSV a import zákazníků jsou záměrně ponechány týmům. PDF/OCR není povinnou součástí a nebude v prvním zadání.

Mimo rozsah: účetnictví, daňové doklady podle zákona, sklad, nákup, personalistika, bankovní integrace, SAP, e-mailové odesílání, skutečné zákaznické údaje, částečné platby, storna a mazání dokladů. Faktury budou označeny jako výukové doklady.

## Obrazovky

| Obrazovka | Funkce připravená před workshopem |
| --- | --- |
| Přihlášení | Předem přidělený cvičný účet, odhlášení, chybová zpráva |
| Přehled | Počty zákazníků a objednávek, neuhrazené částky a částky po splatnosti |
| Zákazníci | Seznam, detail, založení, úprava |
| Produkty | Seznam, založení, úprava |
| Objednávky | Seznam, detail, koncept s položkami, potvrzení |
| Faktury | Seznam, detail, vytvoření z objednávky, označení úhrady |

Každá obrazovka rozlišuje načítání, prázdný výsledek a chybu. Úspěch se zobrazí teprve po potvrzeném zápisu. Je viditelný aktuální pracovní prostor, verze/commit a online nebo demonstrační režim. Chyba online spojení se nesmí automaticky vydávat za úspěšné místní uložení.

## Obchodní pravidla

### Zákazníci

Kód a název jsou povinné po oříznutí mezer. Kód se normalizuje na velká písmena a je unikátní v pracovním prostoru. E-mail a adresa jsou volitelné; neprázdný e-mail projde základní syntaktickou kontrolou. Zákazníci se nemažou. Faktura uchová vlastní kopii odběratele.

### Produkty

Povinný unikátní normalizovaný kód, název a cena. Cena je kladná v CZK, nejvýše 1 000 000,00 Kč a maximálně dvě desetinná místa. Ukládá se jako celé haléře. Žádné výpočty součtů desetinnými binárními čísly. Produkt se nemaže. Úprava ceníku neovlivní uložené položky objednávek.

### Objednávky

Objednávka má zákazníka ze stejného prostoru a alespoň jednu položku. Množství je celé číslo 1–999, nejvýše 100 položek. Položka kopíruje název produktu a cenu při vložení. Součet položky = množství × jednotková cena v haléřích; objednávka = součet položek.

Stavy: koncept → potvrzená → fakturovaná. Koncept lze upravit a změnit zákazníka; potvrzená objednávka se již neupravuje. Přechody kontroluje i databáze, ne pouze tlačítka. Víceřádkové uložení je atomické a výpočty ověřuje databázová operace.

### Faktury

Vznikají z potvrzené objednávky a převezmou její uložené hodnoty. Jedna objednávka má nejvýše jednu fakturu, vynuceno i při souběžných požadavcích. Číslo je generované a unikátní v prostoru; mezery v číselné řadě jsou pro cvičení přijatelné.

Datum vystavení je dnešní kalendářní den Europe/Prague; splatnost je výchozí datum vystavení + 14 kalendářních dnů a nesmí mu předcházet. Faktura ukládá snímek zákazníka a položek. Stav je neuhrazená / uhrazená. Úhrada má datum a identitu cvičného účtu, provádí se pouze jednou. Vrácení úhrady ani částečná platba není součástí.

Po splatnosti = datum splatnosti < dnešní den Europe/Prague. Dnešní splatnost není po splatnosti. Neuhrazené po splatnosti = současně neuhrazená a po splatnosti. Testy používají explicitně zadané datum, aby nezávisely na čase spuštění.

### Přehled

Počet objednávek zahrnuje všechny její stavy, bez dvojího započítání. Součet neuhrazených zahrnuje i dosud nesplatné. Součet neuhrazených po splatnosti používá stejné datumové pravidlo. Vše pouze z právě zvoleného a oprávněného prostoru.

## Technologie a oddělení modulů

Implementace v0.1: TypeScript + Vite, HTML/CSS rozhraní, Supabase klient a PostgreSQL, Vitest a SQL testy přes PGlite. Prohlížečové průchody byly provedeny při přípravě; samostatný Playwright runner není součástí výchozí v0.1. Bez samostatného aplikačního serveru. Změna technologie vyžaduje zapsaný důvod do návrhového Issue.

Implementované cesty a připravené vstupní body týmových rozšíření:

| Cesta | Odpovědnost |
| --- | --- |
| mini-erp/src/core/ | Datové typy, přístup k datům, přihlášení, peníze a datum |
| mini-erp/src/modules/ | Evidence, objednávky, faktury, přehled |
| mini-erp/src/extensions/invoice-filter/ | Tým A včetně vlastních testů |
| mini-erp/src/extensions/invoice-export/ | Tým B včetně vlastních testů |
| mini-erp/src/extensions/customer-import/ | Tým C včetně vlastních testů |
| supabase/migrations/ | Verzované schéma, omezení, oprávnění a operace |
| mini-erp/tests/ | Automatické integrační a SQL scénáře |
| docs/mini-erp/ | Specifikace a návod |

Základ obsahuje tři nezávislé vstupní body; týmové rozšíření nesmí vyžadovat úpravu sdíleného registračního souboru, routeru, databáze ani závislostí. Testy rozšíření jsou pod jeho vlastní složkou. Přístupová vrstva pro čtení faktur a atomický import zákazníků je hotová před workshopem.

## Převzetí výchozí verze

1. Přihlásit se cvičným účtem a založit zákazníka.
2. Založit objednávku se dvěma produkty, ověřit součet, uložit a potvrdit.
3. Vytvořit fakturu, ověřit převzaté údaje a odmítnutí druhé faktury.
4. Jiným oprávněným účtem ověřit uložená data po obnovení stránky.
5. Označit úhradu a ověřit přehled.
6. Ověřit zamítané přístupy a cizí prostor.
7. Po úspěšném pilotu označit výchozí verzi mini-erp-v0.1.0.

Samostatná automatická, bezpečnostní a ruční ověření musí mít zaznamenané skutečné výsledky. Tento dokument jejich provedení nepotvrzuje.

