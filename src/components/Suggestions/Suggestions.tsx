import { useContext } from "react";

import { SearchContext } from "@/providers/SearchProvider.tsx";

import Suggestion from "./Suggestion/Suggestion.tsx";

import styles from "./Suggestions.module.css";

function Suggestions() {
  const { filteredSuggestions } = useContext(SearchContext);

  return (
    <ul className={styles.suggestions}>
      {filteredSuggestions.map((suggestion) => (
        <li key={suggestion.id}>
          <Suggestion suggestion={suggestion} />
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;
