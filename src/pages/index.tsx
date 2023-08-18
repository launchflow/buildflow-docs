import React from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CodeBlock from "@theme/CodeBlock";
import Layout from "@theme/Layout";
import HomepageFeatures from "../components/HomepageFeatures";

// blur-[8em]
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className="hero p-4 flex-col justify-evenly md:flex-row md:gap-0 md:p-6">
      <div className="flex flex-col text-center md:text-left ">
        <h1 className="hero__title">BuildFlow</h1>
        <p className="hero__subtitle">
          Build a distributed system in less than 20 lines of code.
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
      <CodeBlock
        className="rounded-lg max-w-[50vw] w-full hero-code hidden md:block"
        language="py"
        showLineNumbers
      >
        {`
from typing import Any, Dict

from buildflow import Flow
from buildflow.io.portable import AnalysisTable, Topic

app = Flow()

@app.pipeline(
  source=Topic(topic_id="input-topic"),
  sink=AnalysisTable("output-table"))
def process(element: Dict[str, Any]):
    return element

`}
      </CodeBlock>
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
