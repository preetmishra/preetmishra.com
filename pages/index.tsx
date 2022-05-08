import { NextPage } from "next";
import Head from "next/head";

import {
  AUTHOR_FIRST_NAME,
  AUTHOR_FULL_NAME,
  AUTHOR_TWITTER_HANDLE,
} from "../lib/constants";
import { ROUTE_ABOUT, ROUTE_BLOG } from "../lib/routes";
import Bink from "../components/Bink";
import Views from "../components/Views";

const TITLE = AUTHOR_FULL_NAME;
const DESCRIPTION = `Join ${AUTHOR_FULL_NAME} as he navigates through his personal and professional life.`;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{AUTHOR_FULL_NAME}</title>
        <meta name="description" content={DESCRIPTION} />

        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://preetmishra.com" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={AUTHOR_TWITTER_HANDLE} />
        <meta name="twitter:creator" content={AUTHOR_TWITTER_HANDLE} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
      </Head>
      <Views route="home" render={false} />
      <section className="flex flex-col justify-center h-[65vh] space-y-8 font-serif">
        <section className="space-y-1 md:space-y-2">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-50 md:text-4xl">
            Hi 👋
          </p>
          <h1 className="space-x-2 text-xl font-semibold text-gray-500 dark:text-gray-400 md:text-2xl">
            I am {AUTHOR_FIRST_NAME}, I am a full-time Software
            Engineer. I like making things simple.
          </h1>
        </section>
        <section className="flex flex-row flex-wrap gap-2">
          <Bink className="button button-primary" href={ROUTE_BLOG}>
            Checkout the blog
          </Bink>
          <Bink className="button button-secondary" href={ROUTE_ABOUT}>
            Know more
          </Bink>
        </section>
      </section>
    </>
  );
};

export default Home;
