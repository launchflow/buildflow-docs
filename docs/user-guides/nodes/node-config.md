# Node Configuration

The Node object takes two optional configuration objects, one for configuring the infrastructure and one for configuring the runtime.

## Runtime Config

The Runtime Config controls how the node should operate when it is run. All options are optional and have reasonable defaults. Your options are:

- **autoscale_config** - The default config for autoscaling your node's processors. All processors for your node will share this unless they set their own. Read more [here](../processors/processor-config#autoscale-config)
- **num_replicas** - The number of replicas to start for each processor. This can be overridden by individual processors.
- **log_level** - The log level to use for all processors in the node. Defaults to `INFO`. This can be overridden by individual processors.


```python
from buildflow import Node, RuntimeConfig, AutoscalerConfig

app = Node(runtime_config=RuntimeConfig(
    autoscaler_config=AutoScalerConfig(num_replicas=2),
    min_replicas=1,
    log_level="DEBUG"))

```

## Infra Config

:::warning

InfraConfig implementation is still in progress and will be completed in our next major release.

:::