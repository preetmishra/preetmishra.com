import { FunctionComponent } from "react";

import Navbar from "./Navbar";

const UTILITY_COMMON = "md:max-w-2xl px-4 md:px-8 w-full";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Navbar className={UTILITY_COMMON} />
      <main className={UTILITY_COMMON}>{children}</main>
    </>
  );
};

export default Layout;
