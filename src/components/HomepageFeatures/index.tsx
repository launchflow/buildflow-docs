import React from "react";

type FeatureItem = {
  title: string;
  description: string;
  learn_more: string;
};


function Feature({ title, description, learn_more }: FeatureItem) {
  return (
    <div className="card">
      <div className="card__header">
        <h3>{title}</h3>
      </div>
      <div className="card__body">
        <p>
          {description}
        </p>
      </div>
      <div className="card__footer">
        <a className="button button--secondary button--block" href={learn_more}>Learn More</a>
      </div>
    </div>
  );
}


export default function HomepageFeatures(): JSX.Element {
  return (
    <div className="flex flex-row justify-center p-6 card-holder">
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[90vw] md:max-w-[80vw] gap-6">
        <div className="">
          {Feature({ title: "Scalable By Default", description: "BuildFlow will automatical scale to whatever your current demands are. This ensures your system can handle any surge in traffic while still be cost effective during low traffic periods.", learn_more: "docs/features/autoscaling" })}
        </div>
        <div className="">
          {Feature({ title: "Infrastructure From Code", description: "BuildFlow determines what infrastructure and resources your code is using and can create and manage them for your.", learn_more: "docs/features/infrastructure-from-code" })}
        </div>
        <div className="">
          {Feature({ title: "Async Runtime", description: "BuildFlow runs in an asyncrounous Ray runtime allowing you to easily scale out parallel tasks with Ray or any other async framework.", learn_more: "docs/features/parallelism" })}
        </div>
        <div className="">
          {Feature({ title: "Real-Time File Ingestion", description: "Learn how to use BuildFlow to run images through an image classification model in real-time.", learn_more: "docs/walkthroughs/realtime-image-classification" })}
        </div>
        <div className="">
          {Feature({ title: "Production Ready Connectors", description: "Use any of our existing BuildFlow primitives to connect to any resource in any cloud. Including AWS, GCP, Snowflake, and DuckDB", learn_more: "docs/category/primitives" })}
        </div>
        <div className="">
          {Feature({ title: "LaunchFlow", description: "You can use LaunchFlow to automatically deploy and manage your BuildFlow Nodes and processors.", learn_more: "https://www.launchflow.com" })}
        </div>
      </div>
    </div>
  );
}
