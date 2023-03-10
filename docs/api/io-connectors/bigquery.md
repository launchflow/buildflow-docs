---
sidebar_position: 3
---

# BigQuery - Batch

**BigQuery** refers to Google's BigQuery data warehouse. It is a **batch** source connector.

Tables / Query outputs are sent to the processor as a [Ray Dataset](https://docs.ray.io/en/latest/data/dataset.html).

You can return either a list of dicts or a Ray Dataset from your processor.

:::tip

You can speed up your reads by increasing the number of replicas: i.e. **flow.run(num_replicas=4)**

:::

## Class Definition

```python
class BigQuery(IO):
    # format: `{$PROJECT_ID}.{$DATASET_NAME}.{$TABLE_NAME}`
    table_id: str
    # (source arg): The SQL query to execute
    query: str
    # The temporary dataset to store query results in.
    # If unspecified we will attempt to create one.
    temp_dataset: str
    # The billing project to use for query usage.
    # If unspecified we will use the project configured with application default credentials.
    billing_project: str
    # The temporary gcs bucket uri to store temp data in.
    # If unspecified we will attempt to create one.
    temp_gcs_bucket: str
```

## Example Usage

### BigQuery to local process

```python
@flow.processor(
    source=BigQuery(table_id='...'),
)
def process(dataset: ray.data.Dataset):
    # TODO: process dataset
    return dataset

output = flow.run(num_replicas=4)
```

In this example, the table is read in parallel by 4 replicas and sent to the processor.

The dataset will be sent back to the process that launched the job (via output = flow.run(...))

---

### BigQuery to BigQuery

```python
@flow.processor(
    source=BigQuery(query='SELECT * FROM `...` GROUP BY 1'),
    sink=BigQuery(table_id='...'),
)
def process(dataset: ray.data.Dataset):
    # TODO: process dataset
    return dataset
```

In this example, a query is executed on BigQuery and the results are sent to the processor as a ray Dataset.

The output is appended to another BigQuery table.
