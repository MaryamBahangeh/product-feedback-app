import styles from "./Search.module.css";
import { SUGGESTION_Options } from "../../models/suggestion-options.ts";
import Button, { Color } from "../Button/Button.tsx";
import { useContext } from "react";
import { SearchContext } from "../../providers/SearchProvider.tsx";

function Search() {
  const { filterByType, type } = useContext(SearchContext);
  return (
    <div className={styles.search}>
      <Button
        color={type === "All" ? Color.blue : Color.gray}
        onClick={() => filterByType("All")}
      >
        All
      </Button>
      {SUGGESTION_Options.map((option) => (
        <Button
          color={type === option.name ? Color.blue : Color.gray}
          onClick={() => filterByType(option.value)}
        >
          {option.name}
        </Button>
      ))}
    </div>
  );
}

export default Search;
