# Providers

Providers are an internal detail of how resource types are able to read data, write data, and also be created and destroyed. In general you don't need to worry about providers unless you are creating a custom resource type.

ResourceTypes map to providers with a `provider` method. Every ResourceType must implement this method and return a Provider.

For example, the `Pulsing` resource type returns a `PulsingProvider`:

```python
@dataclass
class Pulse:
    items: Iterable[Any]
    pulse_interval_seconds: float

    def provider(self):
        return PulsingProvider(
            items=self.items, pulse_interval_seconds=self.pulse_interval_seconds
        )
```

## List of Providers

### Push Provider

The push provider is used to push data to a resource. Push providers can be used as sinks of a processor. All push providers must implement the following methods:

- `push`: Pushes data to the resource
- `push_converter`: Converts the users output data into the format required by the resource

```python
from buildflow.io.providers import PushProvider

class PrintPushProvider(PushProvider):

    def push(self, data: str):
        print(data)

    def push_converter(self, data: Any):
        return str(data)
```

### Pull Provider

The pull provider is used to pull data from a resource. Pull providers can be used as sources for a processor. All push providers must implement the following methods:

- `pull`: Pulls data from the resource
- `pull_converter`: Converts the data from the resource into the format required by the user
- `ack`: Acknowledges that the data was succesfully or unsuccesfully processed. This is called after the user has processed the data (either successfully or not).
- `backlog`: Returns the number of items that are currently in the backlog. This is used to determine if we need to scale up replicas.

```python
class PulsingProvider(PullProvider):
    def __init__(
        self,
        items: Iterable[Any],
        pulse_interval_seconds: float,
    ):
        super().__init__()
        self.items = items
        self.pulse_interval_seconds = pulse_interval_seconds
        self._to_emit = 0

    async def pull(self) -> PullResponse:
        await asyncio.sleep(self.pulse_interval_seconds)
        item = self.items[self._to_emit]
        self._to_emit += 1
        if self._to_emit == len(self.items):
            self._to_emit = 0
        return PullResponse([item], None)

    def pull_converter(self, user_defined_type: Type) -> Callable[[Any], Any]:
        return converters.identity()

    async def ack(self, to_ack: AckInfo, success: bool):
        pass

    def backlog(self) -> int:
        return 0
```

### Pulumi Provider

The pulumi provider is what is used for resource management of a resource type. All pulumi providers must implement the following methods:

- `pulumi`: Returns the pulumi resources for the resource type

```python
class GCPPubSubTopicProvider(PushProvider, SetupProvider, PlanProvider, PulumiProvider):
    ...

    def pulumi(
        self,
        type_: Optional[Type],
    ) -> PulumiResources:
        topic_resource = pulumi_gcp.pubsub.Topic(
            self.topic_name, name=self.topic_name, project=self.project_id
        )

        resources = [topic_resource]
        exports = {"gcp.pubsub.topic.name": topic_resource.name}
        return PulumiResources(resources=resources, exports=exports)
```
