# Google Cloud Pub/Sub

## GCP Pub/Sub Topic

`GCPPubSubTopic` is a sink primitive that can be used to write data to a Pub/Sub topic. To create a `GCPPubSubTopic` provide:
- `project_id` **required**: gcp project where the topic exists
- `topic_name` **required**: name of the topic

```python
from buildflow.io.gcp import GCPPubSubTopic

@app.pipeline(source=...,
    sink=GCPPubSubTopic(
        project_id="project",
        topic_name="my-topic"))
    ...
```

### Types
The `GCPPubSubTopic` sink expects an object that can be serialized into bytes. You can return a `dataclass` and we will automatically serialize it to JSON and then UTF-8 encoded bytes. Or you can return a bytes object directly.

If you have a custom type you can implement the `to_bytes` method to return the bytes you want to send to Pub/Sub.

```python
class CustomType:
    def __init__(self, data: str):
        self.data = str

    def to_bytes(self):
        return self.data.decode("utf-8")

@app.pipeline(source=..., sink=GCPPubSubTopic(...))
async def my_processor(elem: str) -> CustomType:
    return CustomType(data=elem)
```

### Resource Creation

If you are using BuildFlow's built in resource creation/management you can use the `GCPPubSubTopic` primitive to create a Pub/Sub topic in your provided project.

### Configuration Options

You can provide the following options to control resource management of the Pub/Sub topic:
- `managed`: Whether or not the topic is managed by BuildFlow. Defaults to `False`.

```python
GCPPubSubTopic(...).options(managed=True)
```


## GCP Pub/Sub Subscription

`GCPPubSubSubscription` is a source primitive that can be used to read data from a Pub/Sub subscription. To create a `GCPPubSubSubscription` provide:

 - `project_id` **required**: gcp project where the subscription exists
 - `subscription_name` **required**: name of the subscription

```python

from buildflow.io.gcp import GCPPubSubSubscription

@app.pipeline(source=GCPPubSubSubscription(project_id="project", subscription_name="my-subscription"), sink=...)
def process(elem: MyType):
    ...
```


### Types

The `GCPPubSubSubscription` source returns a `bytes` object by default. However you can also provide us a type that you would like us to deserialize the bytes into. If you provide a dataclass we will automatically deserialize the bytes into a JSON object and then create your dataclass. If you provide a custom type you can implement the `from_bytes` method to deserialize the bytes into your type.

```python
class CustomType:
    def __init__(self, decoded_data: str):
        self.decoded_data = str

    @classmethod
    def from_bytes(cls, data: bytes):
        return cls(data.decode())

@app.pipeline(source=GCPPubSubSubscription(...), sink=...)
async def my_processor(elem: CustomType) -> CustomType:
    return elem
```

### Resource Creation

If you are using BuildFlow's built in resource creation/management you can use the `GCPPubSubSubscription` primitive to create a Pub/Sub subscription in your provided project that subscribes to your provided topic.

#### Configuration Options

You can provide the following options to control resource management of the Pub/Sub topic:
- `managed`: Whether or not the topic is managed by BuildFlow. Defaults to `False`.
- `topic`: The [GCPPubSubTopic](./gcp_pubsub#gcp-pubsub-topic) of the topic you want to subscribe to this will be used when creating the subscription if it is managed.
- `include_attributes`: Whether or not attributes should be included in the return type. If this is set to `True` your pipeline will receive a `PubsubMessage` class containing the raw message and attributes. Defaults to `False`.


```python
GCPPubSubSubscription(...).options(managed=True, topic=GCPPubSubTopic(...), include_attributes=True)
```