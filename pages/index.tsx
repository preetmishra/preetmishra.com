import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Navbar from "../components/Navbar";
import { getPosts } from "../lib/mdx";

type Props = {
  posts: Array<{ frontmatter: Record<string, any>; slug: string }>;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: getPosts(),
    },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Preet Mishra</title>
      </Head>
      <Navbar />
      <section>
        {posts.map(({ frontmatter: { title }, slug }, index) => (
          <h2 key={index}>
            <Link href={`/posts/${slug}`}>{title}</Link>
          </h2>
        ))}
      </section>
    </>
  );
};

export default Home;
