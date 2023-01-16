import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
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
        <section className="flex flex-wrap justify-between gap-y-16 md:gap-x-4 md:gap-y-20">
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
                  className={`flex flex-col focus:outline-none will-change-auto outline-none w-full md:w-[45%] hover:cursor-pointer group ${
                    focusIndex === index || focusIndex === -1
                      ? "opacity-100"
                      : "md:opacity-10 md:blur"
                  } transition-all duration-300`}
                  onMouseOver={() => handleFocus(index)}
                  onMouseOut={handleBlur}
                  onFocus={() => handleFocus(index)}
                  onBlur={handleBlur}
                >
                  <article className="h-full w-full space-y-6">
                    <div
                      className="w-full rounded-2xl h-44 md:h-52 flex items-end justify-center overflow-hidden relative"
                      style={{
                        background: color,
                      }}
                    >
                      <div
                        className="h-[90%] w-5/6 absolute will-change-auto -bottom-8 duration-300 group-hover:-bottom-4 group-focus:-bottom-4 ease-in-out"
                        style={{
                          transitionProperty: "bottom",
                        }}
                      >
                        <Image
                          src={banner}
                          alt={title}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <section className="space-y-1">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {humanizeDate(published)}
                      </p>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
                        {title}
                      </h2>
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
