# Infrastructure from Code

BuildFlow helps eliminate operational work by including an (optional) resource creation / management module. For most use cases, this can eliminate the need for a separate deployment tool like Terraform or from visit the cloud console.

## How it works

BuildFlow uses [Pulumi](https://www.pulumi.com) to create and manage resources. Your source and sink ResourceTypes define what resources are needed to read and write from. You can use the BuildFlow CLI to easily [create or delete](../user-guides/resource-management/overview) the defined resources.

## Example

In the below example we are reading from a pubsub subscription and writing to a bigquery table. Before launching your application you can run `buildflow plan main:app` to create the pubsub subscription and the BigQuery table. When you launch your application for the first time. Next you can run your pipeline with `buildflow run main:app` and everything will be good to go! When you are done you can run `buildflow destroy main:app` to have all resources deleted.

```python
app = Node()

input_sub = GCPPubSubSubsctiption(
    project_id='myproject',
    subscription_name='mysub',
    topic='projects/myproject/topics/mypub',
)
output_table = BigQueryTable(table_id='p.d.t')

@dataclass
class Output:
    json_dict: str

@app.processor(source=input_sub, sink=output_table)
def process(element: Dict[str, Any]) -> Output:
    return Output(json.dumps(element))
```
