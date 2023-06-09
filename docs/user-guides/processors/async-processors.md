# Async Processors

:::tip

**TL:DR;** If you are using any libraries that require you to use `await`. You should make your processor async.

:::

BuildFlow processors automatically run in an async runtime. So you can easily turn you processor into an async processor by using the `async` keyword.

```python

@app.processor(source=ResourceType(...), sink=ResourceType(...))
async def my_processor(...):
    ...

```

## Async With Ray

The async run time is powered by Ray. This means you can use any of the functionality of ray to add increased parallelism to your processor. This is recommended if you need to perform any long running tasks in your processor.

```python

@ray.remote
def long_task(elem):
    time.sleep(10)
    return elem

@app.processor(source=ResourceType(...), sink=ResourceType(...))
def my_processor(elem):
    return await long_task.remote(elem)

```