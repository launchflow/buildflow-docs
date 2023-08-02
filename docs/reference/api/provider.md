# Provider

## Source Provider

```python
class SourceProvider(ProviderAPI):
    def source(self, credentials: CredentialType) -> SourceStrategy:
        raise NotImplementedError("source not implemented for Provider")
```

## Sink Provider

```python
class SinkProvider(ProviderAPI):
    def sink(self, credentials: CredentialType) -> SinkStrategy:
        raise NotImplementedError("sink not implemented for Provider")
```

## Pulumi Provider

```python
class PulumiProvider(ProviderAPI):
    def pulumi_resources(
        self, type_: Optional[Type], depends_on: List[PulumiResource] = []
    ) -> List[PulumiResource]:
        raise NotImplementedError("pulumi_resources not implemented for Provider")
```

#### Empty Pulumi Provider

```python
class EmptyPulumiProvider(PulumiProvider):
    def pulumi_resources(self, type_: Optional[Type]) -> List[PulumiResource]:
        return []
```