import { useContext } from "react";
import { SUGGESTION_OPTIONS } from "@/suggestion-options/suggestion-options.ts";
import { SearchContext } from "@/providers/SearchProvider.tsx";
import Div from "@/components/Div/Div.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import styles from "./Search.module.css";

function Search() {
  const { filteredType, setFilteredType } = useContext(SearchContext);
  return (
    <Div className={styles.search}>
      <Button
        variant={Variant.SECONDARY}
        color={filteredType === "All" ? Color.BLUE : Color.GRAY}
        onClick={() => setFilteredType("All")}
      >
        All
      </Button>

      {SUGGESTION_OPTIONS.map((option) => (
        <Button
          key={option.value}
          variant={Variant.SECONDARY}
          color={filteredType === option.name ? Color.BLUE : Color.GRAY}
          onClick={() => setFilteredType(option.value)}
        >
          {option.name}
        </Button>
      ))}
    </Div>
  );
}

export default Search;
