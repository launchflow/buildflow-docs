# Flows

A Flow is the entity that is run by BuildFlow, and is the container for any [processors](../pipelines/overview) you would like to run together.

## Create a New Application

A flow is created by instantiating a `Flow` object:

```python
from buildflow import Node

app = Flow()
```

## Attach Pipelines

If you use a processor decorator, processors are automatically attached to your Node.

```python
app = Flow()

@app.pipeline(source=..., sink=...)
def processor(...):
    ...
```

## Flow Methods

There are several methods on the node for managing the node.

- **run**: runs your node and all processors it contains
- **drain**: drains all processors and stops the node
- **apply**: applys all infracture required by your node
- **destroy**: destroys all infracture

:::tip

The BuildFlow CLI is a proxy for all of these methods, and you generally won't need to call these directly.

:::
