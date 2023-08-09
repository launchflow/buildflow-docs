# File

`File` is a sink primitive that can be used to write data to a file. The sink primitive takes in a file path and will create one unique file per replica. To create a `File` provide the 
- `file_path` **required**: the base path of the file to write to. We will take this path and generate a unique file path for each replica in the following format: `{file_path}-{uuid}.{extension}` 
- `file_format` **required**: format of the file 
    - The supported formats are:
        - JSON
        - CSV
        - parquest

```python
from buildflow.io.local import File

@app.pipeline(source=..., sink=File(file_path="path.csv", file_format="csv"))
def process(elem: MyType):
    ...
```

## Types

The `File` sink expects an object that can be serialized in to a JSON object. You can return a `dataclass` and we will automatically serialize it for you, or you can return a dictionary containing JSON serializable objects.

If you would like to return a custom type that is not JSON serializable you can implement the `to_json` method on your class and we will use that to serialize your object.

```python

class CustomType:
    def __init__(self, b: int):
        self.b = str

    def to_json(self):
        return {"b": self.b}

@app.processor(source=ResourceType(...), sink=Files(...))
async def my_processor(elem: int) -> CustomType:
    return CustomType(b=elem + 1)
```