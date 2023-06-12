# Destroy

The destroy command will delete all resources that are used by the current BuildFlow Node.

Arguments:
- `app`: The BuildFlow node/app to destroy.

Run `buildflow destroy --help` to see available options:


```bash
buildflow destroy --help
                                                                                             
 Usage: buildflow destroy [OPTIONS] APP                                                      
                                                                                             
 Destroy all resources used by a buildflow node or grid                                      
                                                                                             
╭─ Arguments ───────────────────────────────────────────────────────────────────────────────╮
│ *    app      TEXT  The app to plan [default: None] [required]                            │
╰───────────────────────────────────────────────────────────────────────────────────────────╯
╭─ Options ─────────────────────────────────────────────────────────────────────────────────╮
│ --app-dir        TEXT  The directory to look for the app in, by adding this to `sys.path` │
│                        we default to looking in the directory.                            │
│ --help                 Show this message and exit.                                        │
╰───────────────────────────────────────────────────────────────────────────────────────────╯


```