import { SuggestionModel } from "../../models/suggestion.ts";
import Suggestion from "./Suggestion/Suggestion.tsx";
import styles from "./Suggestions.module.css";
import { useContext } from "react";
import { SearchContext } from "../../providers/SearchProvider.tsx";

function Suggestions() {
  const { filteredSuggestions } = useContext(SearchContext);
  return (
    <div className={styles.suggestions}>
      {filteredSuggestions.map((suggestion: SuggestionModel) => {
        return <Suggestion suggestion={suggestion} />;
      })}
    </div>
  );
}

export default Suggestions;
