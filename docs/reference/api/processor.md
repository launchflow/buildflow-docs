---
sidebar_position: 1
---

# Processor API

The **Processor API** is the primary abstraction provided by **BuildFlow**. It contains all of the user's processing logic between the [IO Providers](./providers/base).

A processor is composed of:
- A `source` resource type
- A `sink` resource type
- Your processing logic

Your `source` is a `ResourceType` that defines how data should be retrieved and sent to your processor.

Your `sink` is a `ResourceType` that defines how data should be sent to your resource from your processor.

:::tip

There should be _little to no_ I/O logic in the processor.

:::

## How to create a Processor

A Processor can be created using either the **processor** decorator, or the **Processor** class.

### @processor decorator

```python
from buildflow import Node
from buildflow.io import 

app = Node()

@app.processor(source=GCPPubSubSubscription(...))
async def process(...):
    ...

if __name__ =="__main__":
    app.run()
```

### Processor class

```python
from buildflow import Node, Processor
from buildflow.io import GCPPubSubSubscription

app = Node()

class MyProcessor(Processor):

    def source(self):
        return GCPPubSubSubscription(...)

    async def process(self, ...):
        ...

app.add_processor(MyProcessor())

if __name__ =="__main__":
    app.run()
```

:::note

The **processor** decorator and the **Processor** class are functionally equivalent. The **processor** decorator is just a convenience wrapper around the **Processor** class.

:::

### Async Processors

:::tip

**TL:DR;** If you are using any libraries that require you to use `await`. You should make your processor async.

:::

You can easily make your processor async by including `async` in your definition. This will run your processor in an asyncio runtime allowing you even more flexibility in your processing logic. Most notably this will allow you to use any async libraries such as [Ray AsyncIO](https://docs.ray.io/en/latest/ray-core/actors/async_api.html).

```python

@ray.remote
def long_running_task(...):
  time.sleep(10)

@app.processor(...)
async def stream_processor(...):
  return await long_running_task.remote(...)
```

## Lifecycle Methods

The **Processor API** contains 3 lifecycle methods that are executed by the runtime: **_source_**, **_sink_**, & **_setup_**

### source

This **source** method defines the input reference for the processor.

```python
import buildflow
from buildflow.io import GCPPubSubSubscription

class MyProcessor:
  ...

  def source(self) -> buildflow.IO:
    return GCPPubSubSubscription('...')

```

### sink

This **sink** method defines the output reference for the processor.

```python
import buildflow
from buildflow.io import BigQueryTable

class MyProcessor:
  ...

  def sink() -> buildflow.IO:
    return BigQueryTable(table_id='...')

```

### setup

This **setup** method contains any _non-serializable_ dependencies that need to be initialized _for each replica_.

The **\_\_init\_\_** method is called before the Processor is sent to the runtime. The runtime invokes the **setup** method on each Processor replica after it is created.

:::note

Most non-serializable objects are clients & loaded models.

**bigquery.Client(...), keras.Model(...), etc...**

:::

```python
import buildflow
from tensorflow import keras
from google.cloud import storage

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
