import { ComponentProps, ReactElement } from "react";

import clsx from "clsx";

import styles from "./Button.module.css";
import { Link } from "react-router";

export enum ButtonType {
  LINK = "link",
  BUTTON = "button",
}

export enum Color {
  GRAY = "gray",
  PURPLE = "purple",
  BLUE = "blue",
  RED = "red",
  DARKBLUE = "dark-blue",
  TRANSPARENT = "transparent",
}

export enum Variant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

type Props = ComponentProps<"button"> & {
  buttonType?: ButtonType;
  linkTo?: string;
  variant: Variant;
  color: Color;
  className?: string;
};

function Button({
  buttonType = ButtonType.BUTTON,
  linkTo,
  variant,
  color,
  className,
  children,
  ...rest
}: Props): ReactElement {
  return buttonType === ButtonType.BUTTON ? (
    <button
      className={clsx(
        styles.general,
        styles[variant],
        styles[color],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  ) : (
    <Link
      to={linkTo!}
      className={clsx(
        styles.general,
        styles[variant],
        styles[color],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export default Button;
