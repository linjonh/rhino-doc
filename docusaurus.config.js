// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Rhino文档',
  tagline: 'Rhino是一个完全用Java语言编写的开源JavaScript实现',
  favicon: 'img/favicon.ico',
  markdown: ({
    parseFrontMatter: async (params) => {
      const result = await params.defaultParseFrontMatter(params);
      // result.frontMatter.description =
      //   result.frontMatter.description?.replaceAll('{{MY_VAR}}', 'MY_VALUE');
      // console.log("result", result.frontMatter)
      return result;
    },
  }),
  // Set the production url of your site here
  url: 'https://rhino-doc.web.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'warn',
  // onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans','en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/linjonh/rhino-doc/tree/docus/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/linjonh/rhino-doc/tree/docus/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-36X6Q8BCK6', // Google Analytics tracking ID
          anonymizeIP: false, // Should IP anonymization be enabled?
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Chinese Doc',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Rhino Doc',
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/linjonh/rhino-doc.git',
            label: 'GitHub',
            position: 'right',
          },
          {//多语言选择项
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Doc',
            items: [
              {
                label: 'Rhino Doc',
                to: '/docs/',
              },
              {
                label: 'JavaAPI Doc',
                href: 'https://javadoc.io/doc/org.mozilla/rhino',
              },
              {
                label: "Kangax Compat",
                href: 'https://mozilla.github.io/rhino/compat/engines.html',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // { label: 'Blog', to: '/blog', },
              {
                label: 'GitHub',
                href: 'https://github.com/linjonh/rhino-doc.git',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} linjonh, Inc.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
  headTags: [
    // add google adsense
    // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5363852791482518"
    //  crossorigin="anonymous"></script>
    {
      tagName: "script",
      attributes: {
        async: "true",
        crossorigin: "anonymous",
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5363852791482518",
        // "data-ad-client": "ca-pub-5363852791482518",
      },
    },
    {//搜狗验证 <meta name="sogou_site_verification" content="czi2iTpmAJ" />
      tagName:"meta",
      attributes:{
        name:"sogou_site_verification",
        content:"czi2iTpmAJ"
      }
    },
    {
      //360验证 <meta name="360-site-verification" content="0c044ff9a05b6e3b18f7db19bdd7d693" />
      tagName:"meta",
      attributes:{
        name:"360-site-verification",
        content:"0c044ff9a05b6e3b18f7db19bdd7d693"
      }
    }
  ]
};

export default config;
