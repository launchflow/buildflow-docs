# Google Cloud Storage

## GCS File Stream

`GCSFileStream` is a source resource type that can be used to subscribe to file uploads to a given GCS bucket. To create a `GCSFileStream` provide:
- `project_id`: GCP project where the bucket exists
- `bucket_name`: name of the GCS bucket

```python

from buildflow.io import GCSFileStream

@app.processor(source=GCSFileStream(project_id="project", bucket_name="my-bucket"), sink=...)
def process(elem: MyType):
    ...
```

### Input Type

The `GCSFileStream` source always returns a `GCSFileEvent` object. This object contains the following fields:

- `metadata`: any metadata that was associated with the file upload. This is a dictionary of strings.
- `blob`: The raw contents of the file. This is lazily fetched.

### Resource Creation

If you are using BuildFlow's built in resource creation/management you can use the `GCSFileStream` resource type to create and manage all resources that are need to subscribe to a GCS bucket.

The following resources will be created:
- GCP PubSub Topic
- GCP PubSub Subscription
- GCP Bucket Notification
- GCP Bucket (if the one you provided does not exist)
- IAM permissions for GCS service account

#### Configuration Options

The following options can be included in the `GCSFileStream` resource type to control resource management:

- `force_destroy`: If set to `True` contents of the bucket will be destroyed when the bucket is destroyed. If `False` and a file exists in the bucket the destroy operation will fail.

```python
from buildflow.io import GCSFileStream

GCSFileStream(
    project_id="project",
    bucket_name="my-bucket",
    force_destroy=True)
```