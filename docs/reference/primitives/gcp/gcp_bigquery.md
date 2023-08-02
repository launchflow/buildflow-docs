# Google Cloud BigQuery

## BigQueryTable

`BigQueryTable` is a **sink** that can be use to write data to a BigQuery table. To create a `BigQueryTable` simply provide:

- `project_id` **required**: The name of the GCP project the table exists in
- `dataset_name` **required**: The name of the dataset the table exists in
- `table_name` **required**: The name of the table 

```python
from buildflow.io.gcp import BigQueryTable

@app.pipeline(source=...,
    sink=BigQueryTable(
        project_id="project",
        dataset_name="dataet",
        table_name="table"))
    ...
```

### Types

The `BigQueryTable` sink expects an object that can be serialized in to a JSON object. You can return a `dataclass` and we will automatically serialize it for you, or you can return a dictionary containing JSON serializable objects.

If you would like to return a custom type that is not JSON serializable you can implement the `to_json` method on your class and we will use that to serialize your object.

```python
class CustomType:
    def __init__(self, b: int):
        self.b = str

    def to_json(self):
        return {"b": self.b}

@app.pipeline(source=..., sink=BigQueryTable(...))
async def my_processor(elem: int) -> CustomType:
    return CustomType(b=elem + 1)
```

### Resource Creation

If you are using BuildFlow's built in resource creation/management you can use the `BigQueryTable` primitive to create a Pub/Sub topic in your provided project.

#### Configuration Options

You can provide the following options to control resource management of the BigQuery table:
- `managed`: Whether or not the topic is managed by BuildFlow. Defaults to `False`.
- `dataset_managed`: Whether or not the dataset should be included in resource management / creation. Defaults to `True`.
- `destroy_projection`: Whether or not the dataset should be destroyed when the `buildflow destroy` is run. Defaults to `False`.

```python
BigQueryTable(...).options(managed=True, destroy_projection=True, dataset_managed=True)
```