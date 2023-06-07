---
sidebar_position: 1
---

# Runtime

A Batch Processor is any processor the consumes a bounded set of data, such as a BigQuery table or SQL query.

Example:

```python
@app.processor(
    source=BigQuerySource(table_id='...'),
)
def process(dataset: ray.data.Dataset):
    # TODO: process dataset
    return dataset

output = app.run()
```

Batch mode is built on top of the [Ray Dataset API](https://docs.ray.io/en/latest/data/api/api.html), and your processor will be given a Ray Dataset that contains the data from your source. You can return a Ray Dataset, python dictionaries, or python dataclasses. If you return a python dataclass you can take advantage of our automatic [schema validation](../schema-validation.md).
