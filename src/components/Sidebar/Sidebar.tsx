import { ReactElement, useState } from "react";

import clsx from "clsx";

import Menu from "@/components/Menu/Menu.tsx";
import Board from "@/components/Board/Board.tsx";
import Search from "@/components/Search/Search.tsx";
import RoadMap from "@/components/RoadMap/RoadMap.tsx";

import styles from "./Sidebar.module.css";

type Props = {
  className?: string;
};

export default function Sidebar({ className }: Props): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className={clsx(styles.sidebar, className)}>
      <button
        className={styles.menu}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img
          className={styles.menu}
          src="/images/icones/shared/mobile/icon-hamburger.svg"
          alt=""
        />
      </button>
      {isMenuOpen && <Menu onApply={() => setIsMenuOpen(false)} />}

      <Board />
      <Search className={styles["search"]} />
      <RoadMap className={styles["road-map"]} />
    </div>
  );
}
