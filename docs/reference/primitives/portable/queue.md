# Queue

`Queue` is a sink and source [portable primitive type](../../../user-guides/primitives/portable.md) that can be used to write and read data from a cloud agnostic queue.

- `queue_id` **required**: the unique identifier for the queue

:::note

The `AnalysisTable` portable primitive is currently only supported on GCP and AWS.

:::

Example source usage:

```python
from buildflow.io.portable import Queue

@app.pipeline(source=Queue(queue_id="..."), sink=..)
```

Example sink usage:

```python
from buildflow.io.portable import Queue

@app.pipeline(sink=..., sink=Queue(queue_id="..."))
```

## Types
For primitive types we encourage you to use a type that can be serialized no matter what cloud provider you such as a `dataclass` or a `dict`.

If you cannot for whatever reason. Please refer to the cloud specific queue implementations for what type should be used:

- AWS -> [SQS](../aws/sqs)
- GCP -> [Pub/Sub](../gcp/gcp_pubsub)

## Resource Creation

What resources are created depends on what is in your `cloud_provider_config.yaml`.

- AWS -> [SQS](../aws/sqs)
- GCP -> [Pub/Sub](../gcp/gcp_pubsub)
