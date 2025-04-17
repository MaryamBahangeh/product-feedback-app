import clsx from "clsx";

import useSuggestionQuery from "@/hooks/use-suggestion-query.ts";

import Suggestion from "./Suggestion/Suggestion.tsx";

import styles from "./Suggestions.module.css";

type Props = {
  className?: string;
};

function Suggestions({ className }: Props) {
  // const [filteredSuggestions, setFilteredSuggestions] = useState<
  //   SuggestionModel[]
  // >([]);
  // fetchSuggestions(filter, sortBy).then((x) => setFilteredSuggestions(x));
  const { data: filteredSuggestions } = useSuggestionQuery();

  return (
    <ul className={clsx(styles.suggestions, className)}>
      {filteredSuggestions.map((suggestion) => (
        <li key={suggestion.id}>
          <Suggestion suggestion={suggestion} />
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;
