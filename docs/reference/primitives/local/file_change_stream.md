# File Change Stream

`LocalFileChangeStream` is a source primitive that can be used to listen to to file change events for a file path. To create a `LocalFileChangeStream` provide the 
- `file_path` **required**: file path to listen to changes in
- `event_types`: List of event types to subscribe to. Defaults to: `[FileChangeStreamEventType.CREATED]`


```python
from buildflow.io.local import LocalFileChangeStream
from buildflow.types.local import FileChangeStreamEventType, LocalFileChangeEvent

@app.pipeline(source=LocalFileChangeStream(file_path="./dir_to_listen/", event_types=[FileChangeStreamEventType.CREATED]), sink=...)
def process(elem: LocalFileChangeEvent):
    ...
```

## Types

The `LocalFileChangeStream` source always returns a `LocalFileChangeEvent` object. This object contains the following fields:

- `metadata`: any metadata that was associated with the file change event. This is a dictionary of strings.
- `blob`: The raw contents of the file. This is lazily fetched.