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
    <div className="hero w-screen overflow-hidden p-10 flex justify-center">
      <div className="z-10 relative blur-[8em]">
        <div className="absolute left-[10vw] top-[-10vh] h-[30vw] w-[30vw] bg-[#7056f5] rounded-full animate-scale-md"></div>
        <div className="absolute left-[50vw] top-[-20vh] h-[30vw] w-[30vw] bg-[#9f45b0] rounded-full animate-scale-md-delay"></div>
        {/* <div className="absolute left-[30vw] h-[30vw] w-[30vw] bg-[#375394] rounded-full animate-scale-lg"></div> */}
      </div>
      <div className="z-20 flex-grow flex flex-col md:flex-row lg:flex-row gap-6 text-center justify-evenly content-center max-w-[90vw]">
        <div className="flex flex-col gap-2 text-center justify-center content-center">
          <div className="flex flex-row justify-center">
            <h1
              // style={{ textShadow: "1px 1px 10px #000" }}
              className="lg:text-7xl md:text-5xl sm:text-5xl m-0 p-0 font-normal"
            >
              Build
            </h1>
            <h1
              // style={{ textShadow: "1px 1px 10px #000" }}
              className="lg:text-7xl md:text-5xl sm:text-5xl m-0 p-0 font-semibold"
            >
              Flow
            </h1>
          </div>
          <p
            // style={{ textShadow: "1px 1px 10px #000" }}
            className="lg:text-5xl md:text-3xl sm:text-2xl m-0 p-0"
          >
            {siteConfig.tagline}
          </p>
        </div>
        <ThemedImage
          className="rounded-lg max-w-[100%]"
          alt="Docusaurus themed image"
          sources={{
            light: useBaseUrl("/img/code.png"),
            dark: useBaseUrl("/img/code.png"),
          }}
        />
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <HomepageFeatures />
    </Layout>
  );
}
