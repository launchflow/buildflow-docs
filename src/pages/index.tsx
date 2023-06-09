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
    <div className="hero p-4 flex-col gap-6 justify-evenly md:flex-row md:gap-0 md:p-6">
      <div className="flex flex-col text-center md:text-left ">
        <h1 className="hero__title">BuildFlow</h1>
        <p className="hero__subtitle">
          Build your entire system in minutes using Python
        </p>
        <div>
          <a
            className="button button--secondary button--lg"
            href="docs/install"
          >
            Get Started
          </a>
        </div>
      </div>
      <ThemedImage
        className="rounded-lg max-w-[100%] md:max-w-[44%]"
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
