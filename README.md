# okkey-docs

Documentation for [Okkey](https://github.com/okkeyapp/okkey), a self-hosted password manager. The site is Docusaurus 3. The default locale is Russian. English is a full translation of the pages. The published docs line is `v1.0`, which tracks the current Okkey release [1.0.0-beta.2](https://github.com/okkeyapp/okkey/releases/tag/v1.0.0-beta.2).

The pages describe what a person sees when they install and use Okkey. There are two plans: Free and Enterprise. A person who installs Okkey gets Free. Enterprise is set up by an Okkey employee.

Russian text lives in `docs/`, `versioned_docs/`, and `i18n/ru/`. Everything else in this repository is English.

## Local

Node.js 20 or newer (CI uses 22).

```bash
npm ci
npm start
```

The site opens at `http://localhost:3000`. The English locale is `http://localhost:3000/en/`.

```bash
npm run build
npm run serve
```

`npm run build` builds both locales and fails on a broken link or anchor.

## Docs versions

Docs versions follow [Okkey releases](https://github.com/okkeyapp/okkey/releases). One docs version covers one minor line. Labels are `v1.0`, `v1.1`, `v2.0`, and so on.

Pre-releases and patches do not create a new docs version. They update the same minor version in place:

- `1.0.0-beta.1`, `1.0.0-beta.2`, `1.0.0`, and `1.0.1` all live in `v1.0`.
- A new docs version is cut only when the minor or major number changes. `1.1.0` becomes `v1.1`. `2.0.0` becomes `v2.0`.

The published site is only the snapshots in `versioned_docs/`. The working copy in `docs/` is not served (`includeCurrentVersion: false`). The default version is `v1.0` (`lastVersion`). It currently tracks Okkey `1.0.0-beta.2`. The version dropdown label is `v1.0`. A banner on each page names the current release in that line.

- Working copy, the only place you edit: `docs/` (Russian) and `i18n/en/docusaurus-plugin-content-docs/current/` (English).
- Published copy of the line: `versioned_docs/version-v1.0/` and `i18n/en/docusaurus-plugin-content-docs/version-v1.0/`. Do not edit these by hand.
- English sidebar category labels and the version label: `i18n/en/docusaurus-plugin-content-docs/version-v1.0.json`.

After an edit in the working copy, copy it into the published line:

```bash
npm run docs:sync
```

`npm run build` runs `npm run docs:check` first and fails if `version-v1.0` is not an exact copy of the working copy. Do not run `docs:version` for a beta or a patch.

When a page describes behaviour that differs from an earlier beta of the same line, say so on the page: «с 1.0.0-beta.3» in Russian, "since 1.0.0-beta.3" in English.

## Cutting a new minor or major

1. Update the Russian pages in `docs/` and the English pages in `i18n/en/docusaurus-plugin-content-docs/current/`. Every page needs `plans` in the frontmatter. Point `VERSION` in `scripts/sync-docs-version.mjs` at the new line.
2. In `docusaurus.config.ts`, set `includeCurrentVersion: true` for the command and remove `versions.<new name>` if that version does not exist yet. Otherwise the CLI will not start: with `includeCurrentVersion: false` and an empty `versions.json`, the plugin treats the site as having no versions.
3. Cut the snapshot. The name is the docs label, not the full release tag:

   ```bash
   npm run docusaurus docs:version v1.1
   ```

   The command copies `docs/` to `versioned_docs/version-v1.1/` and the current English translations to `i18n/en/docusaurus-plugin-content-docs/version-v1.1/`.
4. Set `includeCurrentVersion: false` again. If the new version should be the default, set `lastVersion: 'v1.1'` and add `label: 'v1.1'` under `versions`.
5. Extract UI strings and translate the sidebar and navbar:

   ```bash
   npm run docusaurus write-translations -- --locale en
   ```

   In `i18n/en/docusaurus-plugin-content-docs/version-v1.1.json`, set `version.label` to `v1.1` and replace the Russian `message` values for categories with English. The navbar label is in `i18n/en/docusaurus-theme-classic/navbar.json`.
6. Run `npm run build`.

## Structure

Folders follow the internal docs sections that matter to people who install and use Okkey. Russian and English pages have the same file names, so the URL is the same in both locales: `/workspace/roles` and `/en/workspace/roles`.

| Folder | Sidebar (ru / en) |
| --- | --- |
| `intro.md` | О проекте / About |
| `getting-started/` | Начало работы / Getting started |
| `install/` | Установка self-hosted / Self-hosted install |
| `plans.md` | Тарифы / Plans |
| `workspace/` | Пространство / Workspace: settings, members, roles, profiles, vaults, plan |
| `items/` | Записи / Items, with lists and folders |
| `capsules.md` | Капсулы / Capsules |
| `tools/` | Инструменты / Tools: generator, import, export |
| `monitoring.md` | Мониторинг / Monitoring (Enterprise) |
| `account/` | Аккаунт и устройства / Account and devices: profile, two-factor, recovery, devices, unlock |
| `apps/` | Приложения / Apps |
| `security/` | Безопасность / Security |

Category labels are Russian in `_category_.json`. English labels are in `i18n/en/docusaurus-plugin-content-docs/version-v1.0.json`.

Links between pages are file links with `.md`, for example `[Роли](../workspace/roles.md)`. The build fails on a broken link or anchor.

### Moved pages

When a page moves, add the old path to `redirects` of `@docusaurus/plugin-client-redirects` in `docusaurus.config.ts`. The same list covers both locales. The redirect keeps `?query` and `#hash`.

When a section of a page moves to its own page, keep the old anchor working with `HashRedirect` (`src/components/HashRedirect.tsx`) on the page that stays. Example: `/settings/workspace#роли` goes to `/workspace/` and then to `/workspace/roles`. The Okkey web app links to these URLs (`packages/ui/src/lib/public-docs-url.ts` in okkeyapp/okkey). Keep them working.

## Plan badge

`src/theme/DocItem/Layout` is a theme swizzle. On every page it renders `PlanBadges` from frontmatter. These docs cover self-hosted only. There are two plans: `free` and `enterprise`. A person who installs Okkey gets Free. Enterprise is set up by an Okkey employee.

```yaml
plans: [free, enterprise]
```

A page that describes an Enterprise-only capability:

```yaml
plans: [enterprise]
```

Missing frontmatter, a non-array, or a value other than `free` / `enterprise` shows a red TODO banner. The build still succeeds.

## Where the facts come from

Feature names follow the product UI in Russian and English. The site URL is `https://docs.okkey.io` (`url` in `docusaurus.config.ts`, `static/CNAME`). If the docs move to another domain, change both.
