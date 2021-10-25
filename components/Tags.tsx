import { FunctionComponent } from "react";
import { useRouter } from "next/router";

import { ROUTE_BLOG } from "../lib/routes";

type Props = {
  className?: string;
  tags: Array<string>;
  shape: "pill" | "rounded";
  size?: "default" | "small";
};

const Tags: FunctionComponent<Props> = ({
  className,
  tags,
  shape,
  size = "default",
}) => {
  const router = useRouter();

  const pushFilter = (event: any) => {
    router.push({
      pathname: ROUTE_BLOG,
      query: {
        tag: event.target.name,
      },
    });
  };

  return (
    <section
      className={
        "flex flex-row flex-wrap gap-2" +
        (className ? " " + className : "")
      }
    >
      {tags.map((tag, index) => (
        <button
          key={index}
          name={tag}
          onClick={pushFilter}
          className={
            "bg-gray-100 border border-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 text-sm tracking-wide" +
            (shape === "pill" ? " rounded-full" : "") +
            (shape === "rounded" ? " rounded-md" : "") +
            (size === "default" ? " px-4 py-2" : "") +
            (size === "small" ? " px-2 py-1" : "")
          }
        >
          {tag}
        </button>
      ))}
    </section>
  );
};

export default Tags;
