# Async Processors

:::tip

**TL:DR;** If you are using any libraries that require you to use `await`. You should make your pipeline async.

:::

All BuildFlow processors automatically run in an async runtime. So you can make your process async by simply adding the `async` keyword.


For functions:
```python

@app.pipeline(source=Primitive(...), sink=Primitive(...))
async def my_pipeline(...):
    ...

```

For stateful pipelines:

```python
@app.pipeline(source=Primitive(...), sink=Primitive(...))
class StatefulPipeline:
    async def process(self, elem)
        return self.model.classify(elem)    
```

## Async With Ray

The async run time is powered by Ray. This means you can use any of the functionality of ray core to add increased parallelism to your processor. This is recommended if you need to perform any long running or computationally expensive tasks in your processor.

```python

@ray.remote
def long_task(elem):
    time.sleep(10)
    return elem

@app.pipeline(source=ResourceType(...), sink=ResourceType(...))
def my_processor(elem):
    return await long_task.remote(elem)

```