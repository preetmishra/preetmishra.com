import React, { FunctionComponent } from "react";

type Props = {
  className: string;
};

const StackOverflow: FunctionComponent<Props> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M15 21H5v-2h10v2zm6-11.665L19.379 0l-1.993.346 1.62 9.335L21 9.335zm-5.964 6.937-9.746-.975-.186 2.016 9.755.879.177-1.92zm.538-2.587-9.276-2.608-.526 1.954 9.306 2.5.496-1.846zm1.204-2.413L8.481 6.408 7.452 8.151l8.298 4.865 1.028-1.744zm1.866-1.467-5.339-7.829-1.672 1.14 5.339 7.829 1.672-1.14zM16 14v8H4v-8H2v10h16V14h-2z"
      fill="currentColor"
    />
  </svg>
);

export default StackOverflow;
