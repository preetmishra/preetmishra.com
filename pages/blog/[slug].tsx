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
import {
  AUTHOR_FULL_NAME,
  AUTHOR_TWITTER_HANDLE,
} from "../../lib/constants";

interface Params extends ParsedUrlQuery {
  slug: string;
}

type Props = {
  frontmatter: Record<string, any>;
  code: string;
  slug: string;
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
      slug,
    },
  };
};

const Post: NextPage<Props> = ({ frontmatter, code, slug }) => {
  const { title, description, published, tags } = frontmatter;

  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://preetmishra.com/blog/${slug}`}
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={AUTHOR_TWITTER_HANDLE} />
        <meta name="twitter:creator" content={AUTHOR_TWITTER_HANDLE} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <article className="space-y-8 font-serif md:max-w-2xl">
        <header className="space-y-6">
          <section className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
            <p className="font-medium text-gray-500">
              <span className="mr-1 sr-only">Posted on</span>
              <time dateTime={toHTMLDateTime(published)}>
                {humanizeDate(published)}
              </time>
              <span className="ml-1 sr-only">by</span>
              <Link href={ROUTE_ABOUT}>
                <a rel="author" className="ml-1 sr-only">
                  {AUTHOR_FULL_NAME}
                </a>
              </Link>
            </p>
          </section>
          <Tags tags={parseTags(tags)} shape="rounded" size="small" />
        </header>
        <section className="prose prose-h2:text-gray-900 prose-h2:tracking-tight prose-h2:font-bold prose-h3:font-semibold prose-h3:text-gray-900">
          <Component />
        </section>
      </article>
    </>
  );
};

export default Post;
