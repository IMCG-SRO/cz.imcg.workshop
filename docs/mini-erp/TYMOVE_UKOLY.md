# Týmová zadání a testovací očekávání

Verze 0.1 • 16. 11. 2026 • Autor: ChatGPT.
Implementace těchto tří rozšíření zůstane účastníkům; příprava dodá vstupní body, data, přístupové operace a testovací infrastrukturu.

## Rozdělení

| Tým | Lidé | Úkol | Ručně převezme jeho výsledek |
| --- | --- | --- | --- |
| A | 2 | [Filtr faktur #20](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/20) | C |
| B | 2 | [Export CSV #21](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/21) | A |
| C | 3 | [Import zákazníků #22](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/22) | B |

Každý tým používá jeden hlavní chat s právem zapisovat do své větve. Role zadavatel/kontrolující a obsluha AI se vystřídají; třetí člen týmu C se věnuje zejména testovacím datům a nezávislé kontrole. Všichni musí vyzkoušet aktivní práci.

## Tým A (2 lidé)

Doplnit kombinovatelné filtry nad seznamem faktur bez úpravy společné databáze.

Větev: `feature/erp-11-filtr-faktur`.

- Filtr úhrady: všechny / neuhrazené / uhrazené; filtr splatnosti: všechny / po splatnosti / dnes a později.
- Po splatnosti znamená datum před dneškem Europe/Prague; filtry se kombinují průnikem.
- Výchozí stav ukazuje všechny faktury a tlačítko obnoví výchozí filtry; prázdný výsledek má jasnou zprávu.
- Filtr nemění data a neovlivní export týmu B, který má vlastní zadaný rozsah.
- Testy ověří včera/dnes/zítra, úhradu, kombinace a prázdný výsledek.
- Tým C provede ruční převzetí na přesném commitu náhledu a zapíše výsledek do PR.

## Tým B (2 lidé)

Doplnit stažení všech faktur aktuálního pracovního prostoru do CSV; nezávisle na filtrech týmu A.

Větev: `feature/erp-12-export-faktur`.

- CSV má pevné sloupce cislo_faktury;zakaznik;datum_vystaveni;datum_splatnosti;castka_czk;stav.
- Kódování UTF-8 s BOM, oddělovač středník; částka se dvěma desetinnými místy a čárkou, datum RRRR-MM-DD.
- Uvozovky, středníky a nové řádky uvnitř hodnot jsou správně escapovány; textové hodnoty začínající =,+,-,@ jsou ošetřeny proti spuštění vzorce při otevření v tabulkovém editoru.
- Prázdný seznam vytvoří pouze hlavičku; export nemění data a nikdy neexportuje cizí prostor.
- Testy pokryjí diakritiku, oddělovače, uvozovky, prázdný seznam a nebezpečné textové hodnoty.
- Tým A ověří stažení a obsah v tabulkovém editoru a zapíše výsledek k přesnému commitu PR.

## Tým C (3 lidé)

Doplnit načtení připraveného CSV, validaci a potvrzení importu přes hotovou databázovou operaci.

Větev: `feature/erp-13-import-zakazniku`.

- Formát: UTF-8 (volitelně BOM), středník, hlavička kod;nazev;email;adresa; nejvýše 100 řádků a 100 kB.
- Před potvrzením je pouze náhled; zrušení nic nezapisuje. Parser rozumí uvozovkám a středníku v uvozované hodnotě.
- Povinný kód a název, e-mail volitelný s kontrolou; duplicita kódu v souboru nebo databázi je chyba bez rozlišení velikosti písmen.
- Chyby uvádějí číslo záznamu a důvod; jediná chyba zablokuje celý import. Existující zákazníci se nepřepisují.
- Potvrzení uloží všechny řádky atomicky, i souběžná duplicita skončí bez částečného uložení; opakovaný klik nevytvoří duplicity.
- Testy zahrnou platný vzor, chybný řádek, duplicity, limit, zrušení a selhání zápisu.
- Tým B provede ruční převzetí a zápis výsledku k přesnému commitu náhledu.


## Společná fixture faktur

Pro tuto testovací sadu je „dnes“ pátek 27. 11. 2026 (`2026-11-27`) v `Europe/Prague`, kdy probíhá cvičení. Živá aplikace používá skutečný den a faktury právě vybraného prostoru. Při zkoušce v jiný den si pro automatický test nastav pevné datum `2026-11-27`. Pro samostatný test hranice „zítra“ použij 28. 11. 2026 jako splatnost kopie neuhrazené faktury FA-003 v testovacích datech.

| Faktura | Splatnost | Úhrada | Částka |
| --- | --- | --- | --- |
| FA-001 | 2026-11-26 | neuhrazená | 1 800,00 Kč |
| FA-002 | 2026-11-27 | neuhrazená | 3 600,00 Kč |
| FA-003 | 2026-12-27 | neuhrazená | 5 400,00 Kč |
| FA-004 | 2026-11-22 | uhrazená | 7 200,00 Kč |

Očekávání:
- Všechny + všechny: FA-001 až FA-004.
- Neuhrazené + všechny: FA-001 až FA-003.
- Neuhrazené + po splatnosti: pouze FA-001.
- Uhrazené + po splatnosti: pouze FA-004. Přehled „neuhrazené po splatnosti“ počítá pouze neuhrazené faktury.
- Neuhrazené + dnes a později: FA-002 a FA-003.
- Uhrazené + dnes a později: prázdný výsledek.
- Přehled této testovací sady ukazuje 10 800,00 Kč neuhrazených faktur, z toho 1 800,00 Kč po splatnosti.
- Export celé testovací sady obsahuje všechny čtyři faktury bez ohledu na filtr. V živém prostoru export zahrne i případné další faktury přidané při cvičení.

## Vzory pro import

Platný soubor:
```csv
kod;nazev;email;adresa
NOVY01;Žlutý obchod;kontakt@example.com;Praha
NOVY02;"Firma; ukázka";;Brno
```

Chybný soubor:
```csv
kod;nazev;email;adresa
NOVY03;Platný řádek;;Praha
NOVY04;;kontakt@example.com;Brno
```

Platný soubor při nepotvrzeném náhledu nic neuloží; po potvrzení přidá právě dva zákazníky. Chybný soubor vysvětlí chybějící název záznamu 2 a neuloží ani NOVY03. Číslo záznamu se počítá od prvního datového záznamu, hlavička se nepočítá. Další vzor musí obsahovat duplicitu kódu v jiném zápisu velikosti písmen.

## Co odevzdat

PR s vazbou na Issue, malým vysvětlením a skutečným diffem, automatickými testy a výsledkem jejich běhu, adresou náhledu a commitem, výsledkem ruční kontroly jiného týmu, omezeními a krátkou aktualizací návodu.

Hotovo znamená splněné podmínky, provedené testy, převzetí, řízený merge a ověření společné verze. Samotný kód nebo zelená ikona testů nestačí.
