import { useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import { SearchContext } from "@/providers/SearchProvider.tsx";
import { RoutingContext } from "@/providers/RoutingProvider.tsx";

import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import { SUGGESTION_OPTIONS } from "@/suggestion-options/suggestion-options.ts";

import styles from "./Header.module.css";
import { SORT_OPTIONS } from "@/sort-options/sort-options.ts";
import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";
import { Link, Navigate, useNavigate } from "react-router";

const pluralRules = new Intl.PluralRules("en");

function getPluralizedWord(count: number, singular: string, plural: string) {
  return (
    count + " " + (pluralRules.select(count) === "one" ? singular : plural)
  );
}

function Header() {
  let navigate = useNavigate();
  const { filteredSuggestions } = useContext(SearchContext);
  const { sortBy, setSortBy } = useContext(SuggestionContext);

  const suggestion = {
    id: uuidv4(),
    title: "",
    description: "",
    suggestionType: SUGGESTION_OPTIONS[0].value,
    rank: 0,
  };

  const addClickHandler = () => {
    navigate("/editSuggestion/false");
  };

  const count = filteredSuggestions.length;
  console.log(
    `${count} ${getPluralizedWord(filteredSuggestions.length, "Suggestion", "Suggestions")}`,
  );

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <img src="/images/icones/suggestion/icon-suggestions.svg" alt="" />

        <span>
          {getPluralizedWord(
            filteredSuggestions.length,
            "Suggestion",
            "Suggestions",
          )}
        </span>

        <label>
          Sort by:
          <select>
            {SORT_OPTIONS.map((sortOption) => {
              return (
                <option
                  key={sortOption.value}
                  value={sortBy.value}
                  onChange={(e) =>
                    setSortBy({
                      name: e.currentTarget.text,
                      value: e.currentTarget.value,
                    })
                  }
                >
                  {sortOption.name}
                </option>
              );
            })}
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
