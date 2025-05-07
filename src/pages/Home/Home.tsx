import Sidebar from "@/components/Sidebar/Sidebar.tsx";
import Toolbar from "@/components/Toolbar/Toolbar.tsx";
import Suggestions from "@/components/Suggestions/Suggestions.tsx";

import styles from "./Home.module.css";
import { useContext, useEffect } from "react";
import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";
import { SkeletonTheme } from "react-loading-skeleton";
import { LOCAL_STORAGE_SUGGESTION_KEY } from "@/constants/localstorage.constants.ts";
import { defaultSuggestions } from "@/assets/data/defaultSuggestions.ts";

function Home() {
  const { isLoading } = useContext(SuggestionContext);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_SUGGESTION_KEY,
      JSON.stringify(defaultSuggestions),
    );
  }, []);

  return (
    <div className={styles.home}>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <Sidebar className={styles.sidebar} isLoading={isLoading} />
        <Toolbar className={styles.toolbar} />
        <Suggestions className={styles.suggestions} isLoading={isLoading} />
      </SkeletonTheme>
    </div>
  );
}

export default Home;
