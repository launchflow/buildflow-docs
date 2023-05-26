---
sidebar_position: 2
---

# Compute Nodes

The **ComputeNode** object is the container for your application.

```python
from buildflow import ComputeNode

app = ComputeNode(...)

@app.processor(...)
def my_processor(element):
    ...

app.run()
```

A ComputeNode can contain multiple [Processors](./processors/overview.md) and will deploy all Processors to a single [Ray Cluster](https://docs.ray.io/en/latest/cluster/). Multiple ComputeNodes can be deployed together using a [DeploymentGrid](./deployment_grid/overview.md).

## Create a new app

Creating a ComputeNode object is as simple as:

```python
from buildflow import ComputeNode

app = ComputeNode()
```

## Attach Processors to your app

Processors can be attached to a ComputeNode with a python decorator like:

```python
@app.processor(source=..., sink=...)
def my_processor(element):
    ...
```

The ComputeNode manages the entire lifecycle of your Processor(s).

Processors come in two classes: **Streaming** and **Batch**. Your Processor's `source` argument will determine which runtime is used (e.g. PubSubSource will spawn a Streaming runtime). You can learn more in the [Processor Overview](./processors/overview.md).

## Run your app

Once you have attached your processors you can run them by simply by calling `run()` on the ComputeNode object.

```python
app.run()
```

Once this is called your Processors will begin executing and your application will run until completion.
:::note

**Streaming Processors** will run forever (or until you kill the python process).

:::
