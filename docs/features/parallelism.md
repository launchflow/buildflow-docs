# Parallelism & Concurrency

BuildFlows runtime is completely asynchronous and built on top of [Ray](https://www.ray.io). While BuildFlow will ensure you are getting the most possible parallelism with your IO operations you can easily add more parallelism to your application processing logic.

You can use Ray directly inside your runtime:

```python

@ray.remote
def long_task(elem):
    time.sleep(10)
    return elem

@app.processor(source=ResourceType(...), sink=ResourceType(...))
def my_processor(elem):
    return await long_task.remote(elem)

```

Or you can use any other libraries or frameworks that support async processing.
