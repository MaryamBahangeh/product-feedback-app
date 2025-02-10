import { useContext } from "react";

import clsx from "clsx";

import { SearchContext } from "@/providers/SearchProvider.tsx";

import { SORT_OPTIONS } from "@/dropdown-options/sort-options.ts";

import Button, {
  ButtonType,
  Color,
  Variant,
} from "@/components/Button/Button.tsx";

import styles from "./Toolbar.module.css";
import i18next from "i18next";
import { LANGUAGE_DROPDOWN_OPTIONS } from "@/dropdown-options/language-options.ts";
import { useTranslation } from "react-i18next";
import { LOCAL_STORAGE_LANGUAGE_KEY } from "@/constants/localstorage.constants.ts";

type Props = {
  className?: string;
};

function Toolbar({ className }: Props) {
  const { filteredSuggestions, sortBy, setSortBy } = useContext(SearchContext);

  const { t } = useTranslation();

  const languageChangeHandler = async (language: string): Promise<void> => {
    try {
      await i18next.changeLanguage(language);

      localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, language);

      document.documentElement.lang = i18next.language;
      document.documentElement.dir = i18next.dir();
    } catch (err) {
      console.log("Something went wrong loading", err);
    }
  };

  return (
    <div className={clsx(styles.toolbar, className)}>
      <div className={styles.suggestions}>
        <img src="/images/icones/suggestion/icon-suggestions.svg" alt="" />

        <span>
          {filteredSuggestions.length.toString() +
            " " +
            (filteredSuggestions.length > 1
              ? t("toolbar.suggestions")
              : t("toolbar.suggestion"))}
        </span>
      </div>

      <label>
        {t("toolbar.sortBy")}:
        <select
          defaultValue={sortBy}
          onChange={(e) => setSortBy(e.currentTarget.value)}
        >
          {SORT_OPTIONS.map((sortOption) => (
            <option key={sortOption.value} value={sortOption.value}>
              {t(sortOption.translationKey)}
            </option>
          ))}
        </select>
      </label>

      <select
        defaultValue={i18next.language}
        onChange={(e) => languageChangeHandler(e.currentTarget.value)}
      >
        {LANGUAGE_DROPDOWN_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.translationKey)}
          </option>
        ))}
      </select>
      <Button
        buttonType={ButtonType.LINK}
        linkTo={"/suggestion/create"}
        variant={Variant.SOLID}
        color={Color.PRIMARY}
      >
        <img src="/images/icones/shared/icon-plus.svg" alt="add feedback" />
        {t("toolbar.AddFeedback")}
      </Button>
    </div>
  );
}

export default Toolbar;
