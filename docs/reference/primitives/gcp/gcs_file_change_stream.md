# GCS File Change Stream

`GCSFileChangeStream` is a source primitive that can be used to subscribe to file changes on a given GCS bucket. To create a `GCSFileChangeStream` provide:
- `gcs_bucket` **required**: [GCSBucket](gcp_storage) to subscribe to change events from. NOTE: you do not need to provide file path or file format.
- `event_types`: List of event types to subscribe to. Defaults to: `[GCSChangeStreamEventType.OBJECT_FINALIZE]`

```python

from buildflow.io.gcp import GCSBucket, GCSFileChangeStream
from buildflow.types.gcp import GCSFileChangeEvent

@app.pipeline(source=GCSFileChangeStream(
    gcs_bucket=GCSBucket("project", bucket_name="my-bucket")), sink=...)
def pipeline(elem: GCSFileChangeEvent):
    ...
```

With managed bucket:

```python

from buildflow.io.gcp import GCSBucket, GCSFileChangeStream
from buildflow.types.gcp import GCSFileChangeEvent

@app.pipeline(source=GCSFileChangeStream(
    gcs_bucket=GCSBucket("project", bucket_name="my-bucket").options(managed=True)), sink=...)
def pipeline(elem: GCSFileChangeEvent):
    ...
```

With event types:

```python
from buildflow.io.gcp import GCSBucket, GCSFileChangeStream
from buildflow.types.gcp import GCSFileChangeEvent, GCSChangeStreamEventType

@app.pipeline(source=GCSFileChangeStream(
    gcs_bucket=GCSBucket("project", bucket_name="my-bucket"),
    event_types=[GCSChangeStreamEventType.OBJECT_FINALIZE, GCSChangeStreamEventType.OBJECT_DELETE]), sink=...)
def pipeline(elem: GCSFileChangeEvent):
    ...
```

## Types

The `GCSFileChangeStream` source always returns a `GCSFileChangeEvent` object. This object contains the following fields:

- `metadata`: any metadata that was associated with the file change event. This is a dictionary of strings.
- `blob`: The raw contents of the file. This is lazily fetched.

## Resource Creation

If you are using BuildFlow's built in resource creation/management you can use the `GCSFileChangeStream` primitive type to create and manage all resources that are need to subscribe to a GCS bucket.

The following resources will be created:
- GCP PubSub Topic
- GCP PubSub Subscription
- GCP Bucket Notification
- GCS Bucket
- IAM permissions for GCS service account
