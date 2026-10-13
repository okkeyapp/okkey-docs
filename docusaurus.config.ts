import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Okkey',
  tagline: 'Документация self-hosted менеджера паролей Okkey',
  url: 'https://okkey.app',
  baseUrl: '/',
  organizationName: 'okkeyapp',
  projectName: 'okkey-docs',
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
    navbar: {
      title: 'Okkey',
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
        'Документация Okkey v1.0. Текущий релиз - 1.0.0-beta.1.',
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
