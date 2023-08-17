# Flow Options

The Flow object take one [`FlowOptions`](https://github.com/launchflow/buildflow/blob/main/buildflow/core/options/flow_options.py) object for configuring the flow. In the `FlowOptions` object you can specify any configuration that you want to be applied to all processors in your flow. This include options for configuring the infrastructure and the runtime.

```python

app = Flow(flow_options=FlowOptions(...))

```

## Runtime

The Runtime options control how the node should operate when it is run. All options are optional and have reasonable defaults. Your options are:

- **num_replicas** - The number of replicas each processor should start with
- **log_level** - The log level to use for all processors in the node. Defaults to `INFO`


## Credentials

Credentials options control how the Flow should authenticate with the cloud providers (AWS and GCP).

### AWS Credentials

- **aws_access_key_id** - The AWS access key id to use for authentication
- **aws_secret_access_key** - The AWS secret access key to use for authentication
- **aws_session_token** - The AWS session token to use for authentication

### GCP Credentials

- **gcp_service_account_info** - The JSON serialized string of the GCP service account to use for authentication. This can be a JSON key or a workload identity pool configuration.

## Infrastructure

- **require_confirmation** - Whether or not confirmation should be required before applying changes. Defaults to True.
- **refresh_state** - Whether or not to refresh state before applying changes. Defaults to True.