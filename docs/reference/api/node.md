---
sidebar_position: 2
---

# Node API

The **Node** object is the container for your application.

```python
from buildflow import Node

app = Node(...)

@app.processor(...)
def my_processor(element):
    ...

app.run()
```

A Node can contain multiple [Processors](./processor) and will deploy all Processors to a single [Ray Cluster](https://docs.ray.io/en/latest/cluster/).
## Create a new app

Creating a Node object is as simple as:

```python
from buildflow import Node

app = Node()
```

## Attach Processors to your app

Using the procesesor decorator automatically attaches your Processor to your Node.

```python
@app.processor(source=..., sink=...)
def my_processor(element):
    ...
```

Processor classes can be attached with the `add` method:

```python
class MyProcessor(Processor)
    ...

app.add(MyProcessor())
```

The Node manages the entire lifecycle of your Processor(s).

Processors come in two classes: **Streaming** and **Batch**. Your Processor's `source` argument will determine which runtime is used (e.g. PubSubSource will spawn a Streaming runtime). You can learn more in the [Processor Overview](./processor).

## Run your app

Once you have attached your processors you can run them by simply by calling `run()` on the Node object.

```python
app.run()
```

Once this is called your Processors will begin executing and your application will run until completion.
:::note

**Streaming Processors** will run forever (or until you kill the python process).

:::
