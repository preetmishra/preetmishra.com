import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getPosts } from "../../lib/mdx";
import { humanizeDate, parseTags } from "../../lib/utils";
import {
  AUTHOR_FULL_NAME,
  AUTHOR_TWITTER_HANDLE,
} from "../../lib/constants";
import SolidCross from "../../components/icons/SolidCross";
import { ROUTE_BLOG } from "../../lib/routes";
import Button from "../../components/Button";
import Views from "../../components/Views";

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
  const [focusIndex, setFocusIndex] = useState(-1);

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

  const handleFocus = (index: number) => {
    setFocusIndex(index);
  };

  const handleBlur = () => {
    setFocusIndex(-1);
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
      <Views route="blog" render={false} />
      <section className="flex flex-col space-y-12">
        {tag && (
          <section className="flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 tracking-wide text-gray-500 bg-gray-100 rounded-md dark:bg-gray-500/25 dark:text-gray-50">
            <p>
              Showing results for <b>{tag}</b>
            </p>
            <Button
              title="Clear filter results"
              className="button button-text"
              onClick={resetFilter}
            >
              <SolidCross className="w-4 h-4" />
            </Button>
          </section>
        )}
        <section className="space-y-10 md:space-y-12">
          {filteredPosts.map(
            (
              {
                frontmatter: {
                  title,
                  published,
                  description,
                  color,
                  banner,
                },
                slug,
              },
              index,
            ) => (
              <Link href={getPostLink(slug)} passHref key={index}>
                <a
                  className={`focus:outline-none block will-change-auto outline-none w-full hover:cursor-pointer group ${
                    focusIndex === index || focusIndex === -1
                      ? "opacity-100"
                      : "md:opacity-20"
                  } transition-opacity duration-500`}
                  onMouseOver={() => handleFocus(index)}
                  onMouseOut={handleBlur}
                  onFocus={() => handleFocus(index)}
                  onBlur={handleBlur}
                >
                  <article className="h-full w-full flex justify-between relative">
                    <section className="flex flex-col-reverse space-y-reverse md:flex-row space-y-1 md:space-y-0 md:space-x-4 md:items-center md:justify-between w-full">
                      <div className="relative">
                        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-gray-50">
                          {title}
                        </h2>
                        <div className="h-24 w-24 md:h-20 md:w-40 absolute -right-48 -top-full opacity-0 md:group-hover:opacity-100 hidden md:group-hover:block">
                          <div>
                            <Image
                              src={banner}
                              alt={title}
                              layout="fill"
                              objectFit="cover"
                              className="rounded"
                            />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
                        {humanizeDate(published)}
                      </p>
                    </section>
                    <p className="sr-only">{description}</p>
                  </article>
                </a>
              </Link>
            ),
          )}
        </section>
      </section>
    </>
  );
};

export default Posts;
