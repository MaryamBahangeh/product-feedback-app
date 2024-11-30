import { SuggestionModel } from "../../models/suggestion.ts";
import { SUGGESTION_Options } from "../../models/suggestion-options.ts";
import Suggestion from "./Suggestion/Suggestion.tsx";
import styles from "./Suggestions.module.css";

function Suggestions() {
  const suggestions: SuggestionModel[] = [
    {
      suggestionType: SUGGESTION_Options[4],
      rank: 2,
      title: "Add a dark theme option",
      comments: [
        {
          commentText: "nice to have a dark mode",
          sender: { id: "Ali@ahmadi", name: "Ali" },
        },
      ],
      description: `Dark mode is an important feature to enhance our websites. 
        We can have it as an important feature 
        and Dark mode is an important feature to enhance our websites`,
    },

    {
      suggestionType: SUGGESTION_Options[3],
      rank: 5,
      title: "Add tags for solutions",
      comments: [
        {
          commentText: "nice to have tags for solutions",
          sender: { id: "marjan@rezaee", name: "Ali" },
        },
      ],
      description: `dd tags for solutions an important feature to enhance our websites. 
        We can have it as an important feature 
        and dd tags for solutions is an important feature to enhance our websites`,
    },
  ];
  return (
    <div className={styles.suggestions}>
      {suggestions.map((suggestion: SuggestionModel) => (
        <Suggestion suggestion={suggestion} />
      ))}
    </div>
  );
}

export default Suggestions;
