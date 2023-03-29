# Local GCP Pub/Sub to Parquet

In this walkthrough we will run a BuildFlow pipeline that reads from a local Pub/Sub topic and writes the data to a local parquet file. You can find all the code for this walk through [here](https://github.com/launchflow/buildflow/blob/main/buildflow/samples/local_pubsub_walkthrough.py).

## Getting Started

In order to follow this guide you must have the `gcloud` CLI installed. Instructions for that can be found [here](https://cloud.google.com/sdk/docs/install). You must also have the pubsub emulator component installed. You can install that with: 

```
gcloud components install beta pubsub-emulator
```

:::note

Even though we are using the `gcloud` CLI everything will be run locally so there is no need to setup any GCP projects or resources for this walk-through.

:::


### Setting up your environment

Install BuildFlow

```
pip install buildflow
```

## Run Pipeline

When running the pipeline the following resources will be created **locally**.

- Pub/Sub topic to publish data to
- Pub/Sub subscriber that subscribers to the taxi data Pub/Sub topic


The pipeline does the following:
1. Listens to the created pub/sub topic
2. Dumps the output to a local parquet file.


### Run Pub/Sub Emulator

First we need to spin up a local Pub/Sub emulator with:

```
gcloud beta emulators pubsub start --project=local-buildflow-example --host-port=localhost:8085
```

This will run a local Pub/Sub emulator that your pipeline will talk to instead
of remote Google Cloud Pub/Sub. You will need to keep this running while you
have you pipeline running.

### Execute the Pipeline

Now run the pipeline:

```
python -m buildflow.samples.local_pubsub_walkthrough
```

:::tip

By default we will write the data to: `/tmp/buildflow/local_pubsub.parquet`

If you would like to change this you can add the `--file_path=PATH_TO_FILE` to the below command.

:::


### Publish Data

Once the pipeline is running you can publish messages to it with:

```
python -m buildflow.samples.local_pubsub_publish --value=2
```

:::tip

You can change `--value` to any integer.

:::

### Reading Data

After publishing any data you can read in the parquet file how ever you like.

In python:

```python
import pyarrow.parquet as pq

table = pq.read_table('/tmp/buildflow/local_pubsub.parquet')
print(table)
```

Or you can use DuckDB to execute SQL queries on your parquet files:

```python
import duckdb

cursor = duckdb.connect()
data = cursor.execute('SELECT * FROM "/tmp/buildflow/local_pubsub.parquet"').fetchall()
print(data)
```

### Pipeline Code

```python
import argparse
import os
import sys
from typing import Any, Dict

import buildflow
from buildflow import Flow

# Parser to allow run time configuration of arguments
parser = argparse.ArgumentParser()
parser.add_argument('--file_path',
                    type=str,
                    default='/tmp/buildflow/local_pubsub.parquet')
args, _ = parser.parse_known_args(sys.argv)

if 'PUBSUB_EMULATOR_HOST' not in os.environ:
    # If this variable wasn't set. Set it to the same value we set in the
    # walkthrough docs.
    os.environ['PUBSUB_EMULATOR_HOST'] = 'localhost:8085'

# Set up a subscriber for the source.
# If this subscriber does not exist yet BuildFlow will create it.
input_sub = buildflow.PubSubSource(
    subscription=f'projects/local-buildflow-example/subscriptions/my-sub',
    topic=f'projects/local-buildflow-example/topics/my-topic')
# Set up a FileSink for writing to a file locally.
sink = buildflow.FileSink(file_path=args.file_path,
                          file_format=buildflow.FileFormat.PARQUET)

flow = Flow()


# Define our processor.
@flow.processor(source=input_sub, sink=sink)
def process(element: Dict[str, Any]):
    return element


# Run our flow.
flow.run().output()
```

## Cleaning Up

Since everything is run locally there is nothing to cleanup beyond stopping the
running processes and removing the local parquet file.