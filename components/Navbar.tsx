import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { AUTHOR_FULL_NAME } from "../lib/constants";
import { ROUTE_ABOUT, ROUTE_BLOG, ROUTE_HOME } from "../lib/routes";

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
    <nav className="sticky top-0 z-50 flex justify-center w-full h-16 font-serif bg-white border-b border-gray-100/90 md:h-20">
      <div className="flex items-center justify-between w-full px-6 space-x-4 font-medium tracking-tight text-gray-900/50 md:space-x-8 md:max-w-6xl md:px-8">
        <h1 className="flex-none">
          <Link href={ROUTE_HOME}>
            <a title={AUTHOR_FULL_NAME}>{AUTHOR_FULL_NAME}</a>
          </Link>
        </h1>
        <ul className="flex flex-wrap gap-x-4">
          {NAV_LINKS.map(({ path, label }, index) => (
            <li key={index}>
              <Link href={path}>
                <a
                  className={
                    "hover:text-gray-600" +
                    (isActive(path) ? " text-gray-600" : "")
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
