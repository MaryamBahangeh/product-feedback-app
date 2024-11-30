import styles from "./Button.module.css";
import clsx from "clsx";
import { ComponentProps } from "react";

export enum Color {
  gray = "gray",
  purple = "purple",
  blue = "blue",
}

type Props = ComponentProps<"button"> & {
  color: Color;
  className?: string;
};

function Button({ color, className, children, ...rest }: Props) {
  return (
    <button className={clsx(styles.button, styles[color], className)} {...rest}>
      {children}
    </button>
  );
}

export default Button;
