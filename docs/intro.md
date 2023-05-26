---
sidebar_position: 1
---

# Overview

**BuildFlow**, is an open source framework that lets you process large amounts of data by simply attaching a decorator to a Python function. All you need to do is describe where your input is coming from and where your output should be written, and BuildFlow handles the rest. No configuration outside of the code is required.

**Source Code**: https://github.com/launchflow/buildflow

Key Features:

- Unified **batch** and **streaming** [Processor API](processors/overview)
- [Dynamic autoscaling](autoscaling.md): scale up during high traffic / reduce costs during low traffic
- Production-grade [I/O Connectors](io-connectors/overview) for popular cloud services & storage systems
- I/O Connectors for common use cases (e.g. [file upload notifications](io-connectors/gcs_notifications))
- Automatic [resource creation / management](resource-creation) for popular cloud resources
- [Schema validation](schema-validation) powered by Python dataclasses and type hints
- Automatic parallelism powered by [Ray](https://ray.io)

:::note

**BuildFlow** is currently in beta. The first stable version will be released alongside the [LaunchFlow VSCode Extension](https://www.launchflow.com/) in summer 2023. Please join our [Discord](https://discordapp.com/invite/wz7fjHyrCA) if you have any questions or feedback.

:::

## Quickstart

### Install

```bash
pip install buildflow
```

### Example Usage

```python
from buildflow import ComputeNode
from buildflow.io import PubSubSource, BigQuerySink

# Create an app instance. 1 app == 1 cluster
app = ComputeNode()

# Define your Input and Output (source & sink)
source = PubSubSource(subscription='TODO')
sink = BigQuerySink(table_id='TODO')

# Create a processor
@app.processor(source=source, sink=sink)
def process_message(pubsub_message):
  # TODO(developer): Implement processing logic
  ...
  # The output is automatically sent to the sink provider
  return pubsub_message

# Start the processor(s)
app.run()
```

For a more in depth tutorial see our [walkthroughs](category/walk-throughs).

## Windows Users

Our runtime is built on [Ray](https://ray.io/), where Windows support is currently in beta. See the [Ray docs](https://docs.ray.io/en/latest/ray-overview/installation.html#windows-support) for more info.
