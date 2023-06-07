# AWS SQS Streaming

:::note

AWS SQS support is currenty in prototype mode, and only SQS as a source is supported.

:::

In this walkthrough we will run a BuildFlow application that reads from an AQS SQS queue and writes to a local parquet file. You can find all the code for this walk through [here](https://github.com/launchflow/buildflow/blob/main/buildflow/samples/sqs_walkthrough.py).

## Getting Started

In order to follow this guide you must have an AWS account set up where a SQS queue can be created. You will also need to have the [AWS CLI installed](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) to setup authentication and clean up resources.

### Setting up your environment

To interact with AWS resources BuildFlow will use the credentials on your machine. To set those up you can follow the instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html).

Install BuildFlow

```
pip install buildflow
```

## Run Pipeline

When running the application the following resources will be created.

- SQS queue to send a receive messages from.

The application does the following:

1. Listens to messages on the newly created SQS queue.
2. Write the output to a local parquet file

To run the application:

```
python -m buildflow.samples.sqs_walkthrough --queue_name=buildflow-sqs-walkthrough
```

Once this application is running you can use the AWS CLI to publish messages to the queue. First get the queue url by calling `get-queue-url`, then use queue url and the `send-message` command to publish a message to the queue.

```
aws sqs get-queue-url --queue-name=buildflow-sqs-walkthrough
aws sqs send-message --queue-url=$QUEUE_URL --message-body='{"field": 1}'
```

Once SQS has sent your message to your application it will write the output to a local parquest file (defaults to: `/tmp/buildflow/local_pubsub.parquet` and can be changed by adding the `file_path` flag when running your application).

You can read the file using any parquet library. Below is an example
in python:

```python
import pyarrow.parquet as pq

table = pq.read_table('/tmp/buildflow/local_pubsub.parquet')
print(table)
```

or you can use DuckDB if you want to run SQL queries over the file:

```python
import duckdb

cursor = duckdb.connect()
data = cursor.execute('SELECT * FROM "/tmp/buildflow/local_pubsub.parquet"').fetchall()
print(data)
```

### Pipeline Code

```python
import argparse
import json
import sys
from typing import Any, Dict

import buildflow
from buildflow import Flow


# Parser to allow run time configuration of arguments
parser = argparse.ArgumentParser()
parser.add_argument('--queue_name', type=str, required=True)
parser.add_argument('--file_path',
                    type=str,
                    default='/tmp/buildflow/local_pubsub.parquet')
args, _ = parser.parse_known_args(sys.argv)


source = buildflow.SQSSource(queue_name=args.queue_name)
sink = buildflow.FileSink(file_path=args.file_path,
                          file_format=buildflow.FileFormat.PARQUET)

flow = Flow()


@app.processor(source=source, sink=sink)
def process(element: Dict[str, Any]):
    return json.loads(element['Body'])


# Run our flow.
flow.run()()

```

## Cleaning Up

Make sure to clean up the resources you created to avoid extra AWS costs.

```
aws sqs delete-queue --queue-url=$QUEUE_URL
```
