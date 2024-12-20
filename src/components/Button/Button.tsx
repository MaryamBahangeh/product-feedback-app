import { ComponentProps } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

export enum Color {
  GRAY = "gray",
  PURPLE = "purple",
  BLUE = "blue",
  DARKBLUE = "dark-blue",
  TRANSPARENT = "transparent",
}

export enum Variant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

type Props = Omit<ComponentProps<"button">, "className"> & {
  variant: Variant;
  color: Color;
  className?: string;
};

function Button({ variant, color, className, children, ...rest }: Props) {
  return (
    <button
      className={clsx(styles.button, styles[variant], styles[color], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
