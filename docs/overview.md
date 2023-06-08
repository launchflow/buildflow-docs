---
sidebar_position: 1
---

# What is BuildFlow?

**BuildFlow**, is an open source framework for building large scale systems using Python. All you need to do is describe where your input is coming from and where your output should be written, and BuildFlow handles the rest. **No configuration outside of the code is required**.

**Source Code**: https://github.com/launchflow/buildflow

Key Features (all provided out-of-the-box):

- Automatic [resource creation / management](./features/resource-creation) (Infrastructure as Code) powered by [Pulumi](https://github.com/pulumi/pulumi)
- Automatic [parallelism & concurrency](./features/parallelism.md) powered by [Ray](https://github.com/ray-project/ray)
- [Dynamic autoscaling](./features/autoscaling.md): scale up during high traffic / reduce costs during low traffic
- [Schema validation](./features/schema-validation) powered by Python dataclasses and type hints

:::note

**BuildFlow** is currently in beta. The first stable version will be released alongside the [LaunchFlow VSCode Extension](https://www.launchflow.com/) in summer 2023. Please join our [Discord](https://discordapp.com/invite/wz7fjHyrCA) if you have any questions or feedback.

:::

## Windows Users

Our runtime is built on [Ray](https://ray.io/), where Windows support is currently in beta. See the [Ray docs](https://docs.ray.io/en/latest/ray-overview/installation.html#windows-support) for more info.
