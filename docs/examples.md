
# Examples

Below are some quick examples of using BuildFlow. If you are just getting started with BuildFlow we recommend starting with our walkthroughs:

- [Real-Time Image Classification](./walkthroughs/realtime-image-classification)

Before running any of the examples ensure you have [installed BuildFlow](./install).

All examples can be run with the following commands:

```bash
# Create all resources required by the pipeline
buildflow apply main:app
# Run the pipeline
buildflow run main:app
# Destroy resources required by the pipeline
buildflow destroy main:app
```

## Local Examples

### Local File Change Stream -> DuckDB

```python
from buildflow import Flow

from buildflow.io.local import LocalFileChangeStream
from buildflow.io.duckdb import DuckDBTable

# TODO(developer): Point this at the directory you would like to watch.
DIR_TO_WATCH = TODO

app = Flow()

@app.pipeline(
  source=LocalFileChangeStream(file_path=DIR_TO_WATCH)
  sink=DuckDB(database="mydb.duckcb", table="mytable")
)
def pipeline(elem):
  return elem
```

## GCP Examples

### GCP Pub/Sub -> GCS

```python
import dataclasses
import os
from datetime import datetime
from typing import Any, Dict

import buildflow
from buildflow.io.gcp import GCSBucket, GCPPubSubSubscription
from buildflow.types.portable import FileFormat

# TODO(developer): Point this at the gcp project where resources should be created.
gcp_project = TODO
# TODO(developer): Change this to a unique bucket name to upload your files to.
bucket_name = TODO

input_source = GCPPubSubSubscription(
    project_id=gcp_project,
    subscription_name="taxi_rides",
).options(
    managed=True,
    topic=GCPPubSubTopic(
        project_id="pubsub-public-data", topic_name="taxirides-realtime"
    ),
)
output_bucket = GCSBucket(
    file_path="taxidata.parquet",
    file_format=FileFormat.PARQUET,
    project_id=gcp_project,
    bucket_name=bucket_name,
).options(managed=True, force_destroy=True)


@dataclasses.dataclass
class TaxiOutput:
    ride_id: str
    point_idx: int
    latitude: float
    longitude: float
    timestamp: datetime
    meter_reading: float
    meter_increment: float
    ride_status: str
    passenger_count: int


app = buildflow.Flow()

@app.pipeline(source=input_source, sink=output_bucket)
def pipeline(element: Dict[str, Any]) -> TaxiOutput:
    return TaxiOutput(**element)
```

### GCP Pub/Sub -> BigQuery

```python
import dataclasses
import os
from datetime import datetime
from typing import Any, Dict

import buildflow
from buildflow.io.gcp import BigQueryTable, GCPPubSubSubscription

# TODO(developer): Point this at the gcp project where resources should be created
gcp_project = TODO

input_source = GCPPubSubSubscription(
    project_id=gcp_project,
    subscription_name="taxi_rides",
).options(
    managed=True,
    topic=GCPPubSubTopic(
        project_id="pubsub-public-data", topic_name="taxirides-realtime"
    ),
)
output_table = BigQueryTable(
    project_id=gcp_project,
    dataset_name="buildflow_output"
    table_name="taxidata"
).options(managed=True, destroy_protection=False)


@dataclasses.dataclass
class TaxiOutput:
    ride_id: str
    point_idx: int
    latitude: float
    longitude: float
    timestamp: datetime
    meter_reading: float
    meter_increment: float
    ride_status: str
    passenger_count: int


app = buildflow.Flow()

@app.pipeline(source=input_source, sink=output_table)
def pipeline(element: Dict[str, Any]) -> TaxiOutput:
    return TaxiOutput(**element)
```

### GCS File Change Stream -> BigQuery

```python
import dataclasses
import datetime
import io
import json
import os
from typing import List

import buildflow
from buildflow.io.gcp import BigQueryTable, GCSBucket, GCSFileChangeStream
from buildflow.types.gcp import GCSFileChangeEvent

# TODO(developer): Point this at the gcp project where resources should be created.
gcp_project = TODO
# TODO(developer): Change this to a unique bucket name to upload your files to.
bucket_name = TODO

source = GCSFileChangeStream(
    gcs_bucket=GCSBucket(
        project_id=gcp_project,
        bucket_name=bucket_name,
    ).options(managed=True, force_destroy=True, bucket_region="US"),
)
sink = BigQueryTable(
    project_id=gcp_project,
    dataset_name="buildflow_output",
    table_name="buildflow_table",
).options(managed=True, destroy_protection=False)


app = buildflow.Flow()


@dataclasses.dataclass
class Output:
    value: int


# Define our processor.
@app.pipeline(source=source, sink=sink)
def process(gcs_file_event: GCSFileChangeEvent) -> Output:
    json_str = gcs_file_event.blob.decode()
    return Output(**json.loads(json_str))
```

## AWS Examples

### AWS SQS -> S3

```python
import dataclasses

import buildflow
from buildflow.io.aws import S3Bucket, SQSQueue
from buildflow.types.portable import FileFormat

# TODO(developer): Change this to a unique bucket name to upload your files to.
bucket_name = TODO

input_source = SQSQueue(
    queue_name="input-queue"
    aws_region="us-east-1"
).options(managed=True)
output_bucket = S3Bucket(
    file_path="output.parquet",
    file_format=FileFormat.PARQUET,
    aws_region="us-east-1",
    bucket_name=bucket_name
).options(managed=True, force_destroy=True)


app = buildflow.Flow()


@dataclasses.dataclass
class Output:
    value: int


@app.pipeline(source=input_source, sink=output_bucket)
def pipeline(element: Dict[str, Any]) -> Output:
    return Output(**element)
```

### AWS SQS -> Snowflake

```python
import dataclasses

import buildflow
from buildflow.io.aws import S3Bucket, SQSQueue
from buildflow.io.snowflake import SnowflakeTable


# TODO(developer): fill these in
SNOWFLAKE_BUCKET_NAME = TODO
SNOWFLAKE_ACCOUNT = TODO
SNOWFLAKE_USER = TODO
# NOTE: This private key file needs to be in your workscape application directory
# to have it uploaded to LaunchFlow correctly.
# See: https://docs.snowflake.com/en/user-guide/key-pair-auth
SNOWFLAKE_PRIVATE_KEY_FILE = TODO
# NOTE: These are required so Snowflake can access the S3 bucket
AWS_ACCESS_KEY_ID = TODO
AWS_SECRET_ACCESS_KEY = TODO


input_source = SQSQueue(
    queue_name="input-queue"
    aws_region="us-east-1"
).options(managed=True)
output_table=SnowflakeTable(
    database="buildflow-walkthrough",
    schema="buildflow-schema",
    table="sf-table",
    account=SNOWFLAKE_ACCOUNT,
    user=SNOWFLAKE_USER,
    private_key_file=read_private_key_file(SNOWFLAKE_PRIVATE_KEY_FILE),
    s3_bucket=S3Bucket(
        bucket_name=SNOWFLAKE_BUCKET_NAME,
        aws_region="us-east-1",
    ).options(managed=True, force_destroy=True),
).options(managed=True, database_managed=True, schema_managed=True),


app = Flow(
    flow_options=FlowOptions(
        aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY
    )
)


@dataclasses.dataclass
class Output:
    value: int


@app.pipeline(source=input_source, sink=output_table)
def pipeline(element: Dict[str, Any]) -> Output:
    return Output(**element)
```

### S3 File Change Stream -> Snowflake

```python
import dataclasses

import buildflow
from buildflow.io.aws import S3Bucket, S3FileChangeStream
from buildflow.io.snowflake import SnowflakeTable
from buildflow.types.aws import S3ChangeStreamEventType, S3FileChangeEvent
from buildflow.types.portable import PortableFileChangeEventType

# TODO(developer): fill these in
SNOWFLAKE_BUCKET_NAME = TODO
SNOWFLAKE_ACCOUNT = TODO
SNOWFLAKE_USER = TODO
# NOTE: This private key file needs to be in your workscape application directory
# to have it uploaded to LaunchFlow correctly.
# See: https://docs.snowflake.com/en/user-guide/key-pair-auth
SNOWFLAKE_PRIVATE_KEY_FILE = TODO
# NOTE: These are required so Snowflake can access the S3 bucket
AWS_ACCESS_KEY_ID = TODO
AWS_SECRET_ACCESS_KEY = TODO


input_source=S3FileChangeStream(
    s3_bucket=S3Bucket(
        bucket_name=INPUT_BUCKET_NAME,
        aws_region="us-east-1",
    ).options(managed=True, force_destroy=True),
)
output_table=SnowflakeTable(
    database="buildflow-walkthrough",
    schema="buildflow-schema",
    table="sf-table",
    account=SNOWFLAKE_ACCOUNT,
    user=SNOWFLAKE_USER,
    private_key_file=read_private_key_file(SNOWFLAKE_PRIVATE_KEY_FILE),
    s3_bucket=S3Bucket(
        bucket_name=SNOWFLAKE_BUCKET_NAME,
        aws_region="us-east-1",
    ).options(managed=True, force_destroy=True),
).options(managed=True, database_managed=True, schema_managed=True),


app = buildflow.Flow()


@dataclasses.dataclass
class Output:
    value: int


@app.pipeline(source=input_source, sink=output_table)
def pipeline(s3_file_event: S3FileChangeEvent) -> Output:
    if s3_file_event.portable_event_type != PortableFileChangeEventType.CREATED:
        # skip non-created events
        # S3 publishes a test notification when it is first created and we want
        # to ensure that it doesn't fail.
        return
    return Output(**json.loads(s3_file_event.blob.decode()))
```

