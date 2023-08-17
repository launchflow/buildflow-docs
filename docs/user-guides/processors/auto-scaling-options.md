# Autoscaling Options

These options control how the autoscaler should scale individual processors can be passed when creating a processor of any type. All options are optional and have reasonable defaults. Your options are:

- **enable_autoscaler** - Whether or not to enable autoscaling for the node. Defaults to `True`
- **min_replicas** - The minimum number of replicas each processor should have. Defaults to `0`
- **max_replicas** - The maximum number of replicas each processor should have. Defaults to `1000`

## Advanced Autoscaling Options

- **pipeline_backlog_burn_threshold** - The threshold for how long it will take to burn down a backlog before scaling up. Increasing this number will cause your pipeline to scale up more aggresively. Defaults to 60.
- **pipeline_cpu_percent_target** - The target cpu percentage for scalingdown. Increasing this number will cause your pipeline to scale down more aggresively. Defaults to 25.