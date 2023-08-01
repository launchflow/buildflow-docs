---
sidebar_position: 2
---
# Key Concepts

Before getting started with BuildFlow, it's important to understand the core concepts and terminology used throughout the documentation.

- [Flow](#flows): a container type for user-defined Processors.
- [Processor](#processors): a user-defined, individually scalable component of a flow
- [Pipeline](#pipelines): a specific type of processor that reads from a Source and writes to a Sink
- [Replica](#replicas): an individual instance of a processor that is reading from a source and writing to a sink. More replicas are added and remove with autoscaling.
- [Primitives](#primitives): a resource that a processor may read from, write to, or manage


## [Flows](./user-guides/flows/overview)

The Flow class is the entrypoint into the BuildFlow Framework. They acts as a container type for user-defined Processors and are responsible for orchestrating the Processors across the Runtime and Infrastructure submodules.

TLDR; Flows act as a container type for a user's application:
```python
from buildflow import Flow

app = Flow()

...
```

## Processors

At a high-level, Processors are a user-defined function that are individually scalable. Currently BuildFlow supports one type of Processor, a [Pipeline](#pipeline), which reads from a real-time Source and writes to a Sink. With plan in the future to add support for: 
- Batch Pipelines
- HTTP Endpoints
- WebSockets

### [Pipelines](./user-guides/pipelines/overview)
A `pipeline` is a specifc type of processor intended for real-time data processing. Pipelines read from an unbounded source such as (Kafka, AWS SQS, or GCP Pub/Sub) and outputs to a Sink. They are attached to a Flow by using the `@app.pipeline` decorator.

```python
# Creates a Processor and adds it to the app (Node class)
@app.pipeline(source=..., sink=...)
def my_processor(payload):
    # TODO(developer): Add processing logic
    return payload
```

## Replicas

A replica is an individual instance of a processo. As the load of your source changes, BuildFlow will automatically scale the number of replicas to match the load.

## [Primitives](./user-guides/primitives/overview)

Primitives represent an individual resource that a processor may read or write to. For example, a `BigQueryTable` is a primitive that represents a single BigQuery table. Primitives define how to read from a source, write to a sink, and also how to manage the primitive with pulumi. 

Primitives can be used as inputs (Sources) or outputs (Sinks) for pipelines. A full list of our support primitives can be found in our [primitive docs](./category/primitives). You can also define your own primitives for reading, writing, and managing custom resources.
