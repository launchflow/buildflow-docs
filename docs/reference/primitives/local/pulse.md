# Pulse

`Pulse` is a source primitive that can be used to periodically send data to your pipeline. This can be useful for testing or for creating a periodic job.

To create a `Pulsing` source provide:
- `items` **required**: The items to be sent. Will start from the first item in the list and iterate through. When the end of the list is hit it will start over.
- `pulse_interval_seconds`  **required**: Number of seconds to wait in-between sending items

```python

from buildflow.io.local import Pulse

@app.pipeline(source=Pulse([1, 2, 3], pulse_interval_seconds=1), sink=...)
def process(elem: int):
    ...
```

## Types

The input type to your processor will be whatever you provided in the `items` list.