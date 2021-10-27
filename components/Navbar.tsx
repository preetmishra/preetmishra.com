import { FunctionComponent, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  AUTHOR_FIRST_NAME,
  AUTHOR_FULL_NAME,
  AUTHOR_LAST_NAME,
} from "../lib/constants";
import { ROUTE_ABOUT, ROUTE_BLOG } from "../lib/routes";

type NavLink = {
  path: string;
  label: string;
};

const NAV_LINKS: Array<NavLink> = [
  {
    path: ROUTE_BLOG,
    label: "Blog",
  },
  {
    path: ROUTE_ABOUT,
    label: "About",
  },
];

const Navbar: FunctionComponent = () => {
  const { pathname } = useRouter();

  const isActive = (_pathname: string): boolean => {
    return pathname.startsWith(_pathname);
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-center w-full py-4 font-serif bg-white md:py-6 filter drop-shadow-sm">
      <div className="flex items-center justify-between w-full px-4 space-x-8 md:max-w-2xl md:px-8">
        <h1 className="flex-none text-2xl font-medium tracking-tighter text-gray-900 lowercase md:-ml-1">
          <Link href={ROUTE_BLOG}>
            <a aria-label={AUTHOR_FULL_NAME} title={AUTHOR_FULL_NAME}>
              {`<${AUTHOR_FIRST_NAME.toLowerCase()}${AUTHOR_LAST_NAME.toLowerCase()} />`}
            </a>
          </Link>
        </h1>
        <ul className="flex flex-wrap font-medium tracking-tight text-gray-400 gap-x-2 md:gap-x-4">
          {NAV_LINKS.map(({ path, label }, index) => (
            <li key={index}>
              <Link href={path}>
                <a
                  className={
                    "hover:text-gray-700" +
                    (isActive(path) ? " text-gray-700" : "")
                  }
                  title={label}
                >
                  {label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
