import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '716'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'f8e'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'f2d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '408'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'b8a'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '130'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', 'eed'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', '3f3'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', 'bc1'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '9f8'),
    exact: true
  },
  {
    path: '/blog/tags/buildflow',
    component: ComponentCreator('/blog/tags/buildflow', 'c80'),
    exact: true
  },
  {
    path: '/blog/tags/launch',
    component: ComponentCreator('/blog/tags/launch', 'd34'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', '63e'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', 'b73'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'd43'),
    routes: [
      {
        path: '/docs/category/api--concepts',
        component: ComponentCreator('/docs/category/api--concepts', 'be0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/processor/io-connectors',
        component: ComponentCreator('/docs/processor/io-connectors', 'af6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/processor/processor-api',
        component: ComponentCreator('/docs/processor/processor-api', '002'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/quickstart',
        component: ComponentCreator('/docs/quickstart', 'e30'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'a20'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
