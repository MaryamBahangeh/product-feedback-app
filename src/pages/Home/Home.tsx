import Header from "@/components/Header/Header.tsx";
import Suggestions from "@/components/Suggestions/Suggestions.tsx";
import Board from "@/components/Board/Board.tsx";
import Search from "@/components/Search/Search.tsx";

import styles from "./Home.module.css";
import Toolbar from "@/components/Toolbar/Toolbar.tsx";

function Home() {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.toolbar}>
          <Toolbar />
        </div>

        <div className={styles.header}>
          <Header />
        </div>

        <div className={styles.suggestion}>
          <Suggestions />
        </div>

        <div className={styles["sidebar"]}>
          <Board />
          <Search />
        </div>
      </div>
    </>
  );
}

export default Home;
