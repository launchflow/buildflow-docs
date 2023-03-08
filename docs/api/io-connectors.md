---
sidebar_position: 3
---

# IO Connectors

**IO Connectors** provide effecient I/O between popular cloud services & storage systems.

## Overview

All connectors can work as **streaming** and **batch** output ***sinks***.

The Processor's input ***source*** connector determines if the ***sink*** connector should run in streaming or batch mode.

For Example:

```python
@flow.processor(
    # PubSub is a streaming source
    source=PubSub(...),
    # The BigQuery Streaming API will be used in this case
    sink=BigQuery(...),
)
def process(payload: Any):
    return payload
```

```python
@flow.processor(
    # BigQuery is a batch source
    source=BigQuery(...),
    # The BigQuery LoadJobs API will be used in this case
    sink=BigQuery(...),
)
def process(payload: Any):
    return payload
```

## All Connectors

### PubSub

#### Source Type - Streaming

#### Class Definition

```python
class PubSub(IO):
    # format: `projects/{$PROJECT_ID}/topics/{$TOPIC_ID}`
    topic: str
    # format: `projects/{$PROJECT_ID}/subscriptions/{$SUBSCRIPTION_ID}`
    subscription: str
```

### BigQuery

#### Source Type - Batch

#### Class Definition

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

### DuckDB

#### Source Type - Batch

#### Class Definition

```python
class DuckDB(IO):
    # The name of the database to connect to
    database: str
    # The name of the table to read from / write to
    table: str = ''
    # (source arg): The SQL query to execute
    query: str = ''
```

### Redis Streams

#### Source Type - Streaming

#### Class Definition

```python
class RedisStream(IO):
    # The Redis Server's host (i.e. localhost)
    host: str
    # The Redis Server's port
    port: str
    # The list of streams to read from / write to
    streams: List[str]
    # The position in the stream to start reading from.
    # Format: {stream_id: position}
    start_positions: Dict[str, str] = dataclasses.field(default_factory=dict)
    # Read timeout. If > 0 this is how long we will block while attempting to read from the stream.
    read_timeout_secs: int = -1
```
