# Snowflake Table

`SnowflakeTable` is a **sink** that can be use to write data to a Snowflake table. To create a `SnowflakeTable` simply provide:

- `table` **required**: The name of the snowflake table
- `database` **required**: The name of the database the table exists in
- `schema` **required**: The name of the schema the table exists in
- `bucket` ***required**: A [S3Bucket](aws/s3)  that the data will be staged in before writing to Snowflake.
- `snow_pipe`: The name of the Snowflake pipe to use to load the data. If you are using BuildFlow to managed your resources you can leave this out and one will be created for you when you run `buildflow apply main:app`.
- `snowflake_stage`: The name of the Snowflake stage to use to load the data. If you are using BuildFlow to managed your resources you can leave this out and one will be created for you when you run `buildflow apply main:app`.


:::note

Support for GCS buckets is [coming soon](https://github.com/launchflow/buildflow/issues/250).

:::

Snowflake authentication:

- `account`: The name of the Snowflake account to use
- `user`: The name of the Snowflake user to use to authenticate as 
- `private_key`: The private key to use for authentication

```python
from buildflow.io.snowflake import SnowflakeTable
from buildflow.io.aws import S3Bucket

@app.pipeline(source=...,
    sink=SnowflakeTable(
        table="table",
        database="database",
        schema="schema",
        bucket=S3Bucket(bucket_name="bucket").options(managed=True),
        user="...",
        private_key="..."))
    ...
```

:::tip

Utilities exist for reading in a private key file [here](https://github.com/launchflow/buildflow/blob/main/buildflow/io/snowflake/utils.py).

:::

## Types

The `SnowflakeTable` sink expects an object that can be serialized in to a JSON object. You can return a `dataclass` and we will automatically serialize it for you, or you can return a dictionary containing JSON serializable objects.

If you would like to return a custom type that is not JSON serializable you can implement the `to_json` method on your class and we will use that to serialize your object.

```python
class CustomType:
    def __init__(self, b: int):
        self.b = str

    def to_json(self):
        return {"b": self.b}

@app.pipeline(source=..., sink=SnowflakeTable(...))
async def my_processor(elem: int) -> CustomType:
    return CustomType(b=elem + 1)
```

## Resource Creation

If you are using BuildFlow's built in resource creation/management you can use the `SnowflakeTable` primitive to create a all required resources for you. The following resources will be created:

- *Snowflake Table*: A snowflake table with a table schema matching your output type
- *Snowflake Database*: A snowflake database to hold the table (only if `database_managed` option is True)
- *Snowflake Schema*: A snowflake schema to hold the table (only if `schema_managed` option is True)
- *S3 Bucket*: If the `managed` option on the provided bucket is set to True
- *Snowflake Stage*: A snowflake stage to load the data from the bucket if the `snowflake_stage` option is not provided
- *Snowflake Pipe*: A snowflake pipe to load the data from the stage if the `snowflake_pipe` option is not provided

## Configuration Options

You can provide the following options to control resource management of the BigQuery table:
- `managed`: Whether or not the topic is managed by BuildFlow. Defaults to `False`.
- `database_managed`: Whether or not the database should be included in resource management / creation. Defaults to `True`.
- `schema_managed`: Whether or not the database should be included in resource management / creation. Defaults to `True`.
```python
SnowflakeTable(...).options(managed=True, database_managed=True, schema_managed=True)
```