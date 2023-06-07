import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy",
    Svg: require("@site/static/img/relieved.svg").default,
    description: (
      <>
        Easy to use and learn. <a href="/docs#quickstart">Get started</a> with a
        few lines of code.
      </>
    ),
  },
  {
    title: "Fast",
    Svg: require("@site/static/img/lightning.svg").default,
    description: (
      <>
        Scalable multiprocessing powered by{" "}
        <a href="https://docs.ray.io/en/latest/ray-overview/">Ray</a>.
      </>
    ),
  },
  {
    title: "Production Ready",
    Svg: require("@site/static/img/rocket.svg").default,
    description: (
      <>
        Ready made <a href="/docs/io-connectors/overview">I/O Connectors</a> let
        you focus on processing data instead of reading / writing data.
      </>
    ),
  },
  {
    title: "Open Source",
    Svg: require("@site/static/img/lock.svg").default,
    description: (
      <>
        <b>BuildFlow</b> is released under the Apache 2.0 license.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--6")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3 className="text-3xl">{title}</h3>
        <p className="text-xl">{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
