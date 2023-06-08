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
          link: {
            type: 'generated-index',
          },
          items: [
            "user-guides/processors/async-processors",
            "user-guides/processors/stateful-processors",
          ],
        },
        "user-guides/nodes",
        "user-guides/resource-management",
      ],
    },
    {
      type: "category",
      label: "Resource Types",
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: "category",
          label: "Google Cloud Platform",
          link: {
            type: 'generated-index',
          },
          items: [
            "resource-types/gcp/gcp_bigquery",
            "resource-types/gcp/gcp_pubsub",
            "resource-types/gcp/gcp_storage",
          ],
        },
        {
          type: "category",
          label: "Cloud Agnostic",
          link: {
            type: 'generated-index',
          },
          items: [
            "resource-types/local/file",
            "resource-types/local/pulsing",
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
    "walkthroughs/gcp-realtime-image-classification",
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
    "features/resource-creation",
    "features/schema-validation",
    {
      type: "html",
      value: "<hr>Architecture",
      className: "sidebar-title",
    },
    "architecture/runtime",
    "architecture/infrastructure",
  ],
};
