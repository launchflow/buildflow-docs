# Strategy

## Sink Strategy

```python
class SinkStrategy(Strategy):
    strategy_type = StategyType.SINK

    def __init__(self, credentials: CredentialType, strategy_id: StrategyID):
        super().__init__(credentials=credentials, strategy_id=strategy_id)

    async def push(self, batch: Batch):
        """Push pushes a batch of data to the source."""
        raise NotImplementedError("push not implemented")

    def push_converter(self, user_defined_type: Type) -> Callable[[Any], Any]:
        raise NotImplementedError("push_converter not implemented")
```

## Source Strategy

```python
@dataclasses.dataclass(frozen=True)
class PullResponse:
    payload: Iterable[Any]
    ack_info: AckInfo

class SourceStrategy(Strategy):
    strategy_type = StategyType.SOURCE

    def __init__(self, credentials: CredentialType, strategy_id: StrategyID):
        super().__init__(credentials=credentials, strategy_id=strategy_id)

    async def pull(self) -> PullResponse:
        """Pull returns a batch of data from the source."""
        raise NotImplementedError("pull not implemented")

    async def ack(self, to_ack: AckInfo, success: bool):
        """Ack acknowledges data pulled from the source."""
        raise NotImplementedError("ack not implemented")

    async def backlog(self) -> int:
        """Backlog returns an integer representing the number of items in the backlog"""
        raise NotImplementedError("backlog not implemented")

    def max_batch_size(self) -> int:
        """max_batch_size returns the max number of items that can be pulled at once."""
        raise NotImplementedError("max_batch_size not implemented")

    def pull_converter(self, user_defined_type: Type) -> Callable[[Any], Any]:
        raise NotImplementedError("pull_converter not implemented")
```
