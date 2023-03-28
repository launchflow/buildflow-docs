# AQS SWS

:::note

AWS SQS support is currenty in prototype mode, and only SQS as a source is supported.

:::

**SQS** refers to Amazon's SQS service. It is a **streaming** source connector.

Messages are sent to the processor 1 at a time. If you need to emit mulitple outputs, you should return an interable (list, generator, etc.)

To use the source you must have AWS credentials configured on your machine. See: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html

## Source Output Type

The SQS source will return one message at a time with the same dictionary format as the [AWS python SDK](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/sqs/client/receive_message.html) returns.

```code
{
    'MessageId': 'string',
    'ReceiptHandle': 'string',
    'MD5OfBody': 'string',
    'Body': 'string',
    'Attributes': {
        'string': 'string'
    },
    'MD5OfMessageAttributes': 'string',
    'MessageAttributes': {
        'string': {
            'StringValue': 'string',
            'BinaryValue': b'bytes',
            'StringListValues': [
                'string',
            ],
            'BinaryListValues': [
                b'bytes',
            ],
            'DataType': 'string'
        }
    }
},
```

## Source Class Definition

If the queue name does not exist we will attempt to create it.

```python
class SQSSource(io.StreamingSource):
    queue_name: str
    queue_owner_aws_account_id: str = ''
```
