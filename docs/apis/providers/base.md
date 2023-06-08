# Provider API

Providers implement the logic for setting up and interacting with other systems and resources (ResourceTypes). There are multiple types of Providers and each type is responsible for a single task (i.e. a PullProvider only needs to provide a `pull` method). 

### PullProvider

PullProviders are used to `pull` data from a Source and optionally `ack` completion of work, typically in a streaming runtime.

Required methods:
- pull

Optional methods (unlocks more Runtime features):
- ack
- backlog
- pull_converter

Example PullProvider:
```python
from buildflow.io.providers import PullProvider, PullResponse, AckInfo

class MyProvider(PullProvider):

    async def pull(self) -> PullResponse:
        ...

    async def ack(self, to_ack: AckInfo):
        ...
```

### PushProvider

PushProviders are used to `push` data to a Sink.

Required methods:
- push

Optional methods (unlocks more Runtime features):
- push_converter

Example PushProvider:
```python
from buildflow.io.providers import PushProvider, PushResponse, BatchType

class MyProvider(PushProvider):

    async def push(self, batch: BatchType) -> PushResponse:
        ...
```

### PulumiProvider

PulumiProviders are used to create infrastructure using Pulumi.

Required methods:
- pulumi

Optional methods (unlocks more Runtime features):
- push_converter

Example PulumiProvider:
```python
from typing import Optional, Type
from buildflow.io.providers import PulumiProvider, PulumiResources
from pulumi_gcp import storage

class MyProvider(PulumiProvider):

    def pulumi(self, type_: Optional[Type]) -> PulumiResources:
        return PulumiResources([storage.Bucket('my-bucket')])
```

## All Available Providers

### Local
- [FileProvider](./local/file_provider#fileprovider)
- [PulsingProvider](./local/pulse_provider#pulsingprovider)

### GCP
- [StreamingBigQueryProvider](./gcp/gcp_bigquery#streamingbigqueryprovider)
- [GCPPubSubSubscriptionProvider](./gcp/gcp_pubsub#gcppubsubsubscriptionprovider)
- [GCPPubSubTopicProvider](./gcp/gcp_pubsub#gcppubsubtopicprovider)
- [GCSFileStreamProvider](./gcp/gcp_storage#gcsfilestreamprovider)
