import { FunctionComponent } from "react";
import { useRouter } from "next/router";

import { ROUTE_BLOG } from "../lib/routes";
import Button from "./Button";

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
        <Button
          title={`Filter posts by ${tag}`}
          key={index}
          name={tag}
          onClick={pushFilter}
          className="button-sm button-secondary"
        >
          {tag}
        </Button>
      ))}
    </section>
  );
};

export default Tags;
