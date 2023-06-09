# Resource Types

Resource Types are what define the source and sink of your processor. BuildFlow provides many resource types out of the box but you can also create your own. To create your own please read more about creating custom resource types [here](../providers/custom-providers).

## All Resource Types:

- GCP
    - [BigQuery](gcp/gcp_bigquery)
    - [GCS](gcp/gcp_storage)
    - [PubSub](gcp/gcp_pubsub)
- Cloud Agnostic
    - [File](local/file)
    - [Pulsing](local/pulsing)