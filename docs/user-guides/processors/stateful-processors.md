# Stateful Processors

Sometimes you need to keep some kind of state between elements your processor is processing. This can be accomplished by using a `Processor` class an implementing the `setup` method. This setup method will only be called once per replica and can be used to initialize any stateful dependencies.

```python
class ImageClassificationProcessor(buildflow.Processor):
    def source(self):
        return ...

    def sink(self):
        return ...

    def setup(self):
        """Perform any stateful setup here. Like loading a model"""
        self.model = load_model(...)

    def process(self, elem)
        return self.model.classify(elem)      

add.add(ImageClassificationProcessor())
```

:::tip

Due to scaling your setup method may be called multiple time as your processor scales up to meet demand.

:::
