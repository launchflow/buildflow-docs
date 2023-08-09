# Google Cloud Storage

`GCSBucket` is a sink primitive that can be used to write various files to a GCS bucket. To create a `GCSBucket` provide:

Description of the primitive. Folowed by arguments:

- `project_id` **required**: The project ID where the GCS bucket lives
- `bucket_name` **required**: The name of the bucket
- `file_path` **required**: The file path to write to
- `file_format` **required**: The file format to write valid options are: JSON, CSV, and PARQUET

Example usage:

```python
from buildflow.io.gcp import GCSBucket

@app.pipeline(source=..., sink=GCSBucket(
    project_id="project",
    bucket_name="bucket",
    file_path="path/to/file_in_bucket",
    file_format="PARQUET")
)
```

:::

## Types
The `GCSBucket` sink expects an object that can be serialized in to a JSON object. You can return a `dataclass` and we will automatically serialize it for you, or you can return a dictionary containing JSON serializable objects.

If you would like to return a custom type that is not JSON serializable you can implement the `to_json` method on your class and we will use that to serialize your object.

```python
class CustomType:
    def __init__(self, b: int):
        self.b = str

    def to_json(self):
        return {"b": self.b}

@app.pipeline(source=..., sink=GCSBucket(...))
async def my_processor(elem: int) -> CustomType:
    return CustomType(b=elem + 1)
```

## Resource Creation

If you are using BuildFlow's built in resource creation/management you can use the `GCSBucket` primitive to create a GCS Bucket in your provided project.


## Configuration Options

You can provide the following options to control resource management of the GCS bucket:

- `managed`: Whether or not the topic is managed by BuildFlow. Defaults to `False`.
- `force_destroy`: If true destroy will fail if the bucket contains objects. Defaults to `False`.
- `bucket_region`: The region to create the bucket it.


```python
primitive = GCSBucket(...).options(managed=True, force_destroy=True, bucket_region="US")
```
