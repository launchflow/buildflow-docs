---
sidebar_position: 1
---

# Processor API

The Processor API is the main abstraction provided by BuildFlow. It contains all of the user's processing logic; There should be little to no IO logic in the processor.

## Lifecycle Methods

A Processor contains 3 lifecycle methods that are executed by the runtime: **source()**, **sink()**, & **setup()**

### source

This **source** static method defines the input reference for the processor.

```python
import buildflow

class MyProcessor:
  ...

  @staticmethod
  def source() -> buildflow.IO:
    return buildflow.PubSub(subscription='...')

```

### sink

This **sink** static method defines the output reference for the processor.

```python
import buildflow

class MyProcessor:
  ...

  @staticmethod
  def source() -> buildflow.IO:
    return buildflow.BigQuery(table_id='...')

```

### setup

This **setup** method contains any dependencies that need to be initialized **for each worker**. There are many python objects that are not serializable (eg: bigquery.Client) and thus need to be created after \***\*init\*\***.

```python
import buildflow
from tensorflow import keras

class MyProcessor:
  ...

  def setup(self) -> buildflow.IO:
    self.my_model = keras.models.load_model('path/to/location')

```
