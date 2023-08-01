# S3 File Change Stream

`S3FileChangeStream` is a source primitive that can be used to subscribe to file changes on a given S3 bucket. To create a `S3FileChangeStream` provide:
- `s3_bucket` **required**: [S3Bucket](s3) to subscribe to change events from. NOTE: you do not need to provide file path or file format.
- `event_types`: List of event types to subscribe to. Defaults to: `[S3ChangeStreamEventType.OBJECT_CREATED_ALL]`

```python

from buildflow.io.aws import S3Bucket, S3FileChangeStream
from buildflow.types.aws import S3FileChangeEvent

@app.pipeline(source=S3FileChangeStream(
    s3_bucket=S3Bucket(bucket_name="my-bucket")), sink=...)
def pipeline(elem: S3FileChangeEvent):
    ...
```

With managed bucket:

```python

from buildflow.io.aws import S3Bucket, S3FileChangeStream
from buildflow.types.aws import S3FileChangeEvent

@app.pipeline(source=S3FileChangeStream(
    s3_bucket=S3Bucket(bucket_name="my-bucket").options(managed=True)), sink=...)
def pipeline(elem: S3FileChangeEvent):
    ...
```

With event types:

```python
from buildflow.io.aws import S3Bucket, S3FileChangeStream
from buildflow.types.aws import S3FileChangeEvent, S3ChangeStreamEventType

@app.pipeline(source=S3FileChangeStream(
    s3_bucket=S3Bucket(bucket_name="my-bucket"),
    event_types=[S3ChangeStreamEventType.OBJECT_CREATED_ALL, S3ChangeStreamEventType.OBJECT_REMOVED_ALL]), sink=...)
def pipeline(elem: S3FileChangeEvent):
    ...
```

## Types

The `S3FileChangeStream` source always returns a `S3FileChangeEvent` object. This object contains the following fields:

- `metadata`: any metadata that was associated with the file change event. This is a dictionary of strings.
- `blob`: The raw contents of the file. This is lazily fetched.

## Resource Creation

If you are using BuildFlow's built in resource creation/management you can use the `S3FileChangeStream` primitive type to create and manage all resources that are need to subscribe to a S3 bucket.

The following resources will be created:
- S3 Bucket
- SQS Queue
- S3 Bucket Notification
- SQS Queue Policy
