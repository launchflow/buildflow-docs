/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

module.exports = {
  mainSidebar: [
    "intro",
    "overview",
    {
      type: "html",
      value: "<hr>Programming Guide",
      className: "sidebar-title",
    },
    "install",
    "key-concepts",
    {
      type: "category",
      label: "User Guides",
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: "category",
          label: "Processors",
          link: { type: 'doc', id: 'user-guides/processors/overview' },
          items: [
            "user-guides/processors/stateful-processors",
            "user-guides/processors/async-processors",
            "user-guides/processors/custom-types",
            "user-guides/processors/processor-config",
          ],
        },
        {
          type: "category",
          label: "Nodes",
          link: { type: 'doc', id: 'user-guides/nodes/overview' },
          items: [
            "user-guides/nodes/node-config",
          ],
        },
        {
          type: "category",
          label: "Resource Types",
          link: { type: 'doc', id: 'user-guides/resource-types/overview' },
          items: [
            {
              type: "category",
              label: "Google Cloud Platform",
              link: {
                type: 'generated-index',
              },
              items: [
                "user-guides/resource-types/gcp/gcp_bigquery",
                "user-guides/resource-types/gcp/gcp_pubsub",
                "user-guides/resource-types/gcp/gcp_storage",
              ],
            },
            {
              type: "category",
              label: "Cloud Agnostic",
              link: {
                type: 'generated-index',
              },
              items: [
                "user-guides/resource-types/local/file",
                "user-guides/resource-types/local/pulsing",
              ],
            },
          ],
        },
        "user-guides/resource-management/overview",
        {
          type: "category",
          label: "Providers",
          link: { type: 'doc', id: 'user-guides/providers/overview' },
          items: [
            "user-guides/providers/custom-resource-types",
          ],
        },
      ],
    },
    "examples",
    {
      type: "html",
      value: "<hr>Walkthroughs",
      className: "sidebar-title",
    },
    "walkthroughs/realtime-image-classification",
    {
      type: "html",
      value: "<hr>Reference",
      className: "sidebar-title",
    },
    {
      type: "category",
      label: "CLI",
      items: [
        "reference/cli/destroy",
        "reference/cli/plan",
        "reference/cli/run",
      ],
    },
    {
      type: "html",
      value: "<hr>Features",
      className: "sidebar-title",
    },
    "features/autoscaling",
    "features/parallelism",
    "features/infrastructure-from-code",
    "features/schema-validation",
    {
      type: "html",
      value: "<hr>Developers",
      className: "sidebar-title",
    },
    "developers/contribute",
    "developers/runtime-architecture",
    "developers/infrastructure-architecture",

  ],
};
