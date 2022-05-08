import { FunctionComponent } from "react";

import useDarkMode from "../hooks/useDarkMode";
import Navbar from "./Navbar";

const Layout: FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useDarkMode();

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="w-full px-6 md:px-8 md:max-w-5xl">
        {children}
      </main>
    </>
  );
};

export default Layout;
