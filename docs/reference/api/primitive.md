# Primitive

```python
class Primitive:
    primitive_type: PrimitiveType
    managed: bool = False

    def enable_managed(self):
        """Enable managed mode."""
        self.managed = True

    def source_provider(self) -> SourceProvider:
        """Return a source provider for this primitive."""
        raise NotImplementedError(
            f"Primitive.source_provider() is not implemented for type: {type(self)}."
        )

    def sink_provider(self) -> SinkProvider:
        """Return a sink provider for this primitive."""
        raise NotImplementedError(
            f"Primitive.sink_provider() is not implemented for type: {type(self)}."
        )

    def pulumi_provider(self) -> PulumiProvider:
        """Return a pulumi provider for this primitive."""
        raise NotImplementedError(
            f"Primitive.pulumi_provider() is not implemented for type: {type(self)}."
        )

    def options(self, managed: bool = False) -> "Primitive":
        """Return a copy of this primitive with the managed flag set."""
        self.managed = managed
        return self
```

## GCP Primitive

```python
class GCPPrimtive(Primitive):
    primitive_type = PrimitiveType.GCP

    @classmethod
    def from_gcp_options(cls, gcp_options: GCPOptions) -> "GCPPrimtive":
        """Create a primitive from GCPOptions."""
        raise NotImplementedError("GCPPrimtive.from_gcp_options() is not implemented.")
```

## AWS Primitive

```python
class AWSPrimtive(Primitive):
    primitive_type = PrimitiveType.AWS

    @classmethod
    def from_aws_options(cls, aws_options: AWSOptions) -> "AWSPrimtive":
        """Create a primitive from AWSOptions."""
        raise NotImplementedError("AWSPrimtive.from_aws_options() is not implemented.")
```

## Portable Primitive

```python
class PortablePrimtive(Primitive):
    primitive_type = PrimitiveType.PORTABLE
    # Portable primitives are always managed.
    managed: bool = True

    def to_cloud_primitive(
        self, cloud_provider_config: CloudProviderConfig, strategy_type: StategyType
    ) -> "Primitive":
        """Create a cloud primitive from a CloudProviderConfig."""
        raise NotImplementedError(
            "PortablePrimtive.to_cloud_primitive() is not implemented."
        )

    # Override the super class options method since it doesn't make sense to non-manage
    # a portable primitive.
    def options(self) -> Primitive:
        return self
```