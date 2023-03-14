---
sidebar_position: 1
---

# BuildFlow Docs

**BuildFlow**, is an open source framework that lets you build a data pipeline by simply attaching a decorator to a Python function. All you need to do is describe where your input is coming from and where your output should be written, and BuildFlow handles the rest. No configuration outside of the code is required.

**Source Code**: https://github.com/launchflow/buildflow


Key Features:

- Unified **batch** and **streaming** [Processor API](processors/overview)
- Production-grade [IO connectors](io-connectors/overview) for popular cloud services & storage systems
- IO templates for common data pipelines (e.g. [file upload notifications](io-connectors/gcs_notifications))
- Automatic [resource creation / management](resource-creation) for popular cloud resources
- [Schema validation](schema-validation) powered by Python dataclasses and type hints
- Automatic parallelism powered by [Ray](https://ray.io)

## Quickstart

### Install

```bash
pip install buildflow
```

### Example Usage

```python
# Import the buildflow package
import buildflow
from buildflow import Flow

# Create the Flow object
flow = Flow()

# Define your input / output
@flow.processor(
   source=buildflow.PubSubSource(subscription='my_subscription'),
   sink=buildflow.BigQuerySink(table_id='project.dataset.table'),
)
def stream_processor(pubsub_message):
  # TODO(developer): Implement processing logic
  ...
  # The output is sent to the sink provider
  return pubsub_message

# Start the processor(s)
flow.run(num_replicas=4)
```

For a more in depth tutorial see our [walkthroughs](category/walk-throughs).

## Windows Users

Our runtime is built on [Ray](https://ray.io/), where Windows support is currently in beta. See the [Ray docs](https://docs.ray.io/en/latest/ray-overview/installation.html#windows-support) for more info.
