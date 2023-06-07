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
        "apis/providers/gcp_pubsub",
        "apis/providers/gcp_bigquery",
        "apis/providers/gcp_storage",
        "apis/providers/local",
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
      value: "<hr>Architecture",
      className: "sidebar-title",
    },
    "architecture/runtime",
    "architecture/infrastructure",
  ],
};
