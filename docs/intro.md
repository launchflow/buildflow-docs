---
sidebar_position: 1
---

# BuildFlow Docs

**BuildFlow** is an open source framework that transforms any python function into a scalable data pipeline.

Key Features:

- Unified **batch** and **streaming** [Processor API](api/processor-api.md)
- Production-grade [IO connectors](api/io-connectors.md) for popular cloud services & storage systems
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
   source=buildflow.PubSub(subscription='my_subscription'),
   sink=buildflow.BigQuery(table_id='project.dataset.table'),
)
def stream_processor(pubsub_message):
  # TODO(developer): Implement processing logic
  ...
  # The output is sent to the sink provider
  return pubsub_message

# Start the processor(s)
flow.run(num_replicas=4)
```

## Windows Users

Our runtime is built on [Ray](https://ray.io/), where Windows support is currently in beta. See the [Ray docs](https://docs.ray.io/en/latest/ray-overview/installation.html#windows-support) for more info.
