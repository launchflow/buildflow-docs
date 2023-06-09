# Google Cloud Pub/Sub

## GCP Pub/Sub Topic

`GCPPubSubTopic` is a sink resource type that can be used to write data to a Pub/Sub topic. To create a `GCPPubSubTopic` provide:
- `project_id`: gcp project where the topic exists
- `topic_name`: name of the topic

:::tip

You can leave topic name out and use `buildflow plan ...` to have one automatically created for you.

:::

```python
from buildflow.io import GCPPubSubTopic

@app.processor(source=..., sink=GCPPubSubTopic(project_id="project", topic_name="my-topic")) -> MyType:
    ...
```

### Expected Types
The `GCPPubSubTopic` sink expects an object that can be serialized into bytes. You can return a `dataclass` and we will automatically serialize it to JSON and the UTF-8 encoded bytes. Or you can return a bytes object directly.

If you have a custom type you can implement the `to_bytes` method to return the bytes you want to send to Pub/Sub.

```python
class CustomType:
    def __init__(self, data: str):
        self.data = str

    def to_bytes(self):
        return self.data.decode("utf-8")

@app.processor(source=ResourceType(...), sink=GCPPubSubTopic(...))
async def my_processor(elem: str) -> CustomType:
    return CustomType(data=elem)
```

### Resource Creation

If you are using BuildFlow's built in resource creation/management you can use the `GCPPubSubTopic` resource type to create a Pub/Sub topic in your provided project.


## GCP Pub/Sub Subscription

`GCPPubSubSubscription` is a source resource type that can be used to read data from a Pub/Sub subscription. To create a `GCPPubSubSubscription` provide:

 - `project_id`: gcp project where the subscription exists
 - `topic_id`: topic id to subscripe to in the form `projects/GCP_PROJECT/topics/TOPIC_NAME`
 - `subscription_name`: name of the subscription

:::tip

You can leave subscription name out and use `buildflow plan ...` to have one automatically created for you.

:::

```python

from buildflow.io import GCPPubSubSubscription

@app.processor(source=GCPPubSubSubscription(project_id="project", topic_id="projects/project/topics/topic", subscription_name="my-subscription"), sink=...)
def process(elem: MyType):
    ...
```

### Input Type

The `GCPPubSubSubscription` source returns a `bytes` object by defaults. However you can also provide us a type that you would like us to deserialize the bytes into. If you provide a dataclass we will automatically deserialize the bytes into a JSON object and then create your dataclass. If you provide a custom type you can implement the `from_bytes` method to deserialize the bytes into your type.

```python

class CustomType:
    def __init__(self, decoded_data: str):
        self.decoded_data = str

    @classmethod
    def from_bytes(cls, data: bytes):
        return cls(data.decode())

@app.processor(source=GCPPubSubSubscription(...), sink=...)
async def my_processor(elem: CustomType) -> CustomType:
    return elem
```

### Resource Creation

If you are using BuildFlow's built in resource creation/management you can use the `GCPPubSubSubscription` resource type to create a Pub/Sub subscription in your provided project that subscribes to your provided topic.