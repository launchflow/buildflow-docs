---
sidebar_position: 4
---

# Resource Creation

BuildFlow helps eliminate operational work by including an (optional) resource creation / management module. For most use cases, this can eliminate the need for a separate deployment tool like Terraform.

## How it works

When your app is launched, BuildFlow will automatically create (if they don't exist) any resources that your Processor depends on and will ensure that everything is set up correctly (authentication checks, schema diff checks, etc..)

## Example

In the below example we are reading from a pubsub topic and writing to a bigquery table. When you launch your application for the first time. If the Pub/Sub subscription doesn't exist, BuildFlow will create it and point it at the correct topic. If it does exist, BuildFlow will validate that you are allowed to read from the subscription.

For the sink, BuildFlow will check if the table exists. If it doesn't, BuildFlow will create it with a schema that matches your output's type as defined by python type hints. If it does exist, BuildFlow will ensure your output type matches the table's schema and will validate that you have access to write to the table. You can find more information about schema validation [here](schema-validation).

```python
app = Node()

input_sub = PubSubSource(
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

@app.processor(source=input_sub, sink=output_table)
def process(element: Dict[str, Any]) -> MySchema:
    return element
```
