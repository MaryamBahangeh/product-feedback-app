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

import { useTranslation } from "react-i18next";

import Select from "@/components/Select/Select.tsx";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  className?: string;
};

function Toolbar({ className }: Props) {
  const { filteredSuggestions, sortBy, setSortBy } = useContext(SearchContext);

  const { t } = useTranslation();

  // if (isLoading) return <ToolbarSkeleton />;
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
