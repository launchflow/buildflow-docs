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
    "faq",
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
          label: "Flows",
          link: { type: 'doc', id: 'user-guides/flows/overview' },
          items: [
            "user-guides/flows/flow-options",
          ],
        },
        {
          type: "category",
          label: "Pipelines",
          link: { type: 'doc', id: 'user-guides/pipelines/overview' },
          items: [
            "user-guides/pipelines/stateful-pipelines",
            "user-guides/pipelines/async-pipelines",
            "user-guides/pipelines/custom-types",
            "user-guides/pipelines/pipeline-options",
          ],
        },
        {
          type: "category",
          label: "Primitives",
          link: { type: 'doc', id: 'user-guides/primitives/overview' },
          items: [
            "user-guides/primitives/portable",
            "user-guides/primitives/custom-primitives",
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
      label: "Primitives",
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: "category",
          label: "Amazon Web Services",
          link: {
            type: 'generated-index',
          },
          items: [
            "reference/primitives/aws/s3",
            "reference/primitives/aws/sqs",
            "reference/primitives/aws/s3_file_change_stream",
          ],
        },
        {
          type: "category",
          label: "Google Cloud Platform",
          link: {
            type: 'generated-index',
          },
          items: [
            "reference/primitives/gcp/gcp_bigquery",
            "reference/primitives/gcp/gcp_pubsub",
            "reference/primitives/gcp/gcp_storage",
            "reference/primitives/gcp/gcs_file_change_stream",
          ],
        },
        {
          type: "category",
          label: "Local",
          link: {
            type: 'generated-index',
          },
          items: [
            "reference/primitives/local/file",
            "reference/primitives/local/pulse",
          ],
        },
        {
          type: "category",
          label: "Portable",
          link: {
            type: 'generated-index',
          },
          items: [
            "reference/primitives/portable/queue",
            "reference/primitives/portable/analysis_table",
          ],
        },
        "reference/primitives/snowflake",
        "reference/primitives/duckdb",
      ],
    },
    {
      type: "category",
      label: "API",
      link: {
        type: 'generated-index',
      },
      items: [
        "reference/api/primitive",
        "reference/api/provider",
        "reference/api/strategy",
      ],
    },
    {
      type: "category",
      label: "CLI",
      items: [
        "reference/cli/run",
        "reference/cli/apply",
        "reference/cli/plan",
        "reference/cli/destroy",
      ]
    },
    {
      type: "html",
      value: "<hr>Features",
      className: "sidebar-title",
    },
    "features/autoscaling",
    "features/parallelism",
    "features/infrastructure-from-code",
    {
      type: "html",
      value: "<hr>Developers",
      className: "sidebar-title",
    },
    "developers/contribute",
  ],
};
