import { FunctionComponent } from "react";
import Link from "next/link";

import { AUTHOR_FULL_NAME } from "../lib/constants";
import { ROUTE_ABOUT, ROUTE_BLOG } from "../lib/routes";

const Navbar: FunctionComponent = () => {
  return (
    <nav className="sticky top-0 z-50 flex justify-center w-full py-4 font-serif bg-white md:py-6 filter drop-shadow-sm">
      <div className="flex justify-between w-full px-4 md:max-w-2xl md:px-8">
        <h1 className="tracking-wider">
          <Link href={ROUTE_BLOG}>{AUTHOR_FULL_NAME}</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link href={ROUTE_BLOG}>Blog</Link>
          </li>
          <li>
            <Link href={ROUTE_ABOUT}>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
