---
sidebar_position: 3
---

# BigQuery

**BigQuery** refers to Google's BigQuery data warehouse. It is a **batch** source connector, and can be used in both **streaming** and **batch** as a sink connector.

BigQuery also supports output schema validation. You can find more information about schema validation [here](../schema-validation.md).

## Source Class Definition

```python
class BigQuerySource(io.Source):
    """Source for reading data from BigQuery."""
    # The BigQuery table to read from.
    # Should be of the format project.dataset.table
    # One and only one of table_id and query should be provided.
    table_id: str = ''
    # The query to read data from.
    # One and only one of table_id and query should be provided.
    query: str = ''
    # The temporary dataset to store query results in. If unspecified we will
    # attempt to create one.
    temp_dataset: str = ''
    # The billing project to use for query usage. If unset we will use the
    # project configured with application default credentials.
    billing_project: str = ''
```

## Sink Class Definition

```python
class BigQuerySink(io.Sink):
    """Sink for writing data to BigQuery."""
    # The BigQuery table to read from.
    # Should be of the format project.dataset.table
    table_id: str
    # The temporary gcs bucket uri to store temp data in. This is only used in
    # batch mode.
    temp_gcs_bucket: str = ''
    # The billing project to use for usage. If unset we will use the
    # project configured with application default credentials.
    billing_project: str = ''
```

## Example Usage

### BigQuery to local process

```python
@flow.processor(
    source=BigQuerySource(table_id='...'),
)
def process(dataset: ray.data.Dataset):
    # TODO: process dataset
    return dataset

output = flow.run()
```

In this example, the table is read in and sent to the processor.

The dataset will be sent back to the process that launched the job (via output = flow.run(...))

---

### BigQuery to BigQuery

```python
@flow.processor(
    source=BigQuerySource(query='SELECT * FROM `...` GROUP BY 1'),
    sink=BigQuerySink(table_id='...'),
)
def process(dataset: ray.data.Dataset):
    # TODO: process dataset
    return dataset
```

In this example, a query is executed on BigQuery and the results are sent to the processor as a ray Dataset.

The output is appended to another BigQuery table.
