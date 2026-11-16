# Připojení sdílené databáze — správce

Účastníci tento postup neprovádějí. Zatím nejsou zřízené živé projekty; nic zde nepředstírá online provoz.

1. Založte vlastní Supabase účet a projekty pro společnou a testovací verzi. Ověřte dostupné Free limity. Použijte výhradně fiktivní data.
2. V SQL Editoru spusťte `migrations/001_erp.sql`. V Auth zakažte veřejné registrace. Přidejte uživatele `ucastnik01@workshop.example` až `ucastnik07@workshop.example` a lektora; nastavte hesla a ručně potvrďte technické e-mailové identity. Nejde o doručovací adresy. Hesla předejte mimo repozitář.
3. Podle `provision.example.sql` vytvořte pracovní prostory a přiřaďte skutečná UUID uživatelů. Identita do ERP je oddělená od GitHub účtu.
4. Do lokálního `.env` nebo publikačních GitHub Variables vložte jen URL projektu a publishable klíč. Nikdy nevkládejte service-role klíč do webu ani Gitu. Sestavte `npm run build`.
5. Přihlaste se, založte záznam a ověřte jej v jiném prohlížeči. Ověřte zamítnutí nepřihlášeného, nečlena, podvrženého prostoru a přímého zápisu do tabulky. Zaznamenejte výsledek; místní SQL test není náhradou skutečné konfigurace Supabase Auth.
6. Účastník má přístup pouze do přidělených prostorů. Pro křížovou kontrolu přidá správce členství kontrolujícímu týmu. Reset je pouze operace správce přes SQL Editor po exportu dat, nikoli veřejné tlačítko.

## Rozhodnutí pro v0.1

Doménový model má kolekce zákazníků, produktů, objednávek a faktur, ale záměrně se ukládá jako jeden JSONB dokument na pracovní prostor. PostgreSQL transakce a zámek řádku zajišťují atomické příkazy. Toto nahrazuje původně navržených devět fyzických tabulek: menší migrace a stejné datové rozhraní v demu i online zjednodušují výukový projekt. Serverové příkazy kontrolují pravidla; klient nemá přímé právo měnit dokument. Není to návrh pro produkční ERP ani pro velké objemy dat.

Vznik, úprava a autor příkazu se zapisují do auditní tabulky. Mazání ani změnu členství účastník provádět nemůže. Automatický reset společných dat neexistuje. Free projekt se může po neaktivitě pozastavit; dostupnost ověřte před workshopem.
