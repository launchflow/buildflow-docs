---
sidebar_position: 2
---

# PubSub - Streaming

**PubSub** refers to Google's Pub/Sub service. It is a **streaming** source connector.

Messages are sent to the processor 1 at a time. If you need to emit mulitple outputs, you should return an interable (list, generator, etc.)

:::note

**PubSub** **_sources_** must supply a `subscription` argument.

**PubSub** **_sinks_** must supply a `topic` argument.

:::

## Class Definition

```python
class PubSub(IO):
    # format: `projects/{$PROJECT_ID}/topics/{$TOPIC_ID}`
    topic: str
    # format: `projects/{$PROJECT_ID}/subscriptions/{$SUBSCRIPTION_ID}`
    subscription: str
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
