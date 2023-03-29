---
sidebar_position: 1
---

# Overview

The **Processor API** is the primary abstraction provided by **BuildFlow**. It contains all of the user's processing logic between the [IO Connectors](io-connectors/overview.md). Processors come in two different flavors: [streaming](./streaming.md) and [batch](./batch.md). The main difference between the two is that in batch mode you operate on a [Ray DataSet](https://docs.ray.io/en/latest/data/dataset.html), and in streaming mode you operate on individual elements.

The return type of your process determines what will be written to your sink. In batch mode you can return a Ray Dataset, python dictionaries, or python dataclasses. In streaming mode you can return python dictionaries or python dataclasses. If you return a python dataclass you can take advantage of our automatic [schema validation](../schema-validation.md).

:::tip

There should be _little to no_ I/O logic in the processor.

:::

## How to create a Processor

A processor can be created using either the **processor** decorator, or **Processor** class.

### processor decorator

```python
from buildflow import Flow
from ray.data import Dataset

flow = Flow()

@flow.processor(source=buildflow.BigQuerySource(query='...'))
def process_dataset(bigquery_dataset: Dataset):
    ...

flow.run().output()

```

### Processor class

```python
import buildflow
from buildflow import Flow

flow = Flow()

class MyProcessor(buildflow.Processor):

    def source(self):
        return buildflow.PubSubSource(subscription='...')

    def process(self, message_data: Dict[str, Any]):
        ...

flow.run(MyProcessor()).output()

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
    return buildflow.PubSubSource(subscription='...')

```

### sink

This **sink** method defines the output reference for the processor.

```python
import buildflow

class MyProcessor:
  ...

  def sink() -> buildflow.IO:
    return buildflow.BigQuerySink(table_id='...')

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
