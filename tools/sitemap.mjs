import { writeFileSync } from "fs";

import { globby } from "globby";
import prettier from "prettier";

const DOMAIN = "https://preetmishra.com";

async function generate() {
  const prettierConfig = await prettier.resolveConfig(
    "./.prettierrc.js",
  );

  const paths = await globby([
    "pages/**/*.tsx",
    "content/blog/**/index.mdx",
    "!pages/_*.tsx",
    "!pages/**/[*.tsx",
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${paths
        .map((path) => {
          const route = path
            .replace("pages", "")
            .replace("content", "")
            .replace(".tsx", "")
            .replace(".mdx", "")
            .replace("/index", "");

          const frequency = route.includes("blog")
            ? "monthly"
            : "weekly";

          const priority = route.includes("blog") ? "0.6" : "0.9";

          return `
            <url>
              <loc>${`${DOMAIN}${route}`}</loc>
              <changefreq>${frequency}</changefreq>
              <priority>${priority}</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  const formattedHTML = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });
  const formattedXML = prettier.format(formattedHTML, {
    ...prettierConfig,
    parser: "xml",
  });

  writeFileSync("public/sitemap.xml", formattedXML);
}

generate();
