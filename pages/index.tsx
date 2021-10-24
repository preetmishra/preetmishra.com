import { NextPage } from "next";
import Head from "next/head";

import { AUTHOR_FULL_NAME } from "../lib/constants";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{AUTHOR_FULL_NAME}</title>
      </Head>
    </>
  );
};

export default Home;
