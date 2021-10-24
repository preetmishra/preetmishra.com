import { useMemo } from "react";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getMDXComponent } from "mdx-bundler/client";

import { getPost, getPostSlugs } from "../../lib/mdx";
import { humanizeDate } from "../../lib/utils";

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
        <section className="space-y-2">
          <h1 className="text-4xl font-semibold text-gray-900">
            {frontmatter.title}
          </h1>
          <p className="text-gray-500">
            {humanizeDate(frontmatter.published)}
          </p>
        </section>
        <section className="prose">
          <Component />
        </section>
      </article>
    </>
  );
};

export default Post;