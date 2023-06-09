# Custom Resource Types

To define a custom resource type the first thing you need to do is define the provider the resource type will use. Depending on what you are using the resource type for you will need to define implement different providers:

- Sink: [PushProvider](./overview#push-provider)
- Source: [PullProvider](./overview#pull-provider)
- Resource Management: [PulumiProvider](./overview#pulumi-provider)

:::tip

You can have one provider that implements all of this if needed.

:::

```python
from buildflow.io import PullProvider, PushProvider, PulumiProvider

class YouCustomProvider(PullProvider, PushProvider, PulumiProvider):
    ...
```

Once you have defined your provider you can define your resource type that uses the provider:

```python
from buildflow.io import ResourceType
@dataclass
class YourCustomResourceType(ResourceType):

    def provider(self):
        return YouCustomProvider()
```

Once that is defined you can now use that resource type in your processors.

```python
@app.processor(source=YourCustomResourceType(), sink=YourCustomResourceType())
def process(elem):
    return elem
```