// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SLiMS Documentation',
  tagline: 'Library Automation With Style',
  url: 'https://slims.web.id',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://slims.web.id/web/site/templates/assets/images/logo.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'fa'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'docs',
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          lastVersion: 'current',
          onlyIncludeVersions: ['current'],
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl: '#'
        //     // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'learn',
        path: 'learn',
        routeBasePath: 'learn',
        sidebarPath: require.resolve('./sidebars.js'),
      }, 
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'SLiMS',
        logo: {
          alt: 'SLiMS Logo',
          src: 'https://camo.githubusercontent.com/7421e31ba39c8515a134363c478a3496837b903fe65f13486a3b02eb46580291/68747470733a2f2f6c68342e676f6f676c6575736572636f6e74656e742e636f6d2f344d4a7037496a5551724d305a2d487a475a494b68464b31413272313753337a486866356a5f734a7a454a33636d525576454536574f584a6e775a5a6c7a4e414b3643435432357a6b5f7947487a4a3730796e4c4146327063377a6a6e55693454312d30666f7677784f4a427a30724255417652434a63777957647a49454e62543062626b757435',
        },
        items: [
          {
            type: 'doc',
            docId: 'About',
            position: 'left',
            label: 'Docs',
          },
          {to: '/learn', label: 'Learn', position: 'left'},
          {
            href: 'https://github.com/slims/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'User Guide',
                to: '/docs/intro',
              },
              {
                label: 'How To',
                to: '/howto',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/groups/senayan.slims',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Download SLiMS',
                href: 'https://github.com/slims/slims9_bulian/releases',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/slims/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} SLiMS, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
