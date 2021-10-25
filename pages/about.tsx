import { NextPage } from "next";
import Head from "next/head";
import { FunctionComponent } from "react";

import ExternalLinkWithIcon from "../components/ExternalLinkWithIcon";
import GitHub from "../components/icons/GitHub";
import LinkedIn from "../components/icons/LinkedIn";
import Twitter from "../components/icons/Twitter";
import { AUTHOR_FIRST_NAME, AUTHOR_FULL_NAME } from "../lib/constants";

const ExternalLinks: FunctionComponent = () => {
  const UTILITY_EXTERNAL_LINKS =
    "w-5 h-5 md:w-7 md:h-7 text-gray-800 hover:text-gray-600";

  return (
    <>
      <ExternalLinkWithIcon
        href="https://www.github.com/preetmishra"
        icon={<GitHub className={UTILITY_EXTERNAL_LINKS} />}
      />
      <ExternalLinkWithIcon
        href="https://www.linkedin.com/in/preetmishra/"
        icon={<LinkedIn className={UTILITY_EXTERNAL_LINKS} />}
      />
      <ExternalLinkWithIcon
        href="https://twitter.com/wickedmishra"
        icon={<Twitter className={UTILITY_EXTERNAL_LINKS} />}
      />
    </>
  );
};

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About {AUTHOR_FULL_NAME}</title>
      </Head>
      <section className="flex flex-col-reverse space-y-8 space-y-reverse font-serif md:justify-between md:flex-row md:space-y-0">
        <section className="flex flex-col justify-between space-y-6 md:space-y-8">
          <section className="space-y-1 md:space-y-2">
            <p className="text-2xl font-bold text-gray-900 md:text-4xl">
              Hi 👋
            </p>
            <h1 className="space-x-2 text-xl font-semibold text-gray-500 md:text-2xl">
              I am {AUTHOR_FIRST_NAME}, I am a full-time Software
              Engineer.
            </h1>
          </section>
          <section className="flex flex-row space-x-4">
            <ExternalLinks />
          </section>
        </section>
        <img
          className="flex-none w-24 h-24 rounded-full md:ml-2 md:-mr-4 sm:w-32 sm:h-32 md:w-48 md:h-48 filter drop-shadow-sm"
          src="/images/avatar.jpeg"
          alt={AUTHOR_FULL_NAME}
        />
      </section>
    </>
  );
};

export default About;
