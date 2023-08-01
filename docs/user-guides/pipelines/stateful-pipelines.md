# Stateful Pipelines

Sometimes you need to keep some kind of state between elements your pipeline is processing. Such as keeping network connections open or loading a model. This can be accomplished by attaching your process to a class instead of a function.

If attaching to a class you will need to implement three lifecycle methods:

- **setup** - This method will be called once per replica before your process logic is called. This is where you should perform any stateful setup.
- **process** - This method will be called once per element your pipeline processes. This is where you should perform your processing logic.
- **teardown** - This method will be called once per replica when shutting down a replica (either due to scaling down or a drain request). This is where you should perform any stateful cleanup.

```python
@app.pipeline(source=Primitive(...), sink=Primitive(...))
class ImageClassificationProcessor:
    def setup(self):
        """Perform any stateful setup here. Like loading a model"""
        self.model = load_model(...)

    def process(self, elem)
        return self.model.classify(elem)    

    def teardown(self):
        self.model.cleanup()
```
