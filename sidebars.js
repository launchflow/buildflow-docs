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
    {
      type: "category",
      label: "What is BuildFlow?",
      items: ["what_is_buildflow/overview", "what_is_buildflow/concepts"],
    },
    {
      type: "html",
      value: "<hr>Get Started",
      className: "sidebar-title",
    },
    "install",
    "quickstart",
    {
      type: "html",
      value: "<hr>API References",
      className: "sidebar-title",
    },
    "apis/processor",
    "apis/node",
    {
      type: "category",
      label: "IO Providers",
      items: [
        "apis/providers/base",
        {
          type: "category",
          label: "gcp",
          items: [
            "apis/providers/gcp/gcp_pubsub",
            "apis/providers/gcp/gcp_bigquery",
            "apis/providers/gcp/gcp_storage",
          ],
        },
        {
          type: "category",
          label: "local",
          items: [
            "apis/providers/local/file_provider",
            "apis/providers/local/pulse_provider",
          ],
        },
      ],
    },
    {
      type: "html",
      value: "<hr>Walkthroughs",
      className: "sidebar-title",
    },
    "walkthroughs/pubsub_streaming",
    "walkthroughs/local_pubsub_streaming",
    "walkthroughs/csv_bigquery_streaming",
    "walkthroughs/aws_sqs_streaming",
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
