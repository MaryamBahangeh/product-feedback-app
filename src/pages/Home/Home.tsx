import Toolbar from "@/components/Toolbar/Toolbar.tsx";
import Suggestions from "@/components/Suggestions/Suggestions.tsx";
import Board from "@/components/Board/Board.tsx";
import Search from "@/components/Search/Search.tsx";

import styles from "./Home.module.css";
import RoadMap from "@/components/RoadMap/RoadMap.tsx";
import { useState } from "react";
import Menu from "@/components/Menu/Menu.tsx";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className={styles.content}>
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

      <div className={styles["sidebar"]}>
        <Board />
        <Search className={styles["search"]} />
        <RoadMap className={styles["road-map"]} />
      </div>

      <div className={styles.header}>
        <Toolbar />
      </div>

      <div className={styles.suggestions}>
        <Suggestions />
      </div>
    </div>
  );
}

export default Home;
