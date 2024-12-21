import { useContext } from "react";

import { SearchContext } from "@/providers/SearchProvider.tsx";

import Suggestion from "./Suggestion/Suggestion.tsx";

import { Suggestion as SuggestionModel } from "@/models/suggestion.ts";

import styles from "./Suggestions.module.css";

function Suggestions() {
  const { filteredSuggestions } = useContext(SearchContext);
  console.log(filteredSuggestions);

  return (
    <ul className={styles.suggestions}>
      {filteredSuggestions.map((suggestion: SuggestionModel) => (
        <li key={suggestion.id}>
          <Suggestion suggestion={suggestion} />
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;
