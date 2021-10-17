import React, { FunctionComponent, ReactNode } from "react";

type Props = {
  href: string;
  icon: ReactNode;
};

const ExternalLinkWithIcon: FunctionComponent<Props> = ({
  href,
  icon,
}) => (
  <a href={href} target="_blank" rel="noreferrer">
    {icon}
  </a>
);

export default ExternalLinkWithIcon;
