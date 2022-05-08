import { FunctionComponent, useEffect, useRef } from "react";
import useSWR from "swr";

import fetcher from "../lib/fetcher";

type Views = {
  total: number;
};

type Props = {
  route: string;
  className?: string;
  markAsViewed?: boolean;
  render?: boolean;
};

const Views: FunctionComponent<Props> = ({
  route,
  className = "",
  markAsViewed = true,
  render = true,
}) => {
  const endpoint = "/api/views/" + route;

  const { data } = useSWR<Views>(endpoint, fetcher);
  const views = new Number(data?.total || 0);

  useEffect(() => {
    if (!markAsViewed) {
      return;
    }

    const registerView = () => fetch(endpoint, { method: "POST" });
    registerView();
  }, [route, markAsViewed, endpoint]);

  if (!render) {
    return null;
  }

  return <p className={className}>{views.toLocaleString()} views</p>;
};

export default Views;
