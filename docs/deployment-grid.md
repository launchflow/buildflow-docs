---
sidebar_position: 5
---

# Deployment Grid

The **DeploymentGrid** object is responsible for deploying [Nodes](./apis/node).

```python
from buildflow import DeploymentGrid

from your_app_dir import app1
from your_other_dir import app2

grid = DeploymentGrid({
    'app1': app1,
    'app2': app2,
})

grid.run()

```

A DeploymentGrid can contain multiple [Nodes](./apis/node).

## TODO: Fill out this page once the API is stable
