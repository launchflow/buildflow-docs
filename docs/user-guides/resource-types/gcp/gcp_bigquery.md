# Google Cloud BigQuery

## BigQueryTable

`BigQueryTable` is a **sink** that can be use to write data to a BigQuery table. To create a `BigQueryTable` simply provide:

- `table_id`: in the format: `project.dataset.table`.

```python
from buildflow.io import BigQueryTable

@app.processor(source=..., sink=BigQueryTable(table_id="my-project.my_dataset.my_table")) -> MyType:
    ...
```

### Expected Types

The `BigQueryTable` sink expects an object that can be serialized in to a JSON object. You can return a `dataclass` and we will automatically serialize it for you, or you can return a dictionary containing JSON serializable objects.

If you would like to return a custom type that is not JSON serializable you can implement the `to_json` method on your class and we will use that to serialize your object.

```python

class CustomType:
    def __init__(self, b: int):
        self.b = str

    def to_json(self):
        return {"b": self.b}

@app.processor(source=ResourceType(...), sink=BigQueryTable(...))
async def my_processor(elem: int) -> CustomType:
    return CustomType(b=elem + 1)
```

### Resource Creation

If you are using BuildFlow's built in resource creation/management you can use the `BigQueryTable` resource type to create a table in BigQuery. To do this you must provide a dataclass as the output of your processor and we will use that to create a BigQuery table with the corresponding schema.

Currently we support the following types in your dataclass / schema:

- All python primitive types
- `datetime.datetime` -> TIMESTAMP
- `datetime.date` -> DATE
- `datetime.time` -> TIME
- List[...] -> Repeated
- Optional[...] -> Nullable

:::tip

You can even next other dataclass to get a nested schema.

:::

#### Configuration Options

You can provide the following options to control resource management of the BigQuery table:
- `include_dataset`: Whether or not the dataset should be included in resource management / creation. Defaults to `True`.
- `destroy_projection`: Whether or not the dataset should be destroyed when the node.destroy() is called. Defaults to `True`.

```python
BigQueryTable(
    table_id="my-project.my_dataset.my_table",
    include_dataset=False, 
    destroy_projection=False)
```