---
sidebar_position: 4
---

# Resource Creation

BuildFlow helps to eliminate all the operational work of writing data pipelines by including resource management as part of your data pipeline.

When you define you flow you specify what resources you want to read from and write to. Then when you launch your pipeline BuildFlow will actually create the necessary resources (if they don't exist) and ensure that everything is set up correctly (authentication, schema matching, etc..)

## Example

In the below example we are reading from a pubsub topic and writing to a bigquery table. When you launch your pipeline for the first time. If the Pub/Sub subscription doesn't exist we will create it and point it at the correct topic. If it does exist we will validate the the user currently running the pipeline can read from the subscriber.

For the sink we will check if the table exists. If it doesn't we will create it with a schema that matches your output type defined by python type hints. If it does exist we will ensure your output type matches the already configured schema and will validate that you have access to write to the table. You can find more information about schema validation [here](schema-validation).

```python
flow = Flow()

input_sub = buildflow.PubSubSource(
    subscription='projects/myproj/subscriptions/mysub',
    topic='projects/myproject/topics/mypub',
)
output_table = buildflow.BigQuerySink(table_id='p.d.t')

@dataclass
class NestedSchema:
    nested_field: float

@dataclass
class MySchema:
    num_field: int
    optional_field: Optional[str]
    repeated_field: List[str]
    nested_field: float

@flow.processor(source=input_sub, sink=output_table)
def process(element: Dict[str, Any]) -> MySchema:
    return element
```