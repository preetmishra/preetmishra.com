import React, { FunctionComponent } from "react";
import { motion } from "framer-motion";

type Props = {
  className: string;
};

const SolidMoon: FunctionComponent<Props> = ({ className }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
    initial={{
      scale: 0.5,
      rotate: 90,
    }}
    animate={{
      scale: 1,
      rotate: 0,
    }}
    whileHover={{
      scale: 1.1,
    }}
    whileTap={{
      scale: 0.5,
    }}
    transition={{
      type: "spring",
      bounce: 0.25,
    }}
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </motion.svg>
);

export default SolidMoon;
