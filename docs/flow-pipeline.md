---
sidebar_position: 2
---

# Flow Pipeline

The flow pipeline object is the entry point into buildflow. With the flow
pipeline object you can:

- attach [processors](./processors/overview.md) to run as part of your
  pipeline
- run your pipeline with `flow.run()`
- block until pipeline completion with: `flow.run().output()`
- shutdown your pipeline safely with `flow.run().shutdown()`

## Creating your pipeline object

Creating your pipeline object is as simple as:

```python
from buildflow import Flow

flow = Flow()
```

This creates your object that you can now perform operations on.

## Attaching Processors

Processors can easily be attached with a python decorator like:

```python
@flow.processor(sink=..., source=...)
def my_processor(element):
    ...
```

This will attach a processor that can be executed wehn you run your pipeline. You can also create stateful processors that can be passed directly to the `run` function. More details about processors can be found [here](./processors/overview.md).

Processors come in two classes: streaming and batch. A flow pipeline can operate on batch or streaming but not both. So you can't add a batch processor and a streaming processor to a pipeline. For batch you can attach as many processors as you want to your pipeline, and they will all be executed in parallel when you run your pipeline. For streaming we currently only allow you to attach one streaming processor to a pipeline.

## Running the Pipeline

Once you have attached your processors you can run your pipeline simply by calling `run()` on the flow pipeline object.

```python
flow.run()
```

Once this is called your pipeline will begin executing, but it is important to note that `flow.run()` doesn't actually block until it completes. The run method returns to you a `FlowResults` object that you can operate on. The `FlowResults` has two methods `output` and `shutdown`:

**output**

The `output` method will block until the pipeline completes. For batch this will block until the pipeline is finished and return to you the results. For streaming this will block forever (or until you kill your pipeline).

**shutdown**

The `shutdown` method will attempt to safely shutdown your pipeline. For batch this will return immediately. For streaming we will stop requesting new data, wait for any in process data to finish process, then return.

:::tip

If you are running a streaming pipeline and called `output()` to block you can shutdown your pipeline by sending the interrupt signal to the python process (Ctrl-C on linux). This will perform that same action as calling `shutdown`.

:::