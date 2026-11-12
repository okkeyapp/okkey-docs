import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Okkey',
  tagline: 'Документация self-hosted менеджера паролей Okkey',
  url: 'https://docs.okkey.io',
  baseUrl: '/',
  organizationName: 'okkeyapp',
  projectName: 'okkey-docs',
  favicon: 'img/favicon.svg',
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    localeConfigs: {
      ru: {
        label: 'Русский',
        htmlLang: 'ru',
        direction: 'ltr',
      },
      en: {
        label: 'English',
        htmlLang: 'en',
        direction: 'ltr',
      },
    },
  },
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Pages moved in the structure change (PR1). The plugin writes a small
        // page at each old path that forwards to the new one and keeps
        // `?query` and `#hash`. Paths are relative to the locale base, so the
        // same list covers `/` (ru) and `/en/`.
        // Old anchors of `/settings/workspace` and `/tools` that now live on
        // their own pages are forwarded by `src/components/HashRedirect`.
        redirects: [
          {from: '/install/self-hosted', to: '/install/free'},
          {from: '/install/first-setup', to: '/getting-started/first-setup'},
          {from: '/features', to: '/security/'},
          {from: '/features/qday', to: '/security/qday'},
          {from: '/features/security', to: '/security/keys'},
          {from: '/features/zero-knowledge', to: '/security/zero-knowledge'},
          {from: '/features/open-source', to: '/security/open-source'},
          {from: '/settings', to: '/account/'},
          {from: '/settings/personal', to: '/account/personal'},
          {from: '/settings/devices', to: '/account/devices'},
          {from: '/settings/workspace', to: '/workspace/'},
          {from: '/vaults', to: '/workspace/vaults'},
          {from: '/lists', to: '/items/lists'},
          {from: '/folders', to: '/items/folders'},
        ],
      },
    ],
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Published docs follow Okkey minor lines: v1.0, v1.1, v2.0.
          // Betas and patches update the current minor in place.
          // `docs/` stays the working copy and is not served.
          includeCurrentVersion: false,
          lastVersion: 'v1.0',
          versions: {
            'v1.0': {
              label: 'v1.0',
              banner: 'unreleased',
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/icon-512.png',
    navbar: {
      title: 'Okkey',
      logo: {
        alt: 'Okkey',
        src: 'img/favicon.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Документация',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright:
        'Документация Okkey v1.0. Текущий релиз - 1.0.0-beta.2.',
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
