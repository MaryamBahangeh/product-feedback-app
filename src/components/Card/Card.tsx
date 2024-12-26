import { PropsWithChildren } from "react";

import clsx from "clsx";

import styles from "./Card.module.css";

type Props = PropsWithChildren & {
  className?: string;
};

function Card({ className, children }: Props) {
  return <div className={clsx(styles.div, className)}>{children}</div>;
}

export default Card;
