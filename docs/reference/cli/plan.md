# Plan

The plan command will output all resources that need to be created / destroyed by the current BuildFlow Node.

Arguments:
- `app`: The BuildFlow node/app to destroy.


Run `buildflow plan --help` to see available options:

```
$ buildflow plan --help
Usage: buildflow plan [OPTIONS] APP

  Output all resources used by a buildflow flow or grid

Arguments:
  APP  The app to plan  [required]

Options:
  --app-dir TEXT  The directory to look for the app in, by adding this to
                  `sys.path` we default to looking in the directory.
  --help          Show this message and exit.

```