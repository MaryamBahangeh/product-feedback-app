import { PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./Div.module.css";

type Props = PropsWithChildren & {
  className?: string;
};

function Div({ className, children }: Props) {
  return <div className={clsx(styles.div, className)}>{children}</div>;
}

export default Div;
