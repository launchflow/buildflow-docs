# AWS SQS

`SQSQueue` is a sink and source primitive that can be used to read and write messages to an SQS queue. To create a `SQSQueue` provide:

- `queue_name` **required**: The name of the queue
- `aws_region`: The region the queue exists in
- `aws_account_id`: The account id the queue exists in

Example sink usage:

```python
from buildflow.io.aws import SQSQueue

@app.pipeline(source=..., sink=SQSQueue(
    queue_name="queue_name",
    aws_region="us-east-1",
    aws_account_id="1234567890")
)
```

Example source usage:

```python
from buildflow.io.aws import SQSQueue

@app.pipeline(sink=SQSQueue(
        queue_name="queue_name",
        aws_region="us-east-1",
        aws_account_id="1234567890"),
    source=...,
)
```

:::

## Types
The `SQSQueue` sink expects an object that can be serialized into a string. You can return a `dataclass` and we will automatically serialize it to JSON, or you can return a string object directly.

If you have a custom type you can implement the `to_string` method to return the bytes you want to send to SQS.

```python
class CustomType:
    def __init__(self, data: str):
        self.data = str

    def to_string(self):
        return self.data

@app.pipeline(source=..., sink=SQSQueue(...))
async def my_processor(elem: str) -> CustomType:
    return CustomType(data=elem)
```

The `SQSSource` source returns a `string` object by default. However you can also provide us a type that you would like us to deserialize the string into. If you provide a dataclass we will automatically deserialize the string into a JSON object and then create your dataclass. If you provide a custom type you can implement the `from_string` method to deserialize the string into your type.

```python
class CustomType:
    def __init__(self, data: str):
        self.decoded_data = str

    @classmethod
    def from_string(cls, data: str):
        return cls(data)

@app.pipeline(source=SQSQueue(...), sink=...)
async def my_processor(elem: CustomType) -> CustomType:
    return elem
```

## Resource Creation

If you are using BuildFlow's built in resource creation/management you can use the `SQSQueue` primitive to create a queue in your AWS account.


## Configuration Options

You can provide the following options to control resource management of the SQS queue:

- `managed`: Whether or not the topic is managed by BuildFlow. Defaults to `False`.

```python
primitive = SQSQueue(...).options(managed=True)
```
