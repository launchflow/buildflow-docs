# Nodes

A node is the entity that is run by BuildFlow, and is the container for any [processors](../processors/overview) you would like to run together.

## Create a new node

A node is created by instantiating a `Node` object:

```python
from buildflow import Node

app = Node(node_id="my-app")
```

:::tip

`node_id` is optional, but can be useful for isolating resources across different nodes.

:::

## Attach Processors

If you use a processor decorator, processors are automatically attached to your Node.

```python
app = Node(node_id="my-app")

@app.processor(source=..., sink=...)
def processor(...):
    ...
```

Or if you use the processor class you can attach processors with the `app.add()` method

```python
from buildflow import Node, Processor

app = Node()

class MyProcessor(Processor):
    ...

app.add(MyProcessor())
```

## Processor Methods

There are several methods on the node for managing the node.

- **run**: runs your node and all processors it contains
- **drain**: drains all processors and stops the node
- **plan**: plans all infracture required by your node
- **destroy**: destroys all infracture

:::tip

The BuildFlow CLI is a proxy for all of these methods, and you generally won't need to call these directly.

:::
