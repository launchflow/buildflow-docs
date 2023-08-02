# Credentials

## GCP Credentials

```python
class GCPCredentials(Credentials):
    def __init__(self, credentials_options: CredentialsOptions) -> None:
        super().__init__(credentials_options)
        self.service_account_info = (
            credentials_options.gcp_credentials_options.service_account_info
        )

    def get_creds(self, quota_project_id: str = None):
        if self.service_account_info is not None:
            creds = service_account.Credentials.from_service_account_info(
                json.loads(self.service_account_info),
            )
            if creds.project_id != quota_project_id:
                creds = creds.with_quota_project(quota_project_id)
            return creds
        else:
            try:
                creds, _ = google.auth.default(quota_project_id=quota_project_id)
                return creds
            except exceptions.DefaultCredentialsError:
                # if we failed to fetch the credentials fall back to anonymous
                # credentials. This shouldn't normally happen, but can happen if
                # user is running on a machine with now default creds.
                logging.warning(
                    "no default credentials found, using anonymous credentials"
                )
                return google.auth.credentials.AnonymousCredentials()
```

## AWS Credentials

```python
class AWSCredentials(Credentials):
    def __init__(self, credentials_options: CredentialsOptions) -> None:
        super().__init__(credentials_options)

        self.access_key_id = credentials_options.aws_credentials_options.access_key_id
        self.secret_access_key = (
            credentials_options.aws_credentials_options.secret_access_key
        )
        self.session_token = credentials_options.aws_credentials_options.session_token
```

## Empty Credentials

```python
class EmptyCredentials(Credentials):
    """Empty credentials used by strategies that don't need credentials."""

    def __init__(self, credentials_options: CredentialsOptions) -> None:
        super().__init__(credentials_options)
```