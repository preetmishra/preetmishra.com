import { FunctionComponent } from "react";
import Link from "next/link";

type Props = {
  className: string;
  href: string;
};

const Button: FunctionComponent<Props> = ({
  className,
  href,
  children,
}) => {
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default Button;
