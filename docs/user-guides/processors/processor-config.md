# Processor Configuration

Processors can be individually configured for different resource requirements:

The following potions are:
- **num_cpus** - how many CPUs should be allocated to the processor. This can be any floating point number > 0. Defaults to 1.
- **num_concurrent_tasks** - number of current tasks to read from your source with. Defaults to 1.
- **log_level** - log level for the processor. Defaults to `logging.INFO`.
- **autoscaler_config** - The config for autoscaling your node's processors. Read more [here](#autoscale-config)

## Autoscale Config
This configuration is used to configure the autoscaler for your processor. If it is not set it will default to the nodes autoscaler config. The following options are available:
- **enable_autoscaler**: Whether or not autoscaling should be turned on. Defaults to True.
- **min_replicas**: The minimum number of replicas to run.
- **max_replicas**: The maximum number of replicas to run.

## Example


Decorator example:
```python
@app.processor(source=..., sink=..., num_cpus=2, num_concurrent_tasks=2, log_level=logging.DEBUG)
def my_processor():
    ...
```

Class example:
```python
class MyProcessor(Processor):
    def process(self, item):
        ...

app.add(MyProcessor(), num_cpus=2, num_concurrent_tasks=2, log_level=logging.DEBUG)
```
