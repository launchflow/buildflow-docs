# Run

The plan command will run the current BuildFlow Node.

Arguments:
- `app`: The BuildFlow node/app to run.

Options:"
- `disable-usage-stats`: Disables usage stats being sent to BuildFlow.
- `apply-infrastructure`: Wheter resources should be applied before running the node.
- `destroy-infrastructure`: Whether resources should be destroyed after running the node.


Run `buildflow run --help` to see available options:

```
buildflow run --help
                                                                                             
 Usage: buildflow run [OPTIONS] APP                                                          
                                                                                             
 Run a buildflow node.                                                                       
                                                                                             
╭─ Arguments ───────────────────────────────────────────────────────────────────────────────╮
│ *    app      TEXT  The node app to run [default: None] [required]                        │
╰───────────────────────────────────────────────────────────────────────────────────────────╯
╭─ Options ─────────────────────────────────────────────────────────────────────────────────╮
│ --disable-usage-stats       --no-disable-usage-sta…             Disable buildflow usage   │
│                                                                 stats                     │
│                                                                 [default:                 │
│                                                                 no-disable-usage-stats]   │
│ --apply-infrastructure      --no-apply-infrastruct…             Whether resources should  │
│                                                                 be created                │
│                                                                 [default:                 │
│                                                                 no-apply-infrastructure]  │
│ --destroy-infrastructure    --no-destroy-infrastru…             Whether resources should  │
│                                                                 be destroyed.             │
│                                                                 [default:                 │
│                                                                 no-destroy-infrastructur… │
│ --include-monitor           --no-include-monitor                Whether to include a      │
│                                                                 monitor for the running   │
│                                                                 node.                     │
│                                                                 [default:                 │
│                                                                 no-include-monitor]       │
│ --montior-host                                         TEXT     The monitor host.         │
│                                                                 [default: 127.0.0.1]      │
│ --monitor-port                                         INTEGER  The monitor port.         │
│                                                                 [default: 9653]           │
│ --app-dir                                              TEXT     The directory to look for │
│                                                                 the app in, by adding     │
│                                                                 this to `sys.path` we     │
│                                                                 default to looking in the │
│                                                                 directory.                │
│ --help                                                          Show this message and     │
│                                                                 exit.                     │
╰───────────────────────────────────────────────────────────────────────────────────────────╯

```