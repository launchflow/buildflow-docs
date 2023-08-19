# Endpoints

The **Endpoint** is the pattern provided by **BuildFlow** for creating an HTTP endpoint that processes data and returns a response to the user.

A endpoint is composed of:

- A `route`: this is the path that the endpoint will be available at.
- A `method`: this is the HTTP method that the endpoint will be available at currently GET and POST are supported.
- Your processing Logic.

Endpoints are created using the `endpoint` decorator method of the [`Flow`](../flows/overview) class.

```python

@app.endpoint(route="/", method="POST")
def my_endpoint(...):
    ...

```

The input of your endpoint will be one request from your HTTP endpoint. You can use a dataclass to define a JSON payload that you expect.

The element you return from your pipeline will be returned in the HTTP response.
