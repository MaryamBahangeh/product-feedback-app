import { useContext } from "react";

import { SearchContext } from "@/providers/SearchProvider.tsx";

import Button, { Color, Variant } from "@/components/Button/Button.tsx";

import styles from "./Header.module.css";
import { SORT_OPTIONS } from "@/sort-options/sort-options.ts";
import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";
import { useNavigate } from "react-router";

const pluralRules = new Intl.PluralRules("en");

function getPluralizedWord(count: number, singular: string, plural: string) {
  return (
    count + " " + (pluralRules.select(count) === "one" ? singular : plural)
  );
}

function Header() {
  const navigate = useNavigate();

  const { filteredSuggestions } = useContext(SearchContext);
  const { sortBy, setSortBy } = useContext(SuggestionContext);

  const addClickHandler = () => {
    navigate("/create");
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
