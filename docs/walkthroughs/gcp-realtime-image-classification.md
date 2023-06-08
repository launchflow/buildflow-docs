# GCP Real-Time Image Classification

In this walkthrough we will watch files as they are uploaded to cloud storage
and use [ImageAI](https://github.com/OlafenwaMoses/ImageAI)
to classify what the image contains.

Before completing the walkthrough ensure you have [installed BuildFlow](../install)
with all [extra dependencies](../install#extra-dependencies).

All the code for this walkthrough can be found at: https://github.com/launchflow/buildflow-gcp-image-classification

In this walkthrough we will:

- Setup your development enviornment
- Clone the github repository
- Walkthrough the code
- Run locally
- Launch a LaunchFlow deployment to run at scale

### Clone the GitHub repository


```
git clone git@github.com:launchflow/buildflow-gcp-image-classification.git 
```
  

### Setup your development enviornment

BuildFlow supports any python version >=3.8. Ensure you have a recent
version of python installed with:

```
python3 --version
```

If you don’t have a Python interpreter, you can download and install it from the
[Python downloads page](https://devguide.python.org/versions/).

Once you have an approriate python version installed we recommended using a python
virtual environment for all local development. This helps isolate the python dependencies
from this project from your system installation.

```
cd buildflow-gcp-image-classification
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

:::tip

If you are on Mac and use `pyenv` to manage your python installations / virtual environments
you will need to install `xz` to ensure the model dependencies will work.

```
brew install xz
pyenv uninstall <desired-python-version>
pyenv install <desired-python-version>
```

:::


### Code Walkthrough

In this section we will walkthrough individual bits of the code to make sure 
you understanding everything. You can go to the [next section](#create-your-resources) if you want to jump right into running.

Overall our BuildFlow processor will:

- listen to image uploads to a GCP bucket
- run them through an image classification model
- finally write the output to BigQuery

#### Repository Structure

- **main.py** - this is our main python file which contains all of our logic
- **requirements.txt** - defines all of the requirements for our code
- **resnet50-19c8e357.pth** - the image classification model we will send the images through

#### Code

First we define some constants for which GCP project to use and what the name of
the bucket should be. You can set `GCP_PROJECT` to the GCP project you plan to use.
'BUCKET_NAME' can be any unique string. BuildFlow will handle creating and resources and 
setting up all the wiring to ensure your processor can listen to file uploads to this bucket.

```python
# TODO(developer): fill these in.
GCP_PROJECT = 'TODO'
BUCKET_NAME = 'TODO'
```

Next we define our output schema. Here we can use dataclasses to describe what the
schema of our BigQuery table will be. BuildFlow will take this schema, and either create 
a new BigQuery table if your output table doesn't exist, or it will validate that your
schema matches. All of this is done before your processor begins running to ensure that
errors are caught as quickly as possible.

:::tip

You can even nest dataclasses to get a nested structure in your BigQuery table.

:::

```python
@dataclasses.dataclass
class Classification:
    classification: str
    confidence: float


@dataclasses.dataclass
class ImageClassificationRow:
    image_name: str
    upload: str
    classifications: List[Classification]
```

Now we create our Node which is a container for our processors. We can add as many processors as we like, but will only use one for this walkthrough.

```python
app = Node()
```

Then we define our BuildFlow processor and our
[source](https://www.buildflow.dev/docs/apis/processor#source) and
[sink](https://www.buildflow.dev/docs/apis/processor#sink).
Here we are saying we want to receive file notifications for this GCS bucket and output
them to our configured BigQuery table.

Our source is [GCSFileStream](https://www.buildflow.dev/docs/apis/providers/gcp/gcp_storage#gcsfilestream)
and our sink is a [BigQueryTable](https://www.buildflow.dev/docs/apis/providers/gcp/gcp_bigquery).

:::tip

We use a `Processor` class because we require state. If our processor required no state we could use the processor decorator with `@app.processor(source=..., sink=...)` to turn any function into a processor.

:::

```python
class ImageClassificationProcessor(buildflow.Processor):
    def source(self):
        return buildflow.io.GCSFileStream(
            project_id=GCP_PROJECT, bucket_name=BUCKET_NAME
        )

    def sink(self):
        return buildflow.io.BigQueryTable(
            table_id=f"{GCP_PROJECT}.launchflow_walkthrough.image_classification",
            destroy_protection=False
        )
```

After our source and sink, we setup the state for our model. Here we use the BuildFlow
[`setup`](https://www.buildflow.dev/docs/apis/processor#setup) method to load in our model.
This ensure we don't have to re-load the model each time a new file is uploaded.

```python
    def setup(self):
        self.execution_path = os.path.dirname(os.path.realpath(__file__))
        self.prediction = ImageClassification()
        self.prediction.setModelTypeAsResNet50()
        self.prediction.setModelPath(
            os.path.join(self.execution_path, "resnet50-19c8e357.pth"))
        self.prediction.loadModel()
```

Finally we define our process logic. This is the method that is actually called when
a new file is uploaded to the GCS bucket.

The logic is as follows:

1. Create a temporary file and write the output to (our model requires the bytes to be written locally)
2. Run the local image through the model
3. Tempfile is cleaned up after the model is complete
4. Convert the model output into our output schema and return it

The returned object will then be written to BigQuery.

```python
    def process(
        self, gcs_file_event: buildflow.io.GCSFileEvent
    ) -> ImageClassificationRow:
        with tempfile.TemporaryDirectory() as td:
            file_path = os.path.join(td, gcs_file_event.metadata['objectId'])
            with open(file_path,'wb') as f:
                f.write(gcs_file_event.blob)
            predictions, probabilities = self.prediction.classifyImage(
                file_path, result_count=5)
        classifications = []
        for predicition, probability in zip(predictions, probabilities):
            classifications.append(Classification(predicition, probability))
        return ImageClassificationRow(
            image_name=gcs_file_event.metadata['objectId'],
            upload=pd.Timestamp(gcs_file_event.metadata['eventTime']),
            classifications=classifications,
        )
```

### Create Your Resources

Before you can run your processor locally you will need to create all the resources that is uses. This includes:
- GCS bucket
- Pub/Sub topics and subscriptions
- GCS notifications
- BigQuery Dataset
- BigQuery Table

With BuildFlow this can all be done automtically without every having to visit the GCP cloud console.

To create up your resources run:

```
buildflow plan main:app
```

This will show you what resource it is going to create and ask you to confirm. If you are happy press `y`.

### Run BuildFlow Processor

```
buildflow run main:app
```

Once the pipeline is running you can upload images to the GCS bucket and see the output in BigQuery.

```
GCP_PROJECT=<your gcp project>
BUCKET_NAME=<your bucket name>
BQ_TABLE=${GCP_PROJECT}.launchflow_walkthrough.image_classification
gsutil cp <path to image> gs://${BUCKET_NAME}
bq query "SELECT * FROM ${BQ_TABLE}"
```

### Clean Up Your Resources

Once you're all done you can clean up all your resources with a single command.

To clean up your resources run:

```
buildflow destroy main:app
```

### What's Next?

- [Learn more about BuildFlow Concepts](../key-concepts)
- [Use LaunchFlow to iterate directly in VSCode](https://docs.launchflow.com/vscode/overview)
- [Use LaunchFlow to deploy your pipeline remotely](https://docs.launchflow.com/walkthroughs/file-ingestion#launch-a-launchflow-deployment)