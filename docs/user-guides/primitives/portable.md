# Portable

Portable primitives are special primitives that can be used across different cloud providers. You can for example say I want to use a `Queue`, and based on what cloud you are deploying to we will pick the appropriate resources to create.

For example a queue on AWS will use `SQS` and a queue on GCP will use `GCP Pub/Sub`.

The queue is constructed using your cloud provider config found in `.buildflow/cloud_provider_config.yaml`.

A full list of portable primitives can be found [here](../../category/portable).

## Example

Python main file:

```python
from buildflow.io.portable import Queue

source = Queue(queue_id="my-queue")
```

Cloud provider config:

```yaml
default_cloud_provider: gcp
aws:
    default_region: null
azure:
    default_region: null
gcp:
    default_project_id: 'my-gcp-project'
    default_region: null
    default_zone: null
local: {}
```

When you run `buildflow apply main:app` we will create a `GCP Pub/Sub` queue with the id `my-queue` in the project `my-gcp-project`. You can easily switch your default cloud provider to have it create a `SQS` queue on AWS instead by simply changing the `default_cloud_provider` to `aws`.


:::note
Azure is not fully supported in BuildFlow yet.
:::