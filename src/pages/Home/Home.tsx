import Sidebar from "@/components/Sidebar/Sidebar.tsx";
import Toolbar from "@/components/Toolbar/Toolbar.tsx";
import Suggestions from "@/components/Suggestions/Suggestions.tsx";

import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <Sidebar className={styles.sidebar} />
      <Toolbar className={styles.toolbar} />
      <Suggestions className={styles.suggestions} />
    </div>
  );
}

export default Home;
