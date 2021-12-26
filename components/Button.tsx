import { FunctionComponent, MouseEventHandler, ReactNode } from "react";

type Props = {
  className: string;
  title: string;
  name?: string;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button: FunctionComponent<Props> = ({
  className,
  title,
  name,
  children,
  onClick,
}) => {
  return (
    <button
      className={className}
      title={title}
      name={name}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
