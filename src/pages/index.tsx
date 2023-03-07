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
    <div className="hero w-screen overflow-hidden">
      <div className="z-10 relative blur-[8em]">
        <div className="absolute left-[10vw] top-[-10vh] h-[30vw] w-[30vw] bg-[#7056f5] rounded-full animate-scale-md"></div>
        <div className="absolute left-[50vw] top-[-20vh] h-[30vw] w-[30vw] bg-[#9f45b0] rounded-full animate-scale-md-delay"></div>
        {/* <div className="absolute left-[30vw] h-[30vw] w-[30vw] bg-[#375394] rounded-full animate-scale-lg"></div> */}
      </div>
      <div className="z-20 container mx-auto flex flex-row text-center gap-4">
        <div className="container flex flex-col text-center justify-center content-center gap-4">
          <div className="flex flex-row justify-center gap-4">
            <div className="flex flex-row">
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
          </div>
          <p
            // style={{ textShadow: "1px 1px 10px #000" }}
            className="lg:text-5xl md:text-3xl sm:text-2xl m-0 p-0"
          >
            {siteConfig.tagline}
          </p>
        </div>
        <div className="flex content-center">
          <ThemedImage
            className="rounded-lg"
            alt="Docusaurus themed image"
            sources={{
              light: useBaseUrl("/img/code.png"),
              dark: useBaseUrl("/img/code.png"),
            }}
          />
        </div>
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
