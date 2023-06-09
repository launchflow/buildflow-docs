# Pulsing

`Pulsing` is a source resource type that can be used to periodically send data to your processor. This can be useful for testing or for creating a periodic job.

To create a `Pulsing` source provide:
- `items`: The items to be sent. Will start from the first item in the list and iterate through. When the end of the list is hit it will start over.
- `pulse_interval_seconds`: Number of seconds to wait inbetween sending items

```python

from buildflow.io import Pulsing

@app.processor(source=Pulsing([1, 2, 3], pulse_interval_seconds=1), sink=...)
def process(elem: int):
    ...
```

## Input Type

The input type to your processor will be whatever you provided in the `items` list.