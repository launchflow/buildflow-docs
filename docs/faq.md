# FAQ

<details className="clear">
    <summary mdxType="summary">Can BuildFlow really scale to handle any load?</summary>
    We haven't tested BuildFlow with every possible traffic pattern. But we're confident with the right tuning it should be able to handle the vst majority of use cases. If you have any specific questsion we would love to hear more about you specific use case in our <a href="https://discordapp.com/invite/wz7fjHyrCA">discord server</a>

</details>


<details className="clear">
    <summary mdxType="summary">Why doesn't BuildFlow support [X]?</summary>
    Content

</details>

<details className="clear">
    <summary mdxType="summary">Why isn't BuidFlow as effecient as system [X]?</summary>
    With BuildFlow we have been focused on developer experience and correctness. We want someone to be able to be able to get started with BuildFlow in a matter of minutes without having to worry about the correctness of the underlying runtime. At the same time we chose to build our runtime on top of <a href="https://www.ray.io">Ray</a> which has shown to be one of the most powerfull distributed computing frameworks available. So as we continue to improve BuildFlow you can expect to see it become more and more effecient.

</details>

<details className="clear">
    <summary mdxType="summary">How does BuildFlow integrate with Ray?</summary>
    BuildFlow's run time is build on top of ray. This allows your processor to scale to any size and handle any load. It also allows you to take advantage of our <a href="user-guides/processors/async-processors">async run time</a> inside of your processor.

</details>

<details className="clear">
    <summary mdxType="summary">How does BuildFlow handle infrastructure creation / management?</summary>
    BuildFlow resource orchestration is built on top of <a href="https://www.pulumi.com">Pulumi</a>. BuildFlow is not opinionated about how you manage your Pulumi stack and encourages you to use <a href="https://www.pulumi.com/product/pulumi-cloud/">Pulumi Cloud</a> or any other form of <a href="https://www.pulumi.com/docs/concepts/state/#using-a-self-managed-backend">remote stack storage.</a>
</details>


<details className="clear">
    <summary mdxType="summary">What is the difference between BuildFlow and LaunchFlow?</summary>
    BuildFlow is an open source framework for designing and building your application. LaunchFlow is a serverless platform that allows you to instantly deploy your BuildFlow application to the cloud.

</details>




<!-- <Details className="clear">
    <summary mdxType="summary">Why isn't BuidFlow as effecient as system [X]?</summary>

    CONTENT
</Details>

<Details className="clear">
    <summary mdxType="summary">How does BuildFlow integrate with Ray?</summary>

    CONTENT
</Details>

<Details className="clear">
    <summary mdxType="summary">How does BuildFlow integrate with Pulumi?</summary>

    CONTENT
</Details>

<Details className="clear">
    <summary mdxType="summary">What is the difference between BuildFlow and LaunchFlow?</summary>

    TODO
</Details> -->