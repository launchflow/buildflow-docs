import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import ThemedImage from "@theme/ThemedImage";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "../components/HomepageFeatures";

// blur-[8em]
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className="hero hero--primary">
      <div className="container">
        <h1 className="hero__title">BuildFlow</h1>
        <p className="hero__subtitle">build your entire system in minutes using Python</p>
        <div>
          <button className="button button--secondary button--lg">Get Started</button>
        </div>
      </div>
      <ThemedImage
        className="rounded-lg max-w-[100%]"
        alt="BuildFlow Code"
        sources={{
          light: useBaseUrl("/img/code.png"),
          dark: useBaseUrl("/img/code.png"),
        }}
      />
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} | ${siteConfig.tagline}`}
      description="BuildFlow is a Python framework for building and managing your entire system."
    >
      <HomepageHeader />
      <HomepageFeatures />

    </Layout>
  );
}
