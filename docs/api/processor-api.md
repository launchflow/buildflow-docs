---
sidebar_position: 2
---

# Processor API

The **Processor API** is the primary abstraction provided by **BuildFlow**. It contains all of the user's processing logic between the [IO Connectors](io-connectors/overview.md).

:::note

There should be _little to no_ I/O logic in the processor.

:::

## How to create a Processor

A processor can be created using either the **processor** decorator, or **Processor** class.

### processor decorator

```python
from buildflow import Flow
from ray.data import Dataset

flow = Flow()

@flow.processor(source=buildflow.BigQuery(query='...'))
def process_dataset(bigquery_dataset: Dataset):
    ...

flow.run(num_replicas=1)

```

### Processor class

```python
import buildflow
from buildflow import Flow

flow = Flow()

class MyProcessor(buildflow.Processor):

    def source(self):
        return buildflow.PubSub(subscription='...')

    def process(self, message_data: Dict[str, Any]):
        ...

flow.run(MyProcessor, num_replicas=1)

```

## Lifecycle Methods

The **Processor API** contains 3 lifecycle methods that are executed by the runtime: **_source_**, **_sink_**, & **_setup_**

### source

This **source** method defines the input reference for the processor.

```python
import buildflow

class MyProcessor:
  ...

  def source(self) -> buildflow.IO:
    return buildflow.PubSub(subscription='...')

```

### sink

This **sink** method defines the output reference for the processor.

```python
import buildflow

class MyProcessor:
  ...

  def source() -> buildflow.IO:
    return buildflow.BigQuery(table_id='...')

```

### setup

This **setup** method contains any _non-serializable_ dependencies that need to be initialized _for each worker_.

The **\_\_init\_\_** method is called before the Processor is sent to the runtime. The runtime invokes the **setup** method on each Processor replica after it is created.

:::note

The most commonly used non-serializable objects are clients & loaded models.

**bigquery.Client, keras.Model, etc...**

:::

```python
import buildflow
from tensorflow import keras

class MyProcessor:

  def __init__(self):
    # Serializable fields can go in the __init__ method
    self.model_path = 'path/to/location'
    self.bucket_uri = 'gs://bucket_id'

  def setup(self) -> buildflow.IO:
    # Non-serializable fields go in the setup method
    self.my_model = keras.models.load_model(self.model_path)
    self.storage_client = storage.Client(self.bucket_uri)

```
