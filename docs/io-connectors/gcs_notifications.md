# Google Cloud Storage Notifications

The GCS Notification source subscribes to changes to a Google Cloud Storage bucket. This source is a streaming source. You provide the source with the GCP project and the GCS bucket you would like to listen to and BuildFlow will configure your pipeline to listen to changes. It does this by setting up a Pub/Sub topic and subscriber that will listen to changes on the bucket. If you have already configured a topic and subscriber for this you can also manually pass those.

:::caution

There is a known edge case with the automatic GCS setup. This will be fixed in the next major release (coming March 31, 2023). It is recommended that you manually set up your GCS notifications for now.

:::

## Source Output Type

The GCS notification source will return a `GCSFileEvent` object with the following fields:

- `metadata`: A dictionary of metadata about the events
- `blob`: Fetches the binary contents of the file

:::note

`blob` is fetched lazily so if you do not call it the binary contents will not be retrieved.

:::

## Source Class Definition

```python
class GCSFileNotifications(io.Source):
    bucket_name: str
    project_id: str
    # The pubsub topic that is configured to point at the bucket. If not set
    # we will create one.
    pubsub_topic: str = ''
    # The pubsub subscription that is configure to point at the bucket. If not
    # set we will create one.
    pubsub_subscription: str = ''
    # The event types that should trigger the stream. This is only used if we
    # are attaching a new notification listener to your bucket. Defaults to
    # only new uploads. If set to None will listen to all uploads.
    event_types: Optional[List[str]] = ('OBJECT_FINALIZE', )
```

### Example Usage

### GCS Notifications to BigQuery

```python
input_sub = buildflow.GCSFileStream(
    bucket_name='bucket-name',
    project_id='gcp-project')
output_table = buildflow.BigQuerySink(table_id='project.dataset.ttable')

flow = Flow()

@flow.processor(source=input_sub, sink=output_table)
def process(element: GCSFileEvent):
    return process_bytes(elemet.blob)

flow.run().output()
```
