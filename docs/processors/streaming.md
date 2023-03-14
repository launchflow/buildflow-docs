---
sidebar_position: 1
---

# Streaming

A streaming processor is any processor that consumes an un-bounded stream of data, such as from a Google Cloud Pub/Sub feed. If you processor is consuming an unbounded source then the processor will automatically be turned into a streaming pipeline.

Example:

```python
@flow.processor(
    source=PubSub(subscription='...'),
    sink=BigQuery(table_id='...'),
)
def process(payload: Dict[str, Any]):
    return payload
```

Messages are sent to the processor 1 at a time, so you will always be processing an individual message. The input will depend on the type of source you are using. For PubSub it will be a dictionary containing the payload of the PubSub message. You can return python dictionaries or python dataclasses. If you return a python dataclass you can take advantage of our automatic [schema validation](../schema-validation.md).
