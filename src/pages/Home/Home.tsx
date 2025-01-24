import Header from "@/components/Header/Header.tsx";
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

        <div className={styles["search"]}>
          <Search />
        </div>

        <div className={styles["road-map"]}>
          <RoadMap />
        </div>
      </div>

      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.suggestions}>
        <Suggestions />
      </div>
    </div>
  );
}

export default Home;
