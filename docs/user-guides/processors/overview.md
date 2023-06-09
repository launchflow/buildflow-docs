# Processors

The **Processor API** is the primary abstraction provided by **BuildFlow**. It contains all of the user's processing logic between resources.

A processor is composed of:
- A `source` [resource type](../resource-types/overview)
- A `sink` [resource type](../resource-types/overview)
- Your processing logic

Processor can easily be created with the `processor` decorator method of the [`Node`](../nodes/overview) class.

```python

@app.processor(source=ResourceType(...), sink=ResourceType(...))
def my_processor(...):
    ...

```

The input of your processor will be one element that is read from your `source` resource type. For instance if your source type is a queue (like Kafka, GCP Pub/Sub, or AWS SQS) then your processor will receive one message at a time that is read from the queue.

The element you return from your processor will be written to your `sink` resource type. For instance if your sink type is a OLAP datastore like GCP BigQuery will write one row for each element you return from your processor.

## Multi-Row Output

BuildFlow also supports processors that return multiple rows. To accomplish this you can either return a `List` or `Tuple` and BuildFlow will flatten each element into it's own row.

```python
@app.processor(source=ResourceType(...), sink=ResourceType(...))
def my_processor(message):
    return [output(message), output1(message), output2(message)]

```

:::tip

If you want your row to be a list you can wrap it in a `Tuple` to avoid flattening.

```python
@app.processor(source=ResourceType(...), sink=ResourceType(...))
def my_processor(message):
    return [[output(message), output1(message), output2(message)]]
```

:::

