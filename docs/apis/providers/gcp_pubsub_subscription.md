# GCPPubSubSubscription

**IO Providers** provide effecient I/O between popular cloud services & storage systems.

With all IO Connectors you can either provide an already provisioned resource, or just give us a path to a resource that should be created. If the resource does not exist BuildFlow will create it for you and ensure you have the proper access.

## Streaming vs Batch Connectors

All connectors can work as **streaming** and **batch** output **_sinks_**.

The Processor's input **_source_** connector determines if the **_sink_** connector should run in streaming or batch mode.

For Example:

```python
@app.processor(
    # PubSub is a streaming source
    source=PubSubSource(...),
    # The BigQuery Streaming API will be used in this case
    sink=BigQuerySink(...),
)
def process(payload: Any):
    return payload
```

```python
@app.processor(
    # BigQuery is a batch source
    source=BigQuerySink(...),
    # The BigQuery LoadJobs API will be used in this case
    sink=BigQuerySource(...),
)
def process(payload: Any):
    return payload
```

## All Available Connectors

- [AWS SQS - Streaming Source](io-providers/aws_sqs.md)
- [Google Cloud Pub/Sub - Streaming Source](io-providers/gcp_pubsub.md)
- [Google Cloud Storage Notifications - Streaming Source](io-providers/gcs_notifications.md)
- [Google Cloud BigQuery - Batch Source](io-providers/gcp_bigquery.md)
