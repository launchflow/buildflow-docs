# Dynamic Autoscaling

Buildflow provides horizontal autoscaling out of the box. This allows your Processors to scale up to fit any workload, traffic spikes, or network disruptions without any intervention from an engineer. It will also scale down your application during low traffic periods to help keep your system cost effective.

Our autoscaling is powered by [Ray](https://www.ray.io) and [Ray clusters](https://docs.ray.io/en/latest/cluster/). When running on a single machine (such as your local computer) the autoscaler will only scale up to use the available CPUs on your machine. When running in a cloud environement, the autoscaler will spin up/down VMs, **no Kubernetes required**!

## Streaming

For Streaming runtimes, we have the concept of a `replica`, which represents one process that is pulling data from your streaming source. The autoscaler will scale your Processor based on the size of your source's backlog, the throughput of your application, and the current utilization of your cluster.

### When do we scale up?

To determine if it needs to scale up, the autoscaler will look at the total backlog that exists on your streaming source and how fast we are processing data. From this information it can determine how many replicas are needed to burn through the backlog in 60 seconds, and will attempt to scale up to that number of replicas.

:::note

The autoscaler will never request more replicas than what your cluster can support. For example, if you are running on a single 4 core machine, and each replica of your Processor is configured to use 0.5 CPU, the autoscaler will scale up to 8 replicas.

:::

### When do we scale down?

To determine if it needs to scale down, the autoscaler will first look to make sure there is no backlog that needs to be processed, and ensure the Processor's current throughput is keeping up with the input. It then looks at the utilization of each replica and will start (gracefully) shutting them down if it determines they aren't being utilized enough.

## Configuring autoscaling

You can get fine grained control of how autoscaling works by configuring either your [processor](../user-guides/processors/processor-config#autoscale-config) or your [node](../user-guides/nodes/node-config).