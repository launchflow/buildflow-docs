# Analysis Table

`AnalyaisTable` is a sink [portable primitive type](../../../user-guides/primitives/portable.md) that can be used to write data to an analysis table.

- `table_id` **required**: the unique identifier for the table

:::note

The `AnalysisTable` portable primitive is currently only supported on GCP and Local.

:::

Example sink usage:

```python
from buildflow.io.portable import AnalysisTable

@app.pipeline(sink=..., sink=AnalysisTable(table_id="..."))
```

## Types
For primitive types we encourage you to use a type that can be serialized no matter what cloud provider you such as a `dataclass` or a `dict`.

If you cannot for whatever reason. Please refer to the cloud specific analysis table implementations for what type should be used:

- GCP -> [BigQueryTable](../gcp/gcp_bigquery)
- Local -> [DuckDB](../duckdb)

## Resource Creation

What resources are created depends on what is in your `cloud_provider_config.yaml`.

- GCP -> [Pub/Sub](../gcp/gcp_pubsub)
- Local -> [DuckDB](../duckdb)
