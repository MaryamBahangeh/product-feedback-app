import { useContext } from "react";
import { useTranslation } from "react-i18next";

import clsx from "clsx";

import { SearchContext } from "@/providers/SearchProvider.tsx";

import Card from "@/components/Card/Card.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";

import { SUGGESTION_TYPES } from "@/dropdown-options/suggestion-options.ts";

import styles from "./Search.module.css";

type Props = {
  className?: string;
};

function Search({ className }: Props) {
  const { filter, setFilter } = useContext(SearchContext);

  const { t } = useTranslation();

  return (
    <Card className={clsx(styles.search, className)}>
      <Button
        variant={Variant.TONAL}
        color={filter === "All" ? Color.SECONDARY : Color.IDLE}
        onClick={() => setFilter("All")}
      >
        All
      </Button>

      {SUGGESTION_TYPES.map((option) => (
        <Button
          key={option.value}
          variant={Variant.TONAL}
          color={filter === option.value ? Color.SECONDARY : Color.IDLE}
          onClick={() => setFilter(option.value)}
        >
          {t(option.translationKey as never)}
        </Button>
      ))}
    </Card>
  );
}

export default Search;
