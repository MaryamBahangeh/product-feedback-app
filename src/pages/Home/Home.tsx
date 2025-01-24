import Header from "@/components/Header/Header.tsx";
import Suggestions from "@/components/Suggestions/Suggestions.tsx";
import Board from "@/components/Board/Board.tsx";
import Search from "@/components/Search/Search.tsx";

import styles from "./Home.module.css";
import RoadMap from "@/components/RoadMap/RoadMap.tsx";

function Home() {
  return (
    <div className={styles.content}>
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
