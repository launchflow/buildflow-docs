---
sidebar_position: 2
---
# Key Concepts

Before getting started with BuildFlow, it's important to understand the core concepts and terminology used throughout the documentation.

- [Node](#nodes): a container type for user-defined Processors.
- [Processor](#processors): a user-defined function between a Source and Sink.
- [ResourceType](#resourcetype): Define the input (Source) and output (Sink) of a Processor.
- Source: a ResourceType that defines how data should be retrieved and sent to your processor.
- Sink: a ResourceType that defines how data should be sent to your resource from your processor.
- [Providers](#providers): Providers implement the logic for setting up and interacting with other systems and resources


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

BuildFlow provides many `ResourceTypes` out of the box, but you can also create your own for any custom needs. Read more about our Provider API to learn how to define your own `ResourceType` and providers.

## Providers

Providers implement the logic for setting up and interacting with other systems and resources (ResourceTypes). There are multiple types of Providers and each type is responsible for a single task (i.e. a PullProvider provides a mechanism for pulling data from a source).
