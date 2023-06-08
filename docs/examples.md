---
sidebar_position: 1
---

# Examples

Below are some quick examples of using BuildFlow. If you are just getting started with BuildFlow we recommend starting with our walkthroughs:
- [GCP Real-Time Image Classification](./walkthroughs/gcp-realtime-image-classification)

## Install

```bash
pip install buildflow
```

## Basic Example Usage

```python
from buildflow import Node
from buildflow.io import GCPPubSubSubscription, BigQueryTable


# Step 1. Create a BuildFlow Node (app) and define your input / output(s)
app = Node()

# NOTE: A Subscription will automatically be created in the billing project
source = GCPPubSubSubscription(topic='TODO', billing_project='TODO')
# NOTE: A BigQuery Table will be automatically created using the
sink = BigQuerySink(table_id='TODO')


# Step 2. Create a Processor that reads from Google PubSub and writes to BigQuery
@app.processor(source=source, sink=sink)
async def process_message(pubsub_message):
  # TODO(developer): Implement processing logic
  ...
  # The output is automatically sent to the sink provider
  return {...}


# Step 3. Start the BuildFlow app's Runtime
if __name__ == ""__main__"":
  app.run()
```

For more in-depth tutorials, see our walkthroughs.

## Example Usage with Custom Configuration

```python
from dataclasses import dataclass

from buildflow import Node, RuntimeConfig, InfraConfig, SchemaValidation
from buildflow.io import GCPPubSubSubscription, BigQueryTable


# Optional: Use dataclasses and BuildFlow will perform schema validation checks
@dataclass
class InputSchema:
    field: str

@dataclass
class OutputSchema:
    other: int


# Optional: Configure the Runtime & Infra submodules for your use case.
# All BuildFlow configs have class method for common use cases.
runtime_config = RuntimeConfig.IO_BOUND(autoscale=True)
# You can also set the values directly
infra_config = InfraConfig(
    schema_validation=SchemaValidation.STRICT,
    require_confirmation=True,
    log_level="INFO",
)

# Step 1. Create a BuildFlow Node (app) and define your input / output(s)
app = Node(runtime_config=runtime_config, infra_config=infra_config)

# NOTE: A Subscription will automatically be created in the billing project
source = GCPPubSubSubscription(topic='TODO', billing_project='TODO')
# NOTE: A BigQuery Table will be automatically created using the
sink = BigQuerySink(table_id='TODO')


# Step 2. Create a Processor that reads from Google PubSub and writes to BigQuery
@app.processor(
  source=source,
  sink=sink,
  # Optional: Configure your processor's replica options. In this case, we will run
  # 2 replicas per CPU core, and each replica will run 8 tasks concurrently.
  num_cpus=0.5,
  num_concurrency=8,
)
async def process_message(pubsub_message: InputSchema) -> OutputSchema:
  # TODO(developer): Implement processing logic
  ...
  # The output is automatically sent to the sink provider
  return OutputSchema(...)


# Step 3. Start the BuildFlow app's Runtime
app.run(
  # Optional: Set infra options for this run. In this case, we will create the
  # PubSub Subscription and BigQuery Tables on start, and will delete them
  # once the run is complete. This can be useful for integration tests, or when
  # trying out new cloud services.
  apply_infrastructure: bool = True,
  destroy_infrastructure: bool = True,
)

if __name__ == ""__main__"":
  app.run()
```

For more in-depth tutorials, see our walkthroughs.
