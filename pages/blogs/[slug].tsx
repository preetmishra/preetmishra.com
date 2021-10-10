import { useMemo } from "react";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getMDXComponent } from "mdx-bundler/client";

import Navbar from "../../components/Navbar";
import { getBlog, getBlogSlugs } from "../../lib/mdx";

interface Params extends ParsedUrlQuery {
  slug: string;
}

type Props = {
  frontmatter: Record<string, any>;
  code: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getBlogSlugs().map((slug) => ({
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
      ...(await getBlog(slug)),
    },
  };
};

const Blog: NextPage<Props> = ({ frontmatter, code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
      <Navbar />
      <article className="prose">
        <Component />
      </article>
    </>
  );
};

export default Blog;
