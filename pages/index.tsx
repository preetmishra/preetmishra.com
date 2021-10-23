import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { AUTHOR_FULL_NAME } from "../lib/constants";
import { getPosts } from "../lib/mdx";
import { humanizeDate } from "../lib/utils";

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
  const getPostLink = (slug: string): string => `/posts/${slug}`;

  return (
    <>
      <Head>
        <title>{AUTHOR_FULL_NAME}</title>
      </Head>
      <section className="space-y-12 font-serif md:space-y-16">
        {posts.map(
          (
            { frontmatter: { title, published, description }, slug },
            index,
          ) => (
            <article key={index} className="flex flex-col space-y-6">
              <section className="space-y-2">
                <h2 className="text-2xl font-medium tracking-tight text-gray-900">
                  <Link href={getPostLink(slug)}>{title}</Link>
                </h2>
                <p className="text-sm tracking-wide text-gray-500">
                  {humanizeDate(published)}
                </p>
              </section>
              <p className="text-gray-700">{description}</p>
              <Link href={getPostLink(slug)}>Read More</Link>
            </article>
          ),
        )}
      </section>
    </>
  );
};

export default Home;
