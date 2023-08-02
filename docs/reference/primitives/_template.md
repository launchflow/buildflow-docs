# Primitive Name

Description of the primitive. Folowed by arguments:

- `arg1` **required**: description of required arg1
- `arg2`: description of options arg2 with default

Example usage:

```python
from buildflow.io import PrimitiveName

@app.pipeline(source=PrimitiveName(arg1="value", arg2="value"), sink=PrimitiveName(arg1="value", arg2="value"))
```

## Types
Description of what types the primitive expects to receive and return.

If this is a source you should describe how a user can parse the data into the expected type.
If this is a sink you should describe how a user can serialize the data into the expected type.

Example of custom type:

```python
class CustomType:
    def __init__(self, data: str):
        self.data = str

    def to_bytes(self):
        return self.data.decode("utf-8")

@app.pipeline(source=ResourceType(...), sink=GCPPubSubTopic(...))
async def my_pipeline(elem: str) -> CustomType:
    return CustomType(data=elem)
```

## Resource Creation

Describe what resources will be create when running `buildflow apply main:app`

## Configuration Options

Describe any configuration options for the primitive and provide an example

- `managed`: Whether or not the topic is managed by BuildFlow. Defaults to `False`.

```python
primitive = Primitive(...).options(managed=True, ...)
```
