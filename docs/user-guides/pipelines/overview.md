# Pipelines



The **Pipeline** is the primary abstraction provided by **BuildFlow** for creating a real-time pipeline. It contains all of the user's processing logic between a source and a sink.

A pipeline is composed of:
- A `source` [primitive](../primitives/overview)
- A `sink` [primitive](../primitives/overview)
- Your processing logic

Pipelines can easily be created with the `pipeline` decorator method of the [`Flow`](../flows/overview) class.

```python

@app.pipeline(source=Primitive(...), sink=Primitive(...))
def my_pipeline(...):
    ...

```

The input of your pipeline will be one element that is read from your `source` primitive. For instance if your source type is a queue (like Kafka, GCP Pub/Sub, or AWS SQS) then your processor will receive one message at a time that is read from the queue.

The element you return from your pipeline will be written to your `sink` primitive. For instance if your sink type is an OLAP datastore (like GCP BigQuery or Snowflake) one row will be written for each element you return from your processor. Or if you sink is a queue (like Kafka, GCP Pub/Sub, or AWS SQS) then one message will be published for each element you return from your processor.

## Multi-Row Output

BuildFlow also supports pipelines that return multiple rows. To accomplish this you can either return a `List` or `Tuple` and BuildFlow will flatten each element into it's own row.

```python
@app.pipeline(source=Primitive(...), sink=Primitive(...))
def my_pipeline(message):
    return [output(message), output1(message), output2(message)]

```

You can also use yields to return multiple elements that should be written to your sink.

```python
@app.pipeline(source=Primitive(...), sink=Primitive(...))
def my_pipeline(message):
    if message.startswith("hello"):
        yield "world"
    if message.endswith("world"):
        yield "!"

```

:::tip

If you want your row to be a list you can wrap it in a `Tuple` to avoid flattening.

```python
@app.pipeline(source=Primitive(...), sink=Primitive(...))
def my_pipeline(message):
    return [[output(message), output1(message), output2(message)]]
```

:::

