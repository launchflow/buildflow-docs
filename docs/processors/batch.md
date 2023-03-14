---
sidebar_position: 2
---

# Batch

A batch processor is any processor the consumes a bounded set of data, such as a BigQuery table or SQL query. If your processor is consuming a bounded source the processor will automatically be turned into a batch pipeline.

Example:

```python
@flow.processor(
    source=BigQuery(table_id='...'),
)
def process(dataset: ray.data.Dataset):
    # TODO: process dataset
    return dataset

output = flow.run(num_replicas=4)
```

Batch mode is built on top of the [Ray Dataset API](https://docs.ray.io/en/latest/data/api/api.html), and your processor will be given a Ray Dataset that contains the data from your source. You can return a Ray Dataset, python dictionaries, or python dataclasses. If you return a python dataclass you can take advantage of our automatic [schema validation](../schema-validation.md).