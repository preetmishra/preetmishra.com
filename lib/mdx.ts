import fs from "fs";
import path from "path";

import matter from "gray-matter";
import rehypePrism from "rehype-prism-plus";
import { bundleMDXFile } from "mdx-bundler";

const ENCODING = "utf8";
const FILENAME_INDEX = "index.mdx";

const PATH_ROOT = process.cwd();
const PATH_POSTS = path.join(PATH_ROOT, "content/blog");

type Posts = Array<{
  frontmatter: {
    [key: string]: any;
  };
  slug: string;
}>;

const getFilePath = (dirname: string) => {
  return path.join(PATH_POSTS, dirname, FILENAME_INDEX);
};

const getFileContent = (dirname: string) => {
  return fs.readFileSync(getFilePath(dirname), ENCODING);
};

const getCompiledMDX = async (source: string) => {
  const { default: gfm } = await import("remark-gfm");

  const remarkPlugins: Array<any> = [gfm];
  const rehypePlugins: Array<any> = [rehypePrism];

  return await bundleMDXFile(source, {
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...remarkPlugins,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        ...rehypePlugins,
      ];

      return options;
    },
  });
};

const getPost = async (slug: string) => {
  const source = getFilePath(slug);
  const { code, frontmatter } = await getCompiledMDX(source);

  return {
    frontmatter,
    code,
  };
};

const getPosts = (): Posts => {
  const posts = fs.readdirSync(PATH_POSTS).map((dirname) => {
    const content = getFileContent(dirname);
    const { data: frontmatter } = matter(content);

    return {
      frontmatter,
      slug: dirname,
    };
  });

  return posts.sort((a, z) => {
    const aTime = new Date(a.frontmatter.published ?? "").getTime();
    const zTime = new Date(z.frontmatter.published ?? "").getTime();
    return aTime > zTime ? -1 : aTime === zTime ? 0 : 1;
  });
};

const getPostSlugs = () => {
  return fs.readdirSync(PATH_POSTS);
};

const getTags = (posts: Posts): Array<string> => {
  const allTags = new Set<string>();

  for (const post of posts) {
    const tags: Array<string> = post.frontmatter.tags.split(", ");
    tags.forEach((tag) => allTags.add(tag));
  }

  return Array.from(allTags).sort();
};

export { getPost, getPosts, getPostSlugs, getTags };
