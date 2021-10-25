import { FunctionComponent } from "react";

const Header: FunctionComponent = () => {
  return (
    <section className="flex justify-center space-x-4 md:space-x-8">
      <img
        src="https://user-images.githubusercontent.com/43616959/90976812-ee3e4900-e55d-11ea-87a8-f7e6d6a2ed4e.png"
        alt="gsoc-logo"
        className="h-28 md:h-40"
      />
      <img
        src="https://user-images.githubusercontent.com/43616959/90976787-9c95be80-e55d-11ea-9da5-2158f51e6ce9.png"
        alt="zulip-logo"
        className="h-28 md:h-40"
      />
    </section>
  );
};

export default Header;
