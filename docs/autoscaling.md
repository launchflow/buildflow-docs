---
sidebar_position: 5
---

# Dynamic Autoscaling

Buildflow provides horizontal autoscaling out of the box. This allows your Processors to scale up to fit any workload, traffic spikes, or network disruptions without any intervention from an engineer. It will also scale down your application during low traffic periods to help keep your system cost effective.

Our autoscaling is powered by [Ray](https://www.ray.io) and [Ray clusters](https://docs.ray.io/en/latest/cluster/). When running on a single machine (such as your local computer) the autoscaler will only scale up to use the available CPUs on your machine. When running in a cloud environement, the autoscaler will spin up/down VMs, **no Kubernetes required**!

## Batch Runtimes

For Batch runtimes, the autoscaler will scale based on the amount of data that needs to be read in. That means there is nothing to configure and we will give you the max throughput possible based on your machine / cluster configuration.

## Streaming

For Streaming runtimes, we have the concept of a `replica`, which represents one process that is pulling data from your streaming source. The autoscaler will scale your Processor based on the size of your source's backlog, the throughput of your application, and the current utilization of your cluster.

### When do we scale up?

To determine if it needs to scale up, the autoscaler will look at the total backlog that exists on your streaming source and how fast we are processing data. From this information it can determine how many replicas are needed to burn through the backlog in 60 seconds, and will attempt to scale up to that number of replicas.

:::note

The autoscaler will never request more replicas than what your cluster can support. For example, if you are running on a single 4 core machine, and each replica of your Processor is configured to use 0.5 CPU, the autoscaler will scale up to 8 replicas.

:::

### When do we scale down?

To determine if it needs to scale down, the autoscaler will first look to make sure there is no backlog that needs to be processed, and ensure the Processor's current throughput is keeping up with the input. It then looks at the utilization of each replica and will start (gracefully) shutting them down if it determines they aren't being utilized enough.

### Configuring number of Replicas

BuildFlow offers some more fine grained settings to control the number of replicas. These can be set by passing the `StreamingOptions` object to `app.run()` like so:

```python
app.run(streaming_options=buildflow.StreamingOptions(
    min_replicas=10,
    max_replicas=20,
    num_replicas=12,
    autoscaling=True,
))
```

With these options you can specify four things:

- **min_replicas**: This is the minimum number of replicas that should be kept alive at anytime. We will never attempt to scale below this. Defaults to 1. This can be useful if you need to keep a certain number of replicas up to ensure your desired latency.
- **max_replicas**: This is the maximum number of replicas to scale up to. We will never attempt to scale beyond this. Defaults to 1000. This can be useful if you are running an application locally and don't want it to use your entire CPU, or you want to cost control your application.
- **num_replicas**: This is the number of replicas to start your application with. If unset we will default to `min_replicas`. This can be useful if you know you'll need a certain amount of replicas to start and don't want to wait for the autoscaler to scale up.
- **autoscaling**: Boolean value to determine if we should autoscale or not. If false we will start your application with `num_replicas` and not attempt to up or down scale the replicas.

:::tip

These configurations are only needed if you want more fine grained control over the number of replicas. If you don't care about this you can simply call `app.run()` and let the autoscaler do its magic.

:::
