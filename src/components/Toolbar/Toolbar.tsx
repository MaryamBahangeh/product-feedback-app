
import { ChangeEvent, useContext } from "react";

import { useTranslation } from "react-i18next";


import clsx from "clsx";

import i18next from "i18next";

import useSuggestionQuery from "@/hooks/use-suggestion-query.ts";

import { SearchContext } from "@/providers/SearchProvider.tsx";

import { SORT_OPTIONS } from "@/dropdown-options/sort-options.ts";
import { LANGUAGE_DROPDOWN_OPTIONS } from "@/dropdown-options/language-options.ts";
import { LOCAL_STORAGE_LANGUAGE_KEY } from "@/constants/localstorage.constants.ts";

import Select from "@/components/Select/Select.tsx";
import Button, {
  ButtonType,
  Color,
  Variant,
} from "@/components/Button/Button.tsx";

import styles from "./Toolbar.module.css";

type Props = {
  className?: string;
};

function Toolbar({ className }: Props) {
  const { sortBy, setSortBy } = useContext(SearchContext);

  const { data: filteredSuggestions } = useSuggestionQuery();

  const { t } = useTranslation();

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
    <div className={clsx(styles.toolbar, className)}>
      <div className={styles.suggestions}>
        <img src="/images/icones/suggestion/icon-suggestions.svg" alt="" />

        <span>
            {t("toolbar.suggestion", { count: filteredSuggestions.length })}
        </span>
      </div>

      <label>
        {t("toolbar.sortBy")}:
        <Select
          defaultValue={sortBy}
          onChange={(e) => setSortBy(e.currentTarget.value)}
          options={SORT_OPTIONS}
        ></Select>
      </label>

      <Select
        defaultValue={i18next.language}
        onChange={languageChangeHandler}
        options={LANGUAGE_DROPDOWN_OPTIONS}
      ></Select>

      <Button
        buttonType={ButtonType.LINK}
        linkTo={"/suggestion/create"}
        variant={Variant.SOLID}
        color={Color.PRIMARY}
      >
        <img src="/images/icones/shared/icon-plus.svg" alt="add feedback" />
        {t("toolbar.addFeedback")}
      </Button>
    </div>
  );
}

export default Toolbar;
