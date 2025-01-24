import { useContext } from "react";

import { SearchContext } from "@/providers/SearchProvider.tsx";

import { SORT_OPTIONS } from "@/sort-options/sort-options.ts";

import styles from "./Header.module.css";
import Button, {
  ButtonType,
  Color,
  Variant,
} from "@/components/Button/Button.tsx";

function Header() {
  const { filteredSuggestions, sortBy, setSortBy } = useContext(SearchContext);

  return (
    <div className={styles.header}>
      <div className={styles.suggestions}>
        <img src="/images/icones/suggestion/icon-suggestions.svg" alt="" />

        <span>
          {filteredSuggestions.length.toString() +
            (filteredSuggestions.length > 1 ? " Suggestions" : " Suggestion")}
        </span>
      </div>

      <label>
        Sort by:
        <select
          defaultValue={sortBy}
          onChange={(e) => setSortBy(e.currentTarget.value)}
        >
          {SORT_OPTIONS.map((sortOption) => (
            <option key={sortOption.value} value={sortOption.value}>
              {sortOption.name}
            </option>
          ))}
        </select>
      </label>

      <Button
        buttonType={ButtonType.LINK}
        linkTo={"/suggestion/create"}
        variant={Variant.SOLID}
        color={Color.PRIMARY}
      >
        <img src="/images/icones/shared/icon-plus.svg" alt="add feedback" /> Add
        Feedback
      </Button>
    </div>
  );
}

export default Header;
