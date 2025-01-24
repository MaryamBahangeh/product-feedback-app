import { useContext } from "react";

import { SearchContext } from "@/providers/SearchProvider.tsx";

import Card from "@/components/Card/Card.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";

import { SUGGESTION_TYPES } from "@/suggestion-options/suggestion-options.ts";

import styles from "./Search.module.css";

function Search() {
  const { filter, setFilter } = useContext(SearchContext);

  return (
    <Card className={styles.search}>
      <Button
        variant={Variant.TONAL}
        color={filter === "All" ? Color.SECONDARY : Color.IDLE}
      >
        All
      </Button>

      {SUGGESTION_TYPES.map((option) => (
        <Button
          key={option.value}
          variant={Variant.TONAL}
          color={filter === option.name ? Color.SECONDARY : Color.IDLE}
          onClick={() => setFilter(option.value)}
        >
          {option.name}
        </Button>
      ))}
    </Card>
  );
}

export default Search;
