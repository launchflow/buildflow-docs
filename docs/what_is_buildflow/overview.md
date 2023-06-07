---
sidebar_position: 1
---

# Overview

**BuildFlow**, is an open source framework for building large scale systems using Python. All you need to do is describe where your input is coming from and where your output should be written, and BuildFlow handles the rest. **No configuration outside of the code is required**.

**Source Code**: https://github.com/launchflow/buildflow

Key Features (all provided out-of-the-box):

- Automatic [resource creation / management](resource-creation) (Infrastructure as Code) powered by [Pulumi](https://github.com/pulumi/pulumi)
- Automatic parallelism / concurrency powered by [Ray](https://github.com/ray-project/ray)
- [Dynamic autoscaling](autoscaling.md): scale up during high traffic / reduce costs during low traffic
- Production-grade [I/O Providers](io-providers/overview) for popular cloud services & storage systems
  - Multi-step I/O Providers for common use cases (e.g. [file upload notifications](io-connectors/gcs_notifications))
- [Schema validation](schema-validation) powered by Python dataclasses and type hints

:::note

**BuildFlow** is currently in beta. The first stable version will be released alongside the [LaunchFlow VSCode Extension](https://www.launchflow.com/) in summer 2023. Please join our [Discord](https://discordapp.com/invite/wz7fjHyrCA) if you have any questions or feedback.

:::

## Quickstart

### Install

```bash
pip install buildflow
```

### Basic Example Usage

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
def process_message(pubsub_message):
  # TODO(developer): Implement processing logic
  ...
  # The output is automatically sent to the sink provider
  return {...}


# Step 3. Start the BuildFlow app's Runtime
app.run()
```

For more in-depth tutorials, see our [walkthroughs](category/walkthroughs).


### Example Usage with Custom Configuration

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
def process_message(pubsub_message: InputSchema) -> OutputSchema:
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
```

For more in-depth tutorials, see our [walkthroughs](category/walkthroughs).

## Windows Users

Our runtime is built on [Ray](https://ray.io/), where Windows support is currently in beta. See the [Ray docs](https://docs.ray.io/en/latest/ray-overview/installation.html#windows-support) for more info.
