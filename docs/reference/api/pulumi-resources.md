# Pulumi Resources

```python
@dataclasses.dataclass
class PulumiResource(Resource):
    resource_id: ResourceID
    resource: pulumi.Resource
    exports: Dict[str, Any]
    # hidden from the end user
    resource_type: ResourceType = dataclasses.field(
        default=ResourceType.PULUMI, init=False
    )
```