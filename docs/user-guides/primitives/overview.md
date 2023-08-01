# Primitives


:::tip

A full list of provided primitives can be found [here](../../category/primitives/)

:::

Primitives are a resource that can be read from, written to, or managed by BuildFlow. For pipeline, they are used for the `source` and `sink`.

## Primitive Resource Management

A primimitive not only defines the input and output. With BuildFlow you are also defining resources that can be created and destroyed as part of your Flow.


### Resource Creation

Resource creation can be done by simply running:

```bash
buildflow apply main:app
```

This will print out a plan of everything that will be created. If you are happy with the plan you can run type: `yes` to accept it.

:::tip

You may notice that often an individual primitive creates and managed multiple resources in order to accomplish reading or writing.

For instance writing to Snowflake takes over 15 resources!

:::

### Resource Destruction

Resource destruction can be done by simply running:

```bash
buildflow destroy main:app
```

Similiar to apply this will print out all resources that will be destroyed. If you are happy with the plan you can run type: `yes` to accept it.