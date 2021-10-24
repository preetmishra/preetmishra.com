import { FunctionComponent } from "react";
import Link from "next/link";

import { AUTHOR_FULL_NAME } from "../lib/constants";
import { ROUTE_ABOUT, ROUTE_BLOG } from "../lib/routes";

type Props = {
  className: string | undefined;
};

const Navbar: FunctionComponent<Props> = ({ className }) => {
  return (
    <nav
      className={
        "sticky top-0 z-50 bg-white flex justify-between py-4 font-serif md:py-8" +
        (className ? " " + className : "")
      }
    >
      <h1 className="tracking-wider">
        <Link href={ROUTE_BLOG}>{AUTHOR_FULL_NAME}</Link>
      </h1>
      <ul className="flex flex-row space-x-4">
        <li>
          <Link href={ROUTE_BLOG}>Blog</Link>
        </li>
        <li>
          <Link href={ROUTE_ABOUT}>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
