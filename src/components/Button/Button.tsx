import { ComponentProps, ReactElement } from "react";

import clsx from "clsx";

import styles from "./Button.module.css";
import { Link } from "react-router";

export enum ButtonType {
  LINK = "link",
  BUTTON = "button",
}

export enum Color {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
  IDLE = "idle",
}

export enum Variant {
  SOLID = "solid",
  TONAL = "tonal",
  TEXT = "text",
}

type Props = ComponentProps<"button"> & {
  buttonType?: ButtonType;
  linkTo?: string;
  variant: Variant;
  color?: Color;
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
        color && styles[color],
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
        color && styles[color],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export default Button;
