---
sidebar_position: 1
---

# Install

If you are just getting started with BuildFlow we recommend starting with our walkthroughs:
- [GCP Real-Time Image Classification](./walkthroughs/realtime-image-classification)

## Quick Setup

### Install the BuildFlow Python Package

```bash
pip install buildflow
```

### Extra Dependencies

#### Pulumi Installation

BuildFlow uses Pulumi to manage resources used by your BuildFlow Nodes and Processors. To install Pulumi visit: https://www.pulumi.com/docs/install/

Installing Pulumi unlocks:
- allows BuildFlow to manage resource creation and destruction
- full access to Pulumi API / CLI
- fine-grained control over Pulumi Stacks & Resources
