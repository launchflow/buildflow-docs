---
sidebar_position: 2
---
# Concepts


## Nodes

The Node class is the entrypoint into the BuildFlow Framework. Nodes acts as a container type for user-defined Processors and are responsible for orchestrating the Processors across the Runtime and Infrastructure submodules.

TLDR; Nodes act as a container type for a user's application:
```python
from buildflow import Node

app = Node()

...
```

## Processors

At a high-level, Processors are a user-defined function sandwiched between an input provider (Source) and output provider (Sink). They act as a declaritive API for describing your system, and offload a majority of the work to the Node class and Providers.

```python
# Creates a Processor and adds it to the app (Node class)
@app.processor(source=..., sink=...)
def my_processor(payload):
    # TODO(developer): Add processing logic
    return payload
```

## ResourceType

ResourceTypes are the input (Sources) and output (Sinks) objects passed to a Processor. They act as a container type for any configuration values, such as a `project_id` or `table_id`. ResourceTypes **do not** implement any logic, but rather expose a `provider()` method fetching the Provider class that contains the logic.

```python
class BigQueryTable(ResourceType):
    # format: project.dataset.table
    table_id: str

    def provider(self):
        return BigQueryProvider(table_id=self.table_id)
```

## Providers

Providers implement the logic for setting up and interacting with other systems and resources (ResourceTypes). There are multiple types of Providers and each type is responsible for a single task (i.e. a PullProvider only needs to provide a `pull` method). 

### PullProvider

PullProviders are used to `pull` data from a Source and optionally `ack` completion of work, typically in a streaming runtime.

Required methods:
- pull

Optional methods (unlocks more Runtime features):
- ack
- backlog
- pull_converter

Example PullProvider:
```python
from buildflow.io.providers import PullProvider, PullResponse, AckInfo

class MyProvider(PullProvider):

    async def pull(self) -> PullResponse:
        ...

    async def ack(self, to_ack: AckInfo):
        ...
```

### PushProvider

PushProviders are used to `push` data to a Sink.

Required methods:
- push

Optional methods (unlocks more Runtime features):
- push_converter

Example PushProvider:
```python
from buildflow.io.providers import PushProvider, PushResponse, BatchType

class MyProvider(PushProvider):

    async def push(self, batch: BatchType) -> PushResponse:
        ...
```

### PulumiProvider

PulumiProviders are used to create / manage infrastructure using [Pulumi](https://github.com/pulumi/pulumi).


Required methods:
- pulumi

Example PushProvider:
```python
from typing import Optional, Type
from buildflow.io.providers import PulumiProvider, PulumiResources

class MyProvider(PulumiProvider):

    def pulumi(self, type_: Optional[Type]) -> PulumiResources:
        ...
```