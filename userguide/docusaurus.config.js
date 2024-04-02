// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const env = require('./env');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'A page for SLiMS User, and Developer',
    tagline: 'Library Automation With Style',
    url: 'https://slims.web.id',
    baseUrl: env.baseUrl ?? '/',
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
                    routeBasePath: 'user-guide',
                    path: 'user-guide',
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
                id: 'development-guide',
                path: 'development-guide',
                routeBasePath: 'development-guide',
                sidebarPath: require.resolve('./sidebars.js'),
            },
        ],
        [
            require.resolve('docusaurus-lunr-search'),
            {
                indexBaseUrl: true
            }
        ]
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
        navbar: {
            title: 'SLiMS',
            logo: {
                alt: 'SLiMS Logo',
                src: 'https://slims.web.id/web/site/templates/assets/images/logo.png',
            },
            items: [{
                    type: 'doc',
                    docId: 'about',
                    position: 'left',
                    label: 'User Guide',
                },
                { to: '/development-guide/about', label: 'Development Guide', position: 'left' },
                { to: 'https://slims.web.id/api/', label: 'APi', position: 'left' },
                {
                    href: 'https://github.com/slims/',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [{
                    title: 'Contents',
                    items: [{
                            label: 'User Guide',
                            to: '/user-guid/about',
                        },
                        {
                            label: 'Development Guide',
                            to: '/development-guide',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [{
                        label: 'Facebook',
                        href: 'https://www.facebook.com/groups/senayan.slims',
                    }],
                },
                {
                    title: 'More',
                    items: [{
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
            copyright: `Copyright © ${new Date().getFullYear()} SLiMS. Built with Docusaurus.`,
        },
        prism: {
            theme: require('prism-react-renderer/themes/vsDark'),
            darkTheme: require('prism-react-renderer/themes/vsDark'),
            defaultLanguage: 'PHP',
            additionalLanguages: ['php']
        },
    }),
};

module.exports = config;