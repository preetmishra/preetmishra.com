import { FunctionComponent } from "react";

import Navbar from "./Navbar";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="w-full px-4 md:px-8 md:max-w-2xl">
        {children}
      </main>
    </>
  );
};

export default Layout;
