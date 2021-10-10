import { NextPage } from "next";
import Head from "next/head";

import Navbar from "../components/Navbar";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Navbar />
      <section>
        <h1>About</h1>
        <p>Preet Mishra</p>
      </section>
    </>
  );
};

export default About;
