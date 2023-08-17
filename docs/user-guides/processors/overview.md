# Processors

A processor is what we like to call a user defined pattern. It is a pre-defined flow of data through a provided pattern. We offer three different implementations of processors:

- [Pipelines](../pipelines/overview): A real-time pipeline that reads data from a source and writes data to a sink.
- [Collectors](../collectors/overview): A collector takes in data from an HTTP endpoint via a GET or POST request and writes it to a sink. Then returns a success or failure response.
- [Endpoints](../endpoints/overview): An endpoint takes in data from an HTTP endpoint via a GET or POST request and returns a user defined response.

Some additional patterns we hope to support in the future are open websocket connections and batch pipelines.

## Features

- All processors can be [async](./async-processors).
- All processors can be [stateful](./stateful-processors).
- Support [custom typing](./custom-types) for your processors.