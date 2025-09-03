import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useState } from "react";
import styles from "./Header.module.css";
import { ButtonType, Color, Variant } from "@/components/Button/Button.tsx";
import i18next from "i18next";
import { LOCAL_STORAGE_LANGUAGE_KEY } from "@/constants/localstorage.constants.ts";
import Select from "@/components/Select/Select.tsx";
import { LANGUAGE_DROPDOWN_OPTIONS } from "@/dropdown-options/language-options.ts";
// import { Sun, Moon } from "lucide-react"; // for darkmode icon

function Header() {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark"); // if you use tailwind
  };

  const languageChangeHandler = async (
    e: ChangeEvent<HTMLSelectElement>,
  ): Promise<void> => {
    try {
      await i18next.changeLanguage(e.target.value);

      localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, e.target.value);

      document.documentElement.lang = i18next.language;
      document.documentElement.dir = i18next.dir();
    } catch (err) {
      console.log("Something went wrong loading", err);
    }
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <img src="/favicon.svg" alt="logo" height="40px" width="40px" />

      {/* Navbar */}
      <nav className={styles.nav}>
        <Link to="/">{t("nav.home")}</Link>
        <Link to="/roadmap">{t("nav.roadmap")}</Link>

        {/* Suggestions dropdown */}
        <div className={styles.dropdown}>
          <button>{t("nav.suggestions")}</button>
          <ul className={styles.dropdownMenu}>
            <li>
              <Link to="/suggestions/new">{t("nav.newSuggestion")}</Link>
            </li>
            <li>
              <Link to="/suggestions/top">{t("nav.topSuggestions")}</Link>
            </li>
            <li>
              <Link to="/suggestions/recent">{t("nav.recentSuggestions")}</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Right actions */}
      <div className={styles.actions}>
        {/* Language switcher */}
        <Select
          defaultValue={i18next.language}
          onChange={languageChangeHandler}
          options={LANGUAGE_DROPDOWN_OPTIONS}
        ></Select>

        {/* Dark mode toggle */}
        <button onClick={toggleDarkMode} className={styles.darkmode}>
          {/*{darkMode ? <Sun /> : <Moon />}*/}
        </button>
      </div>
    </header>
  );
}

export default Header;
