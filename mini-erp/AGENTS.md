# Vývoj mini ERP

Tyto pokyny doplňují [pravidla repozitáře](../AGENTS.md). Před změnou přečti příslušné GitHub Issue, [funkční specifikaci](../docs/mini-erp/SPECIFIKACE.md) a u úloh #20–#22 také [týmová zadání a očekávání](../docs/mini-erp/TYMOVE_UKOLY.md).

## Týmová zadání

| Tým | Issue | Větev | Složka pro změnu a její testy |
| --- | --- | --- | --- |
| A | [#20](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/20) | `feature/erp-11-filtr-faktur` | `mini-erp/src/extensions/invoice-filter/` |
| B | [#21](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/21) | `feature/erp-12-export-faktur` | `mini-erp/src/extensions/invoice-export/` |
| C | [#22](https://github.com/IMCG-SRO/cz.imcg.workshop/issues/22) | `feature/erp-13-import-zakazniku` | `mini-erp/src/extensions/customer-import/` |

- Jedno zadání má jednu větev, jeden hlavní zapisující chat a jeden PR. Před implementací určete očekávané výsledky běžného, chybného a hraničního případu.
- Pracuj ve složce svého rozšíření a použij připravené vstupní body. Změny společných modulů, závislostí, migrací nebo workflow domluv s lektorem předem. Při údržbě výchozí verze ponech řešení těchto tří úloh účastníkům.
- Při práci s daty používej připravené příkazy a respektuj aktuální ERP prostor a omezení oprávnění. V testech používej fiktivní data. Databázové testy běží lokálně v PGlite. Po `npm run dev` připoj k místní adrese `?mode=demo`, pokud ověřuješ bez sdílené databáze. Chybu online připojení zobraz uživateli a zachovej online režim.

## Ověření a předání

Použij Node.js 24 stejně jako GitHub Actions. Z kořene repozitáře spusť:

```sh
cd mini-erp
npm ci
npm test
npm run build
```

- Nové chování pokryj testy odvozenými z podmínek převzetí. U časově závislých testů zadej pevné datum a respektuj `Europe/Prague`. Ověř také zachování původního chování.
- `Mini ERP checks` ověřuje PR v GitHub Actions. Dolož běh, výsledek a commit. Před ruční kontrolou porovnej commit PR s commitem v náhledu. Náhledy publikuje lektor z `main` postupem v [DEPLOY.md](DEPLOY.md).
- A kontroluje B, B kontroluje C a C kontroluje A. Převzetí provádí člověk. Odděl jeho výsledek od kontroly AI. Použij [šablonu PR](../.github/pull_request_template.md) a uveď i kroky, které ještě čekají na ověření.
