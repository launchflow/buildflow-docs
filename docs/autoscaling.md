---
sidebar_position: 3
---

# Dynamic Autoscaling

Buildflow provides horizontal autoscaling out of the box. This allows your pipeline to scale up to fit any workload, traffic spikes, or network disruptions without any intervention from an enngineer. It also will scale down your pipeline during low traffic periods ensuring your pipeline is as cost effective as possible.

Our autoscaling is powered by [Ray](https://www.ray.io) and [Ray clusters](https://docs.ray.io/en/latest/cluster/getting-started.html). When running on a single computer (such as your local computer) we will only scale up to use the available CPU on your machine, when running on a Ray Cluster you can configure how many machines you would like to use, and it will spin up and start machines as needed based on your workload.

## Batch

For batch workflows we will simple scale based on the amount of data that is being read in. That means there is nothing to configure and we will give you max throughput possible based on your machine / cluster configuration.

## Streaming

For streaming we have the concept of a `replica`, a replica is one process that is pulling down data from your streaming source. Based on the amount of work on your source, the throughput of your pipeline, and the current utilization we will decide if more or less replicas are needed.

**When do we scale up?**

To determine if we need to scale up we look at the total backlog that exists on your streaming source and how fast we are processing data. From this information we determine how many replicas are needed to burn down the backlog in 60 seconds, and will attempt to scale up that number of replicas.

:::note

We will never request more replicas that are currently available on your cluster, so if you only have one 8 core machine we will scale up to get the maximum throughput possible on those 8 cores.

:::


**When do we scale down?**

To determine if we need to scale down we first look to make sure there is no backlog that needs to be processed, and our current throughput is keeping up with the input. Then we look at the utilization of each replica. If we determine that there are extra replicas that are not being utilized enough we will scale down; consolidating the work on to fewer replicas.

### Configuring number of Replicas

We do offer some more fine grained control over the number of replicas. These can be set by passing the `StreamingOptions` object to `flow.run()` like so:

```python
flow.run(streaming_options=buildflow.StreamingOptions(
    min_replicas=10,
    max_replicas=20,
    num_replicas=12,
    autoscaling=True,
))
```

With these options you can specify four things:
- **min_replicas**: This is the minimum number of replicas that should be kept alive at anytime. We will never attempt to scale below this. Defaults to 1. This can be useful if you need to keep a certain number of replicas up to ensure your desired latency.
- **max_replicas**: This is the maximum number of replicas to scale up to. We will never attempt to scale beyond this. Defaults to 1000. This can be useful if you are running a pipeline locally and don't want it to use your entire CPU, or you want to cost control your pipeline.
- **num_replicas**: This is the number of replicas to start your pipeline with. If unset we will default to `min_replicas`. This can be useful if you know you'll need a certain amount of replicas to start and don't want to wait for the autoscaler to scale up.
- **autoscaling**: Boolean value to determine if we should autoscale or not. If false we will start your pipeline with `num_replicas` and not attempt to up or down scale the replicas.

:::tip

These configurations are only needed if you want more fine grained control over the number of replicas. If you don't care about this you can simply call `flow.run()` for autoscaling.

:::