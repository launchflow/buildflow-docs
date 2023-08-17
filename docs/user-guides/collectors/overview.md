# Collectors

The **Collector** is the pattern provided by **BuildFlow** for creating an HTTP endpoint that dumps to a give sink. It contains all of the user's processing logic between an HTTP request and a sink.

A collector is composed of:
- A `route`: this is the path that the endpoint will be available at.
- A `method`: this is the HTTP method that the endpoint will be available at currently GET and POST are supported.
- A `sink` [primitive](../primitives/overview)
- Your processing Logic.

Collectors are created using the `collector` decorator method of the [`Flow`](../flows/overview) class.

```python

@app.collector(route="/", method="POST", sink=Primitive(...))
def my_collector(...):
    ...

```

The input of your collector will be one request from your HTTP endpoint. You can use a dataclass to define a JSON payload that you expect.

The element you return from your collector will be written to your `sink` primitive. For instance if your sink type is an OLAP datastore (like GCP BigQuery or Snowflake) one row will be written for each element you return from your processor. Or if you sink is a queue (like Kafka, GCP Pub/Sub, or AWS SQS) then one message will be published for each element you return from your processor.

## Multi-Row Output

BuildFlow also supports collectors that return multiple rows. To accomplish this you can either return a `List` or `Tuple` and BuildFlow will flatten each element into it's own row.

```python
@app.collector(route="/", method="POST", sink=Primitive(...))
def my_collector(message):
    return [output(message), output1(message), output2(message)]

```

You can also use yields to return multiple elements that should be written to your sink.

```python
@app.collector(route="/", method="POST", ink=Primitive(...))
def my_collector(message):
    if message.startswith("hello"):
        yield "world"
    if message.endswith("world"):
        yield "!"

```

:::tip

If you want your row to be a list you can wrap it in a `Tuple` to avoid flattening.

```python
@app.collector(route="/", method="POST", sink=Primitive(...))
def my_collector(message):
    return [[output(message), output1(message), output2(message)]]
```

:::