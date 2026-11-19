# Data, účty a oddělení prostředí

Verze 0.1 • 16. 11. 2026 • Autor: ChatGPT. Implementační rozhodnutí v0.1: doménové kolekce níže se ukládají do jednoho JSONB dokumentu na prostor; přístup řídí tabulky erp_workspaces a erp_members a serverové příkazy. Audit příkazů je v erp_audit. Normalizované tabulky níže jsou původní logický model, nikoli fyzické schéma v0.1. Podrobnosti: [databázový návod](../../mini-erp/supabase/README.md). Živá služba Workshop IMCG je nyní zřízena a otestována.

## Správce a účastníci

Supabase účet ke správě služby má správce. Účastníci mají vlastní GitHub účty pro repozitář a oddělené cvičné identity do ERP (ucastnik01–07). Identita ERP není navázána na osobní GitHub OAuth. Lektor vede přiřazení člověk → cvičný účet, aby šlo vysvětlit autorství změny. Sdílené heslo celého týmu není výchozí volba.

Správce založil sedm účastnických identit ucastnik01–07 a lektora v Auth. Formulář mapuje jméno bez domény na technický identifikátor @workshop.example; skutečné schránky účastníků nejsou nutné. Veřejná registrace je vypnutá. Hesla a administrátorské přihlašovací údaje se neukládají do Gitu ani nesdílejí ve veřejném chatu.

## Prostředí

Aktuální implementace používá jeden existující bezplatný projekt s logickými prostory MAIN/A/B/C. Původní návrh dvou fyzických projektů níže se nepoužívá; oddělení vynucuje členství ověřované databází. Tím nevznikl další projekt ani placené větvení.

- MAIN: aplikace z main a společná fiktivní data.
- A, B, C: týmové pracovní prostory s vlastními daty uvnitř stejného projektu Workshop IMCG.
- Náhled větve začíná v odpovídajícím prostoru A/B/C. Identifikátor prostoru z URL ani prohlížeče sám nezakládá oprávnění.
- Kontrolující tým dostane předem přidělené členství v kontrolovaném prostoru. Prostor je viditelně označen; přístup se po kontrole může odebrat.
- Jde o logické oddělení uvnitř jednoho testovacího projektu, nikoli placené databázové větve.
- SQL migrace v oddělených přípravných větvích nasazuje správce postupně. Git merge sám databázi nemění.

## Návrh tabulek

| Tabulka | Klíčová pole a pravidla |
| --- | --- |
| workspaces | id, code, name |
| workspace_members | workspace_id, user_id z Auth, role participant/reviewer/admin; spravuje jen lektor |
| customers | id, workspace_id, code_normalized, name, email, address |
| products | id, workspace_id, code_normalized, name, price_minor |
| orders | id, workspace_id, customer_id, number, status, created_at, created_by |
| order_items | id, workspace_id, order_id, product_id, product_name_snapshot, quantity, unit_price_minor |
| invoices | id, workspace_id, order_id, number, issued_on, due_on, status, total_minor, customer_snapshot, paid_on, paid_by |
| invoice_items | id, workspace_id, invoice_id, product_name_snapshot, quantity, unit_price_minor |

Doménové záznamy mají created_at/created_by a podle potřeby updated_at/updated_by. Autor je odvozen ze session na databázové straně. Audit fiktivního účtu není automaticky důkazem konkrétního člověka; ten je dohledatelný přes lektorské přiřazení.

Unikátní omezení: kódy zákazníků a produktů v prostoru, čísla objednávek a faktur v prostoru a jedna faktura na objednávku. Cizí klíče musí zajistit také shodu workspace_id, včetně položek a zákazníků/produktů.

V databázi se vynucují povolené stavy, množství, cenové limity a datumová pravidla. Součty nejsou důvěryhodné jen proto, že přišly z prohlížeče. Atomické operace pro objednávku, fakturaci a dávkový import musí opakovaným či souběžným požadavkem nevytvořit částečné nebo duplicitní záznamy.

## Zabezpečení přístupu

RLS na všech zpřístupněných doménových tabulkách kontroluje přihlášení a členství. SELECT, INSERT, UPDATE i případné RPC se ověřují samostatně. Přístup mimo povolený prostor je zamítnut i při přímém volání API. Účastník nesmí měnit své role, členství ani provádět reset.

Ve webu je pouze URL projektu a publikovatelný klíč; klíč sám není oprávnění uživatele. Administrátorský klíč se používá jen v důvěryhodném prostředí správce, nikdy v browseru. Funkce s vyššími právy musí mít explicitní kontrolu oprávnění, pevný search_path a omezené EXECUTE.

Před předáním se ověří: nepřihlášený návštěvník, přihlášený nečlen, člen A s podvrženým prostorem B, pokus o změnu členství, cizí vazba v položce a neautorizovaný reset.

## Výchozí data a obnova

V každém testovacím prostoru minimálně 5 zákazníků, 5 produktů, 3 objednávky a 4 faktury pro scénáře. Data jsou reprodukovatelná ze seed skriptu; část objednávek je již fakturovaná. Seed má datumovou základnu, aby byly varianty včera/dnes/zítra použitelné i v den workshopu.

Obnova je explicitní operace lektora pro konkrétní prostor, s potvrzením a exportem před obnovou. Běžné testy nepoužívají reset společné databáze. Automatické unit testy používají fixture; integrační ověření používá vyhrazená testovací data.

## Ověřené zdroje návrhu

- [Supabase: zabezpečení dat](https://supabase.com/docs/guides/database/secure-data)
- [Supabase: administrátorské založení uživatele](https://supabase.com/docs/reference/javascript/auth-admin-createuser)
- [Supabase: aktuální limity Free](https://supabase.com/pricing)
- [Pozastavení neaktivního projektu](https://supabase.com/docs/guides/platform/free-project-pausing)

Konfigurace Workshop IMCG, migrace, osm přihlášení a oddělení dat byly ověřeny v přípravě. Aktuální dostupnost účastníkům se kontroluje před workshopem. [Stav ověření](OVERENI.md).

