import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Navbar from "../components/Navbar";
import { getBlogList } from "../lib/mdx";

type Props = {
  blogs: Array<{ frontmatter: Record<string, any>; slug: string }>;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      blogs: getBlogList(),
    },
  };
};

const Home: NextPage<Props> = ({ blogs }) => {
  return (
    <>
      <Head>
        <title>Preet Mishra</title>
      </Head>
      <Navbar />
      <section>
        {blogs.map(({ frontmatter: { title }, slug }, index) => (
          <h2 key={index}>
            <Link href={`/blogs/${slug}`}>{title}</Link>
          </h2>
        ))}
      </section>
    </>
  );
};

export default Home;
