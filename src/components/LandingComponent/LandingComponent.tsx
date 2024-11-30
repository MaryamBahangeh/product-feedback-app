import styles from "./LandingComponent.module.css";
import Header from "../Header/Header.tsx";
import Suggestions from "../Suggestions/Suggestions.tsx";
import Bord from "../Bord/Bord.tsx";
import Search from "../Search/Search.tsx";

function LandingComponent() {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <Header></Header>
      </div>
      <div className={styles.suggestion}>
        <Suggestions></Suggestions>
      </div>
      <div className={styles.bord}>
        <Bord />
        <Search />
      </div>
    </div>
  );
}

export default LandingComponent;
