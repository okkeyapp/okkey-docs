# okkey-docs

Документация [Okkey](https://github.com/okkeyapp/okkey): self-hosted менеджер паролей. Сайт на Docusaurus 3. Язык по умолчанию — русский, английский — полный перевод страниц. Опубликована версия `dev`: снимок ветки `dev` открытого репозитория `okkey`.

Страницы сверены с `okkey` и с `okkey-enterprise`, ветка `dev`. Описаны только модули, которые есть в дереве. Если экрана нет, страница не называет функцию готовой. Оставшиеся пробелы помечены **TODO**.

## Локально

Нужен Node.js 20 или новее (в CI — 22).

```bash
npm ci
npm start
```

Сайт открывается на `http://localhost:3000`. Английская локаль — `http://localhost:3000/en/`.

```bash
npm run build
npm run serve
```

`npm run build` собирает обе локали и падает на битой ссылке или якоре.

## Как устроено версионирование

Опубликованный сайт — это только снимки из `versioned_docs/`. Текущая рабочая копия в `docs/` на сайт не выкладывается (`includeCurrentVersion: false`). Версия по умолчанию — `dev` (`lastVersion`).

- Русский текст версии: `versioned_docs/version-dev/`.
- Английский текст версии: `i18n/en/docusaurus-plugin-content-docs/version-dev/`.
- Подписи разделов сайдбара на английском: `i18n/en/docusaurus-plugin-content-docs/version-dev.json`.
- Рабочая копия следующей версии: `docs/` и `i18n/en/docusaurus-plugin-content-docs/current/`.

Правка уже выпущенной версии делается в `versioned_docs` и в `version-dev`, не только в `docs/`.

## Как срезать новую версию

1. Обновите русские страницы в `docs/` и английские в `i18n/en/docusaurus-plugin-content-docs/current/`. У каждой страницы во frontmatter должен быть `plans`.
2. В `docusaurus.config.ts` на время команды включите `includeCurrentVersion: true` и уберите `versions.<новое имя>`, если такой версии ещё нет. Иначе CLI не стартует: при `includeCurrentVersion: false` и пустом `versions.json` плагин считает, что версий нет.
3. Снимите снимок:

   ```bash
   npm run docusaurus docs:version 1.0.0
   ```

   Имя замените на версию продукта. Команда копирует `docs/` в `versioned_docs/version-1.0.0/` и текущие английские переводы в `i18n/en/docusaurus-plugin-content-docs/version-1.0.0/`.
4. Верните `includeCurrentVersion: false`. Если новая версия должна открываться по умолчанию, поставьте `lastVersion: '1.0.0'` и добавьте подпись в `versions`.
5. Достаньте строки интерфейса и переведите сайдбар и навбар:

   ```bash
   npm run docusaurus write-translations -- --locale en
   ```

   В `i18n/en/docusaurus-plugin-content-docs/version-1.0.0.json` замените русские `message` разделов на английские. Навбар «Документация» — в `i18n/en/docusaurus-theme-classic/navbar.json`.
6. `npm run build`.

Первая версия в этом репозитории называется `dev`, потому что источник — ветка `dev`, а не тег релиза.

## Бейдж тарифа

`src/theme/DocItem/Layout` — swizzle темы. На каждой странице он рисует `PlanBadges` из frontmatter:

```yaml
plans:
  selfhosted: [free, enterprise]
  cloud: [free, pro, family, team, enterprise]
```

Пустой массив значит, что на этом канале страницы нет. Нет frontmatter или значение вне списка — красная плашка TODO, сборка при этом не падает. `pro` в бейдже — это `plan_tier` `PREMIUM`. В интерфейсе пункт называется «Премиум» / Premium.

## Откуда факты

Страницы опираются на `okkey` ветки `dev`: матрицу `packages/types/src/plan-features.ts`, локали `packages/i18n/src/locales/web/{ru,en}.json`, установку `deploy/docker`, криптопрофиль `packages/crypto`. Адрес сайта в конфиге — `https://okkey.app`. Отдельного хоста документации в исходниках нет. **TODO:** если документация будет на другом домене, поменять `url` в `docusaurus.config.ts`.

## English

Russian is the default locale. English pages live under `i18n/en`. `npm run build` builds both and fails on a broken link or anchor.

Published docs are the `dev` snapshot only. `docs/` is the working copy for the next cut and is not served. To cut a version, update `docs/` and `i18n/en/docusaurus-plugin-content-docs/current/`, temporarily set `includeCurrentVersion: true`, run `npm run docusaurus docs:version <name>`, then set `includeCurrentVersion: false` and `lastVersion` if the new version should be the default. Translate the new sidebar strings in `i18n/en/docusaurus-plugin-content-docs/version-<name>.json`.

Pages are checked against `okkey` and `okkey-enterprise`, branch `dev`. Only modules that exist in the tree are described. Remaining gaps are marked **TODO**.
