import styles from "./Toolbar.module.css";
import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider.tsx";

function Toolbar() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const imgSrc = isDarkMode
    ? "/images/icones/shared/sun.svg"
    : "/images/icones/shared/moon.svg";

  return (
    <div className={styles.toolbar}>
      <button onClick={toggleDarkMode}>
        <img src={imgSrc} alt="" />
      </button>
    </div>
  );
}

export default Toolbar;
