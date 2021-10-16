import { FunctionComponent } from "react";
import Link from "next/link";
import { AUTHOR_FULL_NAME } from "../lib/constants";

type Props = {
  className: string | undefined;
};

const Navbar: FunctionComponent<Props> = ({ className }) => {
  return (
    <nav
      className={
        "flex justify-between py-4 font-serif md:py-8" +
        (className ? " " + className : "")
      }
    >
      <h1 className="tracking-wider">
        <Link href="/">{AUTHOR_FULL_NAME}</Link>
      </h1>
      <ul className="flex">
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
