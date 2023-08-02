# DuckDB

`DuckDB` is a **sink** that can be use to write data to a DuckDB table. To create a `DuckDB` simply provide:

- `database` **required**: The name of the DuckDB database the table exists in
- `table` **required**: The name the table

```python
from buildflow.io.duckdb import DuckDB

@app.pipeline(source=...,
    sink=DuckDB(
        database="database",
        table="table"))
    ...
```

## Types

The `DuckDB` sink expects an object that can be serialized in to a JSON object. You can return a `dataclass` and we will automatically serialize it for you, or you can return a dictionary containing JSON serializable objects.

If you would like to return a custom type that is not JSON serializable you can implement the `to_json` method on your class and we will use that to serialize your object.

```python
class CustomType:
    def __init__(self, b: int):
        self.b = str

    def to_json(self):
        return {"b": self.b}

@app.pipeline(source=..., sink=DuckDB(...))
async def my_processor(elem: int) -> CustomType:
    return CustomType(b=elem + 1)
```
