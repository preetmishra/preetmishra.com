import Head from "next/head";
import Link from "next/link";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getPosts } from "../../lib/mdx";
import { humanizeDate, parseTags } from "../../lib/utils";
import {
  AUTHOR_FULL_NAME,
  AUTHOR_TWITTER_HANDLE,
} from "../../lib/constants";
import SolidCross from "../../components/icons/SolidCross";
import { ROUTE_BLOG } from "../../lib/routes";
import Button from "../../components/Button";

const TITLE = `The ${AUTHOR_FULL_NAME} Blog`;
const DESCRIPTION = `Take a deep dive into the ${AUTHOR_FULL_NAME} blog.`;

type Props = {
  posts: Array<{ frontmatter: Record<string, any>; slug: string }>;
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPosts();

  return {
    props: {
      posts: posts,
    },
  };
};

const Posts: NextPage<Props> = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const router = useRouter();
  const {
    query: { tag },
  } = router;

  useEffect(() => {
    if (!tag) {
      setFilteredPosts(posts);
      return;
    }

    setFilteredPosts(() => {
      return posts.filter(({ frontmatter: { tags } }) => {
        return parseTags(tags).includes(tag.toString());
      });
    });
  }, [tag, posts]);

  const getPostLink = (slug: string): string => `/blog/${slug}`;

  const resetFilter = () => {
    router.push({
      pathname: ROUTE_BLOG,
      query: {},
    });
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
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
      <section className="flex flex-col space-y-10 font-serif md:max-w-2xl">
        {tag && (
          <section className="flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 tracking-wide text-gray-500 bg-gray-100 rounded-md dark:bg-gray-500/25 dark:text-gray-50">
            <p>
              Showing results for <b>{tag}</b>
            </p>
            <button onClick={resetFilter}>
              <SolidCross className="w-4 h-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" />
            </button>
          </section>
        )}
        <section className="space-y-10 md:space-y-16">
          {filteredPosts.map(
            (
              { frontmatter: { title, published, description }, slug },
              index,
            ) => (
              <article key={index} className="flex flex-col space-y-4">
                <section className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {humanizeDate(published)}
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
                    <Link href={getPostLink(slug)}>{title}</Link>
                  </h2>
                </section>
                <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                  {description}
                </p>
                <Link href={getPostLink(slug)}>
                  <a className="font-medium tracking-tight text-gray-900 dark:text-gray-50">
                    Read more
                  </a>
                </Link>
              </article>
            ),
          )}
        </section>
      </section>
    </>
  );
};

export default Posts;
