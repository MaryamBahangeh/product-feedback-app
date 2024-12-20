import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { SearchContext } from "@/providers/SearchProvider.tsx";
import { RoutingContext } from "@/providers/RoutingProvider.tsx";

import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import { SUGGESTION_OPTIONS } from "@/suggestion-options/suggestion-options.ts";
import styles from "./Header.module.css";

function Header() {
  const { filteredSuggestions } = useContext(SearchContext);
  const { setPage, setParams } = useContext(RoutingContext);

  const suggestion = {
    id: uuidv4(),
    title: "",
    description: "",
    suggestionType: SUGGESTION_OPTIONS[0].value,
    rank: 0,
  };

  const addClickHandler = () => {
    setPage("edit-suggestion");
    setParams({ suggestion: suggestion, isEditing: false });
  };

  const suggestionCounts: string =
    filteredSuggestions.length +
    (filteredSuggestions.length > 1 ? " Suggestions" : " Suggestion");

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <img src="/images/icones/suggestion/icon-suggestions.svg" alt="" />

        <span>{suggestionCounts}</span>

        <label>
          Sort by:
          <select>
            <option value="MostUpvotes">Most Upvotes</option>
          </select>
        </label>
      </div>

      <Button
        variant={Variant.PRIMARY}
        color={Color.PURPLE}
        onClick={addClickHandler}
      >
        <img src="/images/icones/shared/icon-plus.svg" alt="add feedback" /> Add
        Feedback
      </Button>
    </div>
  );
}

export default Header;
