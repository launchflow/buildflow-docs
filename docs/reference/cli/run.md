# Run

The plan command will run the current BuildFlow Node.

Arguments:
- `app`: The BuildFlow node/app to run.

Options:
- `start-runtime-server`: Whether to start the server for the running application (defaults to `False`).
- `runtime-server-host`: If `start-runtime-server` is set, this is the host it will run on (defaults to 127.0.0.1)
- `runtime-server-port`: If `start-runtime-server` is set, this is the port it will run on (defaults to 9653)
- `run-id`: The run id to use for this run this will be included in any metrics. (defaults to None)

Run `buildflow run --help` to see available options:

```
$ buildflow run --help
Usage: buildflow run [OPTIONS] APP

  Run a buildflow flow.

Arguments:
  APP  The flow app to run  [required]

Options:
  --start-runtime-server / --no-start-runtime-server
                                  Whether to start the server for the running
                                  application.  [default: no-start-runtime-server]
  --runtime-server-host TEXT      The host to use for the flow server.
                                  [default: 127.0.0.1]
  --runtime-server-port INTEGER   The port to use for the flow server.
                                  [default: 9653]
  --run-id TEXT                   The run id to use for this run.
  --app-dir TEXT                  The directory to look for the app in, by
                                  adding this to `sys.path` we default to
                                  looking in the directory.
  --help                          Show this message and exit.
```