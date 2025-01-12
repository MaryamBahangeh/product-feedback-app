import { PropsWithChildren } from "react";
import clsx from "clsx";

import { Color } from "@/components/Button/Button.tsx";

import styles from "./Card.module.css";

type Props = PropsWithChildren & {
  className?: string;
  color?: Color;
};

function Card({ className, color, children }: Props) {
  return (
    <div className={clsx(styles.div, className, color && styles[color])}>
      {children}
    </div>
  );
}

export default Card;
