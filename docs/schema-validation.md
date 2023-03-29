---
sidebar_position: 5
---

# Schema Validation

BuildFlow uses python type hits and dataclasses to ensure that that output of your processor matches the schema defintion of your sink (for supported sinks). This can be useful for catching schema mis-match errors before you even launch your pipeline.

## Supported Types:

Currently we support the following types:

- All python primitive types
- `datetime.datetime` -> TIMESTAMP
- `datetime.date` -> DATE
- `datetime.time` -> TIME
- List[...] -> Repeated
- Optional[...] -> Nullable

## Examples

In the below example we define a dataclass `MySchema` and use type hints to tell BuildFlow what our processor is returning. Before your pipeline launches we'll validate that the dataclass definition matches your output BigQuery table, and if the table doens't exist we'll create it for you!

The below example also highlights how you can use `List` and `Optional` to specify whether your field is repeated or optional, and you can also nest dataclasses for a nested field.

```python
flow = Flow()

input_sub = buildflow.PubSubSource(...)
output_table = buildflow.BigQuerySink(...)

@dataclass
class NestedSchema:
    nested_field: float

@dataclass
class MySchema:
    num_field: int
    optional_field: Optional[str]
    repeated_field: List[str]
    nested_field: NestedSchema

@flow.processor(source=input_sub, sink=output_table)
def process(element: Dict[str, Any]) -> MySchema:
    return element
```
