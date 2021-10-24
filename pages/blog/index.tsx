import Head from "next/head";
import Link from "next/link";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getPosts, getTags } from "../../lib/mdx";
import { humanizeDate, parseTags } from "../../lib/utils";
import { AUTHOR_FULL_NAME } from "../../lib/constants";
import Tags from "../../components/Tags";
import OutlineChevronRight from "../../components/icons/OutlineChevronRight";
import SolidCross from "../../components/icons/SolidCross";
import { ROUTE_BLOG } from "../../lib/routes";

type Props = {
  posts: Array<{ frontmatter: Record<string, any>; slug: string }>;
  tags: Array<string>;
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPosts();

  return {
    props: {
      posts: posts,
      tags: getTags(posts),
    },
  };
};

const Posts: NextPage<Props> = ({ posts, tags }) => {
  const [shouldShowTags, setShouldShowTags] = useState(false);
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
    setShouldShowTags(false);
    router.push({
      pathname: ROUTE_BLOG,
      query: {},
    });
  };

  return (
    <>
      <Head>
        <title>{`${AUTHOR_FULL_NAME}'s Blog`}</title>
      </Head>
      <section
        className={
          "flex flex-col font-serif" +
          (tag || shouldShowTags ? " space-y-8" : " space-y-4")
        }
      >
        <section className="space-y-4">
          {tag ? (
            <section className="flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 tracking-wide text-gray-500 bg-gray-100 border border-gray-100 rounded-md">
              <p>
                Showing results for <b>{tag}</b>
              </p>
              <button onClick={resetFilter}>
                <SolidCross className="w-4 h-4 text-gray-500 hover:text-gray-900" />
              </button>
            </section>
          ) : (
            <button
              className="flex flex-row items-center space-x-2 tracking-wide text-gray-500 hover:text-gray-900 group"
              onClick={() => setShouldShowTags((state) => !state)}
            >
              <span>Filter posts by topic</span>
              <span>
                <OutlineChevronRight
                  className={
                    "w-4 h-4 transform rotate-90 transition duration-200 ease-linear text-gray-500 group-hover:text-gray-900" +
                    (shouldShowTags ? " -rotate-90" : "")
                  }
                />
              </span>
            </button>
          )}
          {shouldShowTags && !tag && <Tags tags={tags} shape="pill" />}
        </section>
        <section className="space-y-12 md:space-y-16">
          {filteredPosts.map(
            (
              {
                frontmatter: {
                  title,
                  published,
                  description,
                  tags: postTags,
                },
                slug,
              },
              index,
            ) => (
              <article key={index} className="flex flex-col space-y-6">
                <section className="space-y-4">
                  <section className="space-y-2">
                    <h2 className="text-2xl font-medium tracking-tight text-gray-900">
                      <Link href={getPostLink(slug)}>{title}</Link>
                    </h2>
                    <p className="text-sm tracking-wide text-gray-500">
                      {humanizeDate(published)}
                    </p>
                  </section>
                  <Tags
                    tags={parseTags(postTags)}
                    shape="rounded"
                    size="small"
                  />
                </section>
                <p className="text-gray-700">{description}</p>
                <Link href={getPostLink(slug)}>Read More</Link>
              </article>
            ),
          )}
        </section>
      </section>
    </>
  );
};

export default Posts;
