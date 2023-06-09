# Custom Types

BuildFlow supports using custom types for both the input and your output of the processor. If you are receiving or writing a JSON payload you can simply use a `dataclass` to get automatic serialization and deserialization.

For outputs this feature is what powers our schema validation, type checking, and resource creation. When you specify the output type of your process we can automatically create the resource for you, and perform checks to ensure that the data you are sending is valid.

```python
@dataclass
class InputType:
    a: int

@dataclass
class OutputType:
    b: int

@app.processor(source=ResourceType(...), sink=ResourceType(...))
async def my_processor(elem: InputType) -> OutputType:
    return(OutputType(b=elem.a + 1))
```

:::warning

If you do not provide a type hint you for the input will receive the raw data from the source. For more info on what this is see the [Resource Types](../resource-types/overview) section for you specific source and sink. If you do not provide a type hint for the output you will get no runtime checks to verify it is compatible with your source.

:::

## What if a dataclass isn't enough?

If you need any custom serialization or deserialzation you can provide a custom type as well. All you need to do is have your custom type provide a method that tell us how to serialize or deserialize the type.

The method you need to implement will be dependent on the resource you are using. For example if you are using `GCPPubSubSubscription` as a source you can add a `from_bytes` class method to have automatic deserialization. If you are using `BigQueryTable` as a sink you can add a `to_json` instance method to have automatic serialization.

See the [Resource Types](../resource-types/overview) section for your specific source and sink for more info.

Example:

```python

class CustomType:
    def __init__(self, decoded_data: str):
        self.decoded_data = str

    @classmethod
    def from_bytes(cls, data: bytes):
        return cls(data.decode())

    def to_json(self):
        return {"decoded_data": self.decoded_data}

@app.processor(source=ResourceType(...), sink=ResourceType(...))
async def my_processor(elem: CustomType) -> CustomType:
    return(OutputType(b=elem.a + 1))
```