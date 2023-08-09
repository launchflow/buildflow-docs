# Custom Primitives

## Implement the Primitive Interface

To create a custom primitivey you can implement the [Primitive](../../reference/api/primitive) interface.

:::tip

If your primitive is specific to a cloud provider you can extend [GCPPrimitive](../../reference/api/primitive#GCPPrimitive) or [AWSPrimitive](../../reference/api/primitive#AWSPrimitive).

:::

Each primitive may implement any of three methods:

- `source_provider()`: Returns a [SourceProvider](../../reference/api/provider#source-provider) for reading data.
- `sink_provider()`: Returns a [SinkProvider](../../reference/api/provider#sink-provider) for writing data.
- `_pulumi_provider()`: Returns a [PulumiProvider](../../reference/api/provider#pulumi-provider) for the primitive.


:::note

You are implementing the **private** **_pulumi_provider** method. Not the public version.

:::


Each of these methods should return an instance of the provider class that implements the corresponding interface.

:::tip

You only need to implement the methods that you need. If your primitive only supports reading data you only need to implement the `source_provider()` method, or if your primitive only supports writing data you only need to implement the `sink_provider` method. Similarly if your provider does not support pulumi you do not need to implement the `_pulumi_provider` method.

:::


Example:

```python
@dataclass
class CustomPrimitive(GCPPrimitive):
    input_field1: str
    input_field2: str

    def source_provider(self):
        return CustomPrimitiveProvider(input_field1=self.input_field1, input_field2=self.input_field2)

    def sink_provider(self):
        return CustomPrimitiveProvider(input_field1=self.input_field1, input_field2=self.input_field2)

    def _pulumi_provider(self):
        return CustomPrimitiveProvider(input_field1=self.input_field1, input_field2=self.input_field2)

```

## Implement the Provider Interfaces

To define a custom provider you can implement any of the following interfaces:

- [SourceProvider](../../reference/api/provider#source-provider)
- [SinkProvider](../../reference/api/provider#sink-provider)
- [PulumiProvider](../../reference/api/provider#pulumi-provider)


### Source Provider

The source provider should implement the `source` method which returns a [SourceStrategy](#source-strategy) implementation that defines how to read from a source. If your primitive does not support reading in data (e.g. it is only a sink), feel free to raise a `NotImplementedError` in this method.

Example:

```python

class CustomPrimitiveProvider(SourceProvider, PulumiProvider, SinkProvider):
    ...

    def source(self, credentials: CredentialType) -> SourceStrategy:
            return CustomPrimitiveSource(credentials=credentials)
    ...

```

:::note

The `source` method receives a [credentials object](../../reference/api/credentials) that is specific to the cloud (or empty if the primitive is not cloud specific). What credentials a provider is given depends on the `PrimitiveType` determined by your `Primitive` implementation.

:::

### Sink Provider

The sink provider should implement the `sink` method which returns a [SinkStrategy](#sink-strategy) implementation that defines how to write data to a sink. If your primitive does not support writing in data (e.g. it is only a source), feel free to raise a `NotImplementedError` in this method.

Example:

```python

class CustomPrimitiveProvider(SourceProvider, PulumiProvider, SinkProvider):
    ...

    def sink(self, credentials: CredentialType) -> SinkStrategy:
            return CustomPrimitiveSink(credentials=credentials)
    ...

```

:::note

The `sink` method receives a [credentials object](../../reference/api/credentials) that is specific to the cloud (or empty if the primitive is not cloud specific). What credentials a provider is given depends on the `PrimitiveType` determined by your `Primitive` implementation.

:::

### Pulumi Provider

The pulumi provider should implement the `pulumi_resource` method which returns a single [pulumi.ComponentResource](https://www.pulumi.com/docs/concepts/resources/components/) that defines what resources to create/manage/destroy in pulumi.

The `pulumi_resource` method takes in an optional `type_` argument which is either the output type the pipeline will be sending to the primitive if it is a sink, or it is the input type the pipeline expects to receive from the primitive if it is a source. This can be used to determine the expected schema of any resources that need to be created in pulumi (e.g. the schema of a BigQuery table).

The `pulumi_resource` method also receives a [credentials object](../../reference/api/credentials) that is specific to the cloud (or empty if the primitive is not cloud specific). What credentials a provider is given depends on the `PrimitiveType` determined by your `Primitive` implementation.

Finally the `pulumi_resource` methods receives a `opts` object of type `pulumi.ResourceOptions` which can should be passed in to your `ComponentResource` super constructor.

Example:

```python

class CustomResource(pulumi.ComponentResource):

    def __init__(self, opts: pulumi.ResourceOptions = None):
        super().__init__(
            "buildflow:custom_resource:CustomResource",
            "buildflow-a-unique-id",
            None,
            opts,
        )

        outputs = {}

        self.resource = pulumi.SomeResource(
            resource_name="a-unuque-name",
            opts=pulumi.ResourceOptions(parent=self),
        )

        outputs["custom.resource.id"] = self.resource.id
        # TIP: This will help the LaunchFlow VSCode extension automatically display useful urls.
        outputs["buildflow.cloud_console.url"] = "TODO"

        self.register_outputs(outputs)

class CustomPrimitiveProvider(SourceProvider, PulumiProvider, SinkProvider):
    ...

    def pulumi_resource(
        self,
        type_: Optional[Type],
        credentials: Union[AWSCredentials, GCPCredentials],
        opts: pulumi.ResourceOptions,
    ) -> pulumi.ComponentResource:
        return CustomResource(opts=opts)
    ...

```

## Implement the Strategy Interfaces

Strategies define the actual logic for reading or writing data.

### Source Strategy

Source strategies should implement the [`SourceStrategy`](../../reference/api/strategy#source-strategy) interface.

Methods:

- **async def pull**: Pulls data from the source and returns a list of records. Returns a `PullResponse` object containing the payload and information for acknowledging the data from the source. The information for acknowleding will be sent to the `ack` method.
- **async def ack**: Acknowledges that a pull has been successfully processed by the pipeline. The `ack` method receives the `ack_info` object returned by the `pull` method.
- **async def backlog**: Returns the number of records that are currently in the source but have not been pulled yet. This information is used to scale up the number of replicas pulling from the source.
- **def max_batch_size**: The maximum number of elements that can be returned by a call to pull.
- **def pull_converter**: Returns a function that can be used to convert the payload returned by the `pull` method into the data the user expects. For example this may return a function that converts the payload into dataclass.

Example:

```python

class CustomAckInfo(AckInfo):
    pass

class CustomPrimitiveSource(SourceStrategy):

    async def pull(self) -> PullResponse:
        return PullResponse(
            payload=[1, 2, 3],
            ack_info=CustomAckInfo(),
        )

    async def ack(self, to_ack: AckInfo, success: bool):
        return

    async def backlog(self) -> int:
        return 0

    def max_batch_size(self) -> int:
        return -1

    def pull_converter(self, user_defined_type: Type) -> Callable[[Any], Any]:
        return converters.identify()

```

### Sink Strategy

Sink strategies should implement the [`SinkStrategy`](../../reference/api/strategy#sink-strategy) interface.

Methods:
- **async def push**: Pushes data to the sink.
- **def push_converter**: Returns a function that can be used to convert the payload returned by the users pipeline into the data type that is expected by the sink.

Example:

```python

class CustomPrimitiveSink(SinkStrategy):
    async def push(self, batch: Batch):
        print("pushing data: ", batch)

    def push_converter(self, user_defined_type: Type) -> Callable[[Any], Any]:
        return converters.identify()

```

# Using Your Custom Primitive

Once complete you can plug your custom primitive directly into the `app.pipeline` decorator.

```python
@app.pipeline(source=CustomPrimitive(), sink=CustomPrimitive())
def my_pipeline():
    ...
```