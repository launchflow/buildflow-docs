---
sidebar_position: 2
---

# PubSub

**PubSub** refers to Google's Pub/Sub service. It is a **streaming** source connector.

Messages are sent to the processor 1 at a time. If you need to emit mulitple outputs, you should return an interable (list, generator, etc.)

## Source Output Type

By default the Pub/Sub source will return a dictionary containing the payload of the Pub/Sub message. If you set `include_attributes` to true, you will get a `PubsubMessage` object instead with the following definition:

```python
class PubsubMessage:
    data: Dict[str, Any]
    attributes: Dict[str, Any]
```

## Source Class Definition

```python
class PubSubSource(io.Source):
    # The pubsub subscription to read data from.
    subscription: str
    # The topic to connect to for the subscription. If this is provided and
    # subscription does not exist we will create it.
    topic: str = ''
    # Whether or not to include the pubsub attributes. If this is true you will
    # get a buildflow.PubsubMessage class as your input.
    include_attributes: bool = False
```

## Sink Class Definition

```python
@dataclasses.dataclass
class PubSubSink(io.Sink):
    topic: str
```

## Example Usage

### PubSub to BigQuery

```python
@flow.processor(
    source=PubSub(subscription='...'),
    sink=BigQuery(table_id='...'),
)
def process(payload: Dict[str, Any]):
    return payload
```

In this example, messages are processed one at a time before writing the contents to BigQuery.

---

### PubSub to PubSub

```python
@flow.processor(
    source=PubSub(subscription='...'),
    sink=PubSub(topic='...'),
)
def process(payload: Dict[str, Any]):
    return payload
```

In this example, messages are processed one at a time before publishing the contents to another PubSub topic.
