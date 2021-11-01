import { useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getMDXComponent } from "mdx-bundler/client";

import { getPost, getPostSlugs } from "../../lib/mdx";
import {
  humanizeDate,
  parseTags,
  toHTMLDateTime,
} from "../../lib/utils";
import Tags from "../../components/Tags";
import { ROUTE_ABOUT } from "../../lib/routes";
import { AUTHOR_FULL_NAME } from "../../lib/constants";

interface Params extends ParsedUrlQuery {
  slug: string;
}

type Props = {
  frontmatter: Record<string, any>;
  code: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getPostSlugs().map((slug) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const slug = params?.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await getPost(slug)),
    },
  };
};

const Post: NextPage<Props> = ({ frontmatter, code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
      <article className="space-y-8 font-serif">
        <header className="space-y-6">
          <section className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {frontmatter.title}
            </h1>
            <p className="text-gray-500">
              <span className="mr-1 sr-only">Posted on</span>
              <time dateTime={toHTMLDateTime(frontmatter.published)}>
                {humanizeDate(frontmatter.published)}
              </time>
              <span className="ml-1 sr-only">by</span>
              <Link href={ROUTE_ABOUT}>
                <a rel="author" className="ml-1 sr-only">
                  {AUTHOR_FULL_NAME}
                </a>
              </Link>
            </p>
          </section>
          <Tags
            tags={parseTags(frontmatter.tags)}
            shape="rounded"
            size="small"
          />
        </header>
        <section className="prose">
          <Component />
        </section>
      </article>
    </>
  );
};

export default Post;
