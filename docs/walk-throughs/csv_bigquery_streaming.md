# GCS CSV to GCP BigQuery Streaming

In this walkthrough we will run a BuildFlow pipeline that listens for CSV file uploads to a Google Cloud Storage bucket. When an upload occurs the BuildFlow pipeline will read the corresponding file, perform any necessary transformations on it, and upload the results to BigQuery. You can find all the code for this walk through [here](https://github.com/launchflow/buildflow/blob/main/buildflow/samples/csv_bigquery_walkthrough.py).

You'll notice that with BuildFlow all you need to worry about is your transformation logic. All of the IO configuration, listening for files, and writing to BigQuery is handled by Buildflow.

:::caution

There is a known edge case with the automatic GCS setup. This will be fixed in the next major release (coming March 31, 2023). It is recommended that you manually set up your GCS notifications for now.

:::

:::tip

If you don't have a GCP project setup you can try out our [local walkthrough](./local_pubsub_streaming.md) which will run everything local.

:::

## Getting Started

In order to follow this guide you must have a GCP project set up where Google Cloud Storage, Pub/Sub, and BigQuery can be used / created. You will also need to have the gcloud CLI installed to setup authentication / clean up resources when you are finished. Instructions for that can be found [here](https://cloud.google.com/sdk/docs/install).

### Setting up your environment

To interact with GCP resources BuildFlow will use the application default
credentials on your machine. To set those up you can run:

```
gcloud auth application-default login
```

:::tip

If you happen to be following along from a VM running on GCP these may already
be setup for you.

:::

Install BuildFlow

```
pip install buildflow
```

## Run Pipeline

When running the pipeline the following resources will be created.

- Google Cloud Storage Bucket to upload files to
- Pub/Sub topic that will recieve notifications from the Google Cloud Storage Bucket
- Pub/Sub subscriber that subscribers to the Pub/Sub topic
- BigQuery dataset and BigQuery table where the data is written.

The pipeline does the following:

1. Listens for uploaded CSV files containing hourly view counts of Wikipedia pages
2. Aggreates the view counts into daily metrics.
3. Outputs the daily aggregations to BigQuery.

To run the pipeline run:

:::note

You will need to set the GCP_PROJECT to a GCP project you can create the resources in, and BUCKET_NAME to a unique bucket name.

:::

```
python -m buildflow.samples.csv_bigquery_walkthrough --gcp_project=$GCP_PROJECT --bucket_name=$BUCKET_NAME
```

Once the pipeline is running. Download the Wiki page view CSVs [here](./assets/wiki_page_views.csv), and upload it to the GCS bucket using:

```
gsutil cp <PATH_TO_LOCAL_CSV> gs://$BUCKET_NAME
```

That will take a couple seconds to process and then you should be able to checkout the BigQuery table to view the aggregate data.

### Pipeline Code

```python
import argparse
import csv
import dataclasses
import datetime
import io
import sys
from typing import List

import buildflow
from buildflow import Flow

# Parser to allow run time configuration of arguments
parser = argparse.ArgumentParser()
parser.add_argument('--gcp_project', type=str, required=True)
parser.add_argument('--bucket_name', type=str, required=True)
parser.add_argument('--table_name', type=str, default='csv_bigquery')
args, _ = parser.parse_known_args(sys.argv)

# Set up a subscriber for the source.
# The source will setup a Pub/Sub topic and subscription to listen to new files
# uploaded to the GCS bucket.
source = buildflow.GCSFileNotifications(project_id=args.gcp_project,
                                        bucket_name=args.bucket_name)
# Set up a BigQuery table for the sink.
# If this table does not exist yet BuildFlow will create it.
sink = buildflow.BigQuerySink(
    table_id=f'{args.gcp_project}.buildflow_walkthrough.{args.table_name}')


# Nested dataclasses can be used inside of your schemas.
@dataclasses.dataclass
class HourAggregate:
    hour: datetime.datetime
    stat: int


# Define an output type for our pipeline.
# By using a dataclass we can ensure our python type hints are validated
# against the BigQuery table's schema.
@dataclasses.dataclass
class AggregateWikiPageViews:
    date: datetime.date
    wiki: str
    title: str
    daily_page_views: int
    max_page_views_per_hour: HourAggregate
    min_page_views_per_hour: HourAggregate


flow = Flow()


# Define our processor.
@flow.processor(source=source, sink=sink)
def process(
        gcs_file_event: buildflow.GCSFileEvent
) -> List[AggregateWikiPageViews]:
    csv_string = gcs_file_event.blob.decode()
    csv_reader = csv.DictReader(io.StringIO(csv_string))
    aggregate_stats = {}
    for row in csv_reader:
        timestamp = datetime.datetime.strptime(row['datehour'],
                                               '%Y-%m-%d %H:%M:%S.%f %Z')
        wiki = row['wiki']
        title = row['title']
        views = row['views']

        key = (wiki, title)
        if key in aggregate_stats:
            stats = aggregate_stats[key]
            stats.daily_page_views += views
            if views > stats.max_page_views_per_hour.stat:
                stats.max_page_views_per_hour = HourAggregate(timestamp, views)
            if views < stats.min_page_views_per_hour.stat:
                stats.min_page_views_per_hour = HourAggregate(timestamp, views)
        else:
            aggregate_stats[key] = AggregateWikiPageViews(
                date=timestamp.date(),
                wiki=wiki,
                title=title,
                daily_page_views=views,
                max_page_views_per_hour=HourAggregate(timestamp, views),
                min_page_views_per_hour=HourAggregate(timestamp, views),
            )

    return list(aggregate_stats.values())


# Run your flow.
flow.run().output()
```

## Cleaning Up

Make sure to clean up the resources you created to avoid extra GCP costs.

Delete the Pub/Sub subscription:

```
gcloud pubsub subscriptions delete projects/$GCP_PROJECT/subscriptions/${BUCKET_NAME}_subscriber
```

Delete the Pub/Sub topic:

```
gcloud pubsub topics delete projects/$GCP_PROJECT/topics/${BUCKET_NAME}_notifications
```

Delete the BigQuery table:

```
bq rm --project_id=$GCP_PROJECT buildflow_walkthrough.csv_bigquery
```

Delete the GCS Bucket:

```
gcloud storage rm --recursive gs://$BUCKET_NAME/
```
