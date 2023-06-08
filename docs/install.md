---
sidebar_position: 1
---

# Install


## Quick Setup

### Install the BuildFlow Python Package

```bash
pip install buildflow
```

## Recommended Setup

### Install the BuildFlow Server

The BuildFlow Server comes packaged with the BuildFlow Python Package, but has some external dependencies that
need to be installed / configured to unlock all of the features the BuildFlow Server provides.

The pre-packed BuildFlow Server is capable of:
- app submission & lifecycle management
- streaming app status changes / logs

Installing Pormetheus unlocks:
- real-time app metrics


#### Docker

TODO: show command for running with docker / docker-compose

#### Prometheus Installation

TODO: Show prom install instructions

### Other Recommended Setup

#### Pulumi Installation

Installing Pulumi unlocks:
- full access to Pulumi API / CLI
- fine-grained control over Pulumi Stacks & Resources
