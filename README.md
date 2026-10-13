# okkey-docs

Documentation for [Okkey](https://github.com/okkeyapp/okkey), a self-hosted password manager. The site is Docusaurus 3. The default locale is Russian. English is a full translation of the pages. The published version is `dev`: a snapshot of the `dev` branch of the public `okkey` repository.

Pages are checked against `okkey` and `okkey-enterprise`, branch `dev`. Only modules that exist in the tree are described. If a screen is missing, the page does not call the feature ready. Remaining gaps are marked **TODO**.

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

## Versioning

The published site is only the snapshots in `versioned_docs/`. The working copy in `docs/` is not served (`includeCurrentVersion: false`). The default version is `dev` (`lastVersion`).

- Russian text of the version: `versioned_docs/version-dev/`.
- English text of the version: `i18n/en/docusaurus-plugin-content-docs/version-dev/`.
- English sidebar category labels: `i18n/en/docusaurus-plugin-content-docs/version-dev.json`.
- Working copy for the next cut: `docs/` and `i18n/en/docusaurus-plugin-content-docs/current/`.

An edit to an already published version goes into `versioned_docs` and `version-dev`, not only into `docs/`.

## Cutting a new version

1. Update the Russian pages in `docs/` and the English pages in `i18n/en/docusaurus-plugin-content-docs/current/`. Every page needs `plans` in the frontmatter.
2. In `docusaurus.config.ts`, set `includeCurrentVersion: true` for the command and remove `versions.<new name>` if that version does not exist yet. Otherwise the CLI will not start: with `includeCurrentVersion: false` and an empty `versions.json`, the plugin treats the site as having no versions.
3. Cut the snapshot:

   ```bash
   npm run docusaurus docs:version 1.0.0
   ```

   Replace the name with the product version. The command copies `docs/` to `versioned_docs/version-1.0.0/` and the current English translations to `i18n/en/docusaurus-plugin-content-docs/version-1.0.0/`.
4. Set `includeCurrentVersion: false` again. If the new version should be the default, set `lastVersion: '1.0.0'` and add a label under `versions`.
5. Extract UI strings and translate the sidebar and navbar:

   ```bash
   npm run docusaurus write-translations -- --locale en
   ```

   In `i18n/en/docusaurus-plugin-content-docs/version-1.0.0.json`, replace the Russian `message` values for categories with English. The navbar label is in `i18n/en/docusaurus-theme-classic/navbar.json`.
6. Run `npm run build`.

The first version in this repository is named `dev` because the source is the `dev` branch, not a release tag.

## Plan badge

`src/theme/DocItem/Layout` is a theme swizzle. On every page it renders `PlanBadges` from frontmatter. These docs cover self-hosted only. There are two plans: `free` (`plan_tier` `FREE`, modules off) and `enterprise` (`plan_tier` `ENTERPRISE`, `ENTERPRISE_MODULES` on).

```yaml
plans: [free, enterprise]
```

A page that describes an Enterprise-only capability:

```yaml
plans: [enterprise]
```

Missing frontmatter, a non-array, or a value other than `free` / `enterprise` shows a red TODO banner. The build still succeeds.

## Where the facts come from

Pages follow `okkey` branch `dev`: the matrix in `packages/types/src/plan-features.ts`, the locales in `packages/i18n/src/locales/web/{ru,en}.json`, the install in `deploy/docker`, and the crypto profile in `packages/crypto`. The site URL in the config is `https://okkey.app`. The sources do not name a separate docs host. **TODO:** if the docs move to another domain, change `url` in `docusaurus.config.ts`.
