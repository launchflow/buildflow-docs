# Apply

The plan command will create / update all resources that are used by the current BuildFlow Node.

Arguments:
- `app`: The BuildFlow node/app to destroy.


Run `buildflow apply --help` to see available options:

```
$ buildflow apply --help
Usage: buildflow apply [OPTIONS] APP

  Apply all resources used by a buildflow flow or grid

Arguments:
  APP  The app to plan  [required]

Options:
  --app-dir TEXT  The directory to look for the app in, by adding this to
                  `sys.path` we default to looking in the directory.
  --help          Show this message and exit.
```