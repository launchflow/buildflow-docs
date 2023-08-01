# Resource Management

When you define the source and sink for you processor not only are you defining the input and output. With BuildFlow you are also defining resources that can be created and destroyed as part of your Flow.

By default management is turned off (except for [Portable primitives](portable)), but can be turned on by setting the `managed` option to `True`.

```python
Primitive(...).options(managed=True, ...)
```

A great example of this is our [Real-Time Image Classification walkthrough](../../walkthroughs/realtime-image-classification). In that walkthrough >8 different resources need to be created and destroyed just to run the node. But with BuildFlow you can run one command to [create](#resource-creation) all the resources and another to [destroy](#resource-destruction) them. There is no need to use to even open the cloud console.

## Resource Creation

Resource creation can be done by simply running:

```bash
buildflow plan main:app
```

This will print out a plan of everything that will be created. If you are happy with the plan you can run type: `y`, or `n` to reject it

## Resource Destruction

Resource destruction can be done by simply running:

```bash
buildflow destroy main:app
```


This will automatically clean up all the resources that were created by the plan command.