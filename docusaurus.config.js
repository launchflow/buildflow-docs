// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "BuildFlow",
  tagline: "build your entire system in minutes using Python",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://www.buildflow.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "LaunchFlow", // Usually your GitHub org/user name.
  projectName: "BuildFlow", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/launchflow/buildflow-docs/tree/main/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "BuildFlow",
        logo: {
          alt: "BuildFlow Logo",
          src: "img/hammer.png",
        },
        items: [
          {
            type: "doc",
            position: "left",
            label: "About",
            docId: "overview",
          },
          {
            type: "doc",
            position: "left",
            label: "Get Started",
            docId: "install",
          },
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          {
            to: "roadmap",
            position: "left",
            label: "Roadmap",
          },
          {
            type: "doc",
            position: "left",
            label: "Contribute",
            docId: "developers/contribute",
          },
          // { to: "blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/launchflow/buildflow/",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://discordapp.com/invite/wz7fjHyrCA",
            label: "Discord",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "BuildFlow Docs",
                to: "/docs",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discordapp.com/invite/wz7fjHyrCA",
              },
            ],
          },
          {
            title: "More",
            items: [
              // {
              //   label: "Blog",
              //   to: "/blog",
              // },
              {
                label: "GitHub",
                href: "https://github.com/launchflow/buildflow/",
              },
              {
                label: "LaunchFlow",
                href: "https://www.launchflow.com",
              },
              {
                label: "LaunchFlow Docs",
                href: "https://docs.launchflow.com",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BuildFlow`,
      },
      prism: {
        additionalLanguages: ["python"],
        theme: require('prism-react-renderer/themes/vsLight'),
        darkTheme: require('prism-react-renderer/themes/vsDark'),
      },
    }),
};

module.exports = config;
