# Pipeline Options

Pipelines can be individually configured for different resource requirements:

The following options are available:
- **num_cpus** - how many CPUs should be allocated to the processor. This can be any floating point number > 0. Defaults to 1.
- **num_concurrent_tasks** - number of current tasks to read from your source with. Defaults to 1.
- **log_level** - log level for the processor. Defaults to `logging.INFO`.
- [**autoscale_options**](../processors/auto-scaling-options): options for configuring autoscaling for this pipeline.

## Example


Decorator example:
```python
@app.pipeline(source=..., sink=..., num_cpus=2, num_concurrent_tasks=2, log_level=logging.DEBUG, autoscaling_options=...)
def my_processor():
    ...
```
