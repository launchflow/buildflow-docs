---
sidebar_position: 1
---

# BuildFlow Docs

**BuildFlow** is an open source framework that transforms any python function into a scalable data pipeline.

Key Features:

- Fast - Scalable multiprocessing powered by [Ray](https://ray.io/)
- Provides ready made IO connectors for popular cloud services
- Unified **batch** and **streaming** API

## Quickstart

### Install

```bash
pip install buildflow
```

### Example Usage

```python
# Import the buildflow package
from buildflow import Flow

# Create the Flow object
flow = Flow()

# Define your input / output(s)
@flow.processor(
   input_ref=buildflow.PubSub(subscription='my_subscription'),
   output_ref=buildflow.BigQuery(table_id='project.dataset.table'),
)
def stream_processor(pubsub_message):
  # TODO(developer): Implement processing logic
  ...

# Start the processor
flow.run()
```

## Windows Users

Our runtime is built on [Ray](https://ray.io/), where Windows support is currently in beta. See the [Ray docs](https://docs.ray.io/en/latest/ray-overview/installation.html#windows-support) for more info.
