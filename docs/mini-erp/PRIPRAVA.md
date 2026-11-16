# Příprava a podmínky spuštění

Verze 0.1 • 16. 11. 2026 • Autor: ChatGPT.
Úkoly správce a lektora před workshopem. Seznam není potvrzením dokončení.

## Zjištěný stav

- Existující IMCG-SRO/cz.imcg.workshop je soukromý.
- Main zatím nemá zapnutou ochranu (ověřeno čtením metadat větve 16. 11. 2026).
- Repozitář obsahuje předchozí textová cvičení, ne ERP aplikaci.
- Původní program má na GitHub 65 minut.
- Uživatel uvedl, že Supabase účet není založen.
- Čas pro nové ERP cvičení a datum konání nejsou potvrzeny.

## Provoz bez dalších plateb

GitHub Pages u soukromého repozitáře závisí na tarifu organizace. Nevíme, zda IMCG-SRO potřebný plán už má. Pokud ano, může být hosting v rámci existujícího plánu bez další platby. Pokud ne, není potvrzený bezplatný provoz touto cestou.

[Oficiální dostupnost Pages podle plánu](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
Před implementací publikačního workflow správce ověří dostupnost Pages, limity Actions a možnosti ochrany main. Soukromý repozitář se nepřepíná automaticky na veřejný. Pokud Pages není k dispozici, připraví se alternativa bezplatného statického hostingu nad stejným soukromým zdrojem a zaznamená se rozhodnutí. Nová služba ani placený plán se nezakládá bez konkrétního rozhodnutí.

Supabase Free má dle ceníku ověřeného 16. 11. 2026 limit 2 aktivní projekty a 500 MB databáze na projekt; neaktivní projekty se mohou pozastavit. Ověřit aktuální volnou kapacitu účtu. Návrh nevyužívá placené databázové větvení ani placené automatické zálohy. Před resetem se vytvoří vlastní export fiktivních dat.

## Kontrolní seznam

### Správce

- [ ] Firemně spravovaný Supabase účet a přístup vlastníka.
- [ ] Společný a testovací projekt, migrace a databázová oprávnění.
- [ ] Sedm cvičných ERP účtů a lektorský účet; hesla předaná neveřejně.
- [ ] Přiřazení lidí k účtům a týmům A/B/C.
- [ ] GitHub účty účastníků, přístup k repozitáři a dostupné připojení z ChatGPT.
- [ ] Pages/alternativa, limity automatizace a ochrana main ověřeny bez dalších plateb.
- [ ] Náhledy A/B/C oddělené od main a správné databázové cíle.
- [ ] Reset konkrétního prostoru a export před resetem vyzkoušeny.
- [ ] Dostupnost Supabase ověřena den před workshopem a před jeho začátkem.

### Lektor

- [ ] Úplný průchod účtem běžného účastníka, ne pouze správcem.
- [ ] Výchozí ERP funkční a označené tagem mini-erp-v0.1.0.
- [ ] Týmová rozšíření ještě nejsou hotová; vstupní body a testovací nástroje ano.
- [ ] Tři Issues obsahují přesné zadání, data, očekávání a cesty modulů.
- [ ] Přístupy pro převzetí jiným týmem jsou připraveny.
- [ ] Záložní místní režim jasně označen; bez něj neslibovat práci při výpadku.
- [ ] Změřen čas pilotu, upraveny program a návody pro 2+2+3.
- [ ] Návody vedou na nové ERP; původní textová zadání jsou odstraněna.

## Pracovní návrh času

Nejde o potvrzený harmonogram.

| Část | Minuty |
| --- | --- |
| Ukázka ERP, Issue, větve a PR | 20 |
| Týmové zadání a očekávané výsledky | 15 |
| Vývoj s AI | 45 |
| Automatické testy s AI a opravy | 25 |
| Ruční převzetí jiným týmem | 25 |
| Postupné merge a společná kontrola | 15 |
| Zpětná vazba | 5 |
| Základní součet | 150 |

Rezerva dle pilotu 15–30 minut. Pokud zůstane pouze 65 minut, ukázka a zadání musí být kratší a realistickým výsledkem je uložená rozpracovaná změna/draft PR s dalším krokem. Úplný vývoj, automatické testy a převzetí se dokončí v navazujícím bloku. Části 1 a 2 původního workshopu se tímto návrhem nekrátí.

## Další krok přípravy

Po posouzení návrhu začíná ERP-02: technický základ a pravidla práce. Současně správce může založit Supabase účet a ověřit hostingový plán. Funkční databáze a její přístupy musí být hotové před předáním aplikace účastníkům.
