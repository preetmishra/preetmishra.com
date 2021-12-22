import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { AUTHOR_FULL_NAME } from "../lib/constants";
import { ROUTE_ABOUT, ROUTE_BLOG, ROUTE_HOME } from "../lib/routes";
import SolidSun from "./icons/SolidSun";
import SolidMoon from "./icons/SolidMoon";

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

type Props = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar: FunctionComponent<Props> = ({ theme, setTheme }) => {
  const { pathname } = useRouter();

  const isActive = (_pathname: string): boolean => {
    return pathname.startsWith(_pathname);
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-center w-full h-16 font-serif bg-white border-b dark:bg-[#191919] dark:border-gray-800/50 border-gray-100/90 md:h-20">
      <div className="flex items-center justify-between w-full px-6 space-x-4 font-medium tracking-tight text-gray-900/50 dark:text-gray-300/50 md:space-x-8 md:max-w-6xl md:px-8">
        <h1 className="flex-none">
          <Link href={ROUTE_HOME}>
            <a title={AUTHOR_FULL_NAME}>{AUTHOR_FULL_NAME}</a>
          </Link>
        </h1>
        <ul className="flex flex-wrap items-center gap-x-4">
          {NAV_LINKS.map(({ path, label }, index) => (
            <li key={index}>
              <Link href={path}>
                <a
                  className={
                    "hover:text-gray-600 dark:hover:text-gray-50/75" +
                    (isActive(path)
                      ? " text-gray-600 dark:text-gray-50/75"
                      : "")
                  }
                  title={label}
                >
                  {label}
                </a>
              </Link>
            </li>
          ))}
          <li
            className="pl-4 border-l cursor-pointer border-gray-100/90 dark:border-gray-800/50 hover:text-gray-600 dark:hover:text-gray-50/75"
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            {theme === "light" ? (
              <SolidSun className="w-5 h-5" />
            ) : (
              <SolidMoon className="w-5 h-5" />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
