# Vývoj mini ERP

- Nejprve přečti příslušné GitHub Issue a docs/mini-erp/SPECIFIKACE.md.
- Jedno Issue, jedna vlastní větev, jeden PR do main. Tým používá jeden zapisující chat. Merge řídí lektor.
- Tým A mění jen src/extensions/invoice-filter/, tým B invoice-export/, tým C customer-import/ a vlastní testy v příslušné složce. Sdílené změny nejprve domluv.
- Změna musí mít testy očekávaného chování, nikoli jen potvrzení implementace. Spusť npm test a npm run build v mini-erp/.
- Žádné heslo ani service-role klíč v kódu, commitu nebo logu. Nedoplňuj placené služby.
- Neoznačuj neprovedené kontroly jako hotové. AI review není lidské schválení.
- Základní data jsou fiktivní. Online chybu nikdy neskrývej automatickým přechodem do demo režimu.
