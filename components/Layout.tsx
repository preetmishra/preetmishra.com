import { FunctionComponent } from "react";

import Navbar from "./Navbar";

const UTILITY_COMMON_HORIZONTAL_MARGIN = "mx-4 md:mx-36 lg:mx-72";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Navbar className={UTILITY_COMMON_HORIZONTAL_MARGIN} />
      <main
        className={UTILITY_COMMON_HORIZONTAL_MARGIN + " mt-4 mb-16"}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
