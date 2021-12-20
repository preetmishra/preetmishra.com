import { FunctionComponent } from "react";

import Navbar from "./Navbar";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="w-full px-6 md:px-8 md:max-w-6xl">
        {children}
      </main>
    </>
  );
};

export default Layout;
