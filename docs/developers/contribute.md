# Contribute

We welcome any and all types of contribution! Whether you want to report a bug, request a feature, or submit a pull request, we are always grateful for help.

## Communications

For general discussion we recommend the [development channel](https://discord.gg/647F4vtbR7) in discord. This channel is geared towards developers working on BuildFlow. If you have questions regarding a specific issue please comment on that issue.

## Finding Work

If you have an issue in mind feel free to assign it to yourself, and if you have specific questions while working on it feel free to tag @JoshTanke or @CalebTVanDyke in a comment, or reach out directly on discord as well.

If you don't have an issue in mind please reach out on discord and we can discuss what a good starter issue would be.

## Developing

### Setup Development Environment
1. Make a fork of the repository: https://github.com/launchflow/buildflow
2. Clone the forked repo wherever you like
3. Install dev python dependencies:

:::tip

We recommend using [`pyenv`](https://github.com/pyenv/pyenv) to help isolate python dependencies.

:::

```bash
pip install .[dev]
```

4. Install pulumi: https://www.pulumi.com/docs/install/
5. Install pre-commit hooks:

```bash
pre-commit install
```

6. Begin your work!

### Submitting a Pull Request

When opening a pull request it should automatically get assigned to an owner for code reviewer. If you have a specific person in mind to review your code please tag them in the pull request.

Feel free to @ the reviewer in discord to let them know they were assigned a review, or if you have any questions.