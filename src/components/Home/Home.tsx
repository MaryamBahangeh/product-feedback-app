import Header from "@/components/Header/Header.tsx";
import Suggestions from "@/components/Suggestions/Suggestions.tsx";
import Bord from "@/components/Bord/Bord.tsx";
import Search from "@/components/Search/Search.tsx";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <Header></Header>
      </div>

      <div className={styles.suggestion}>
        <Suggestions></Suggestions>
      </div>

      <div className={styles["left-content"]}>
        <Bord />
        <Search />
      </div>
    </div>
  );
}

export default Home;
