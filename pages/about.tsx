import { NextPage } from "next";
import Head from "next/head";

import { AUTHOR_FULL_NAME } from "../lib/constants";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About {AUTHOR_FULL_NAME}</title>
      </Head>
      <section>
        <h1>About</h1>
        <p>Preet Mishra</p>
      </section>
    </>
  );
};

export default About;
