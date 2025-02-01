import Sidebar from "@/components/Sidebar/Sidebar.tsx";
import Toolbar from "@/components/Toolbar/Toolbar.tsx";
import Suggestions from "@/components/Suggestions/Suggestions.tsx";

import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.content}>
      <Sidebar className={styles.sidebar} />
      <Toolbar className={styles.header} />
      <Suggestions className={styles.suggestions} />
    </div>
  );
}

export default Home;
