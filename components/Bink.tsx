import { FunctionComponent, ReactNode } from "react";
import Link from "next/link";

type Props = {
  className: string;
  href: string;
  children: ReactNode;
  isExternal?: boolean;
};

const Bink: FunctionComponent<Props> = ({
  className,
  href,
  children,
  isExternal = false,
}) => {
  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default Bink;
