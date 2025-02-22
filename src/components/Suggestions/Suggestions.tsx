import { useContext } from "react";

import clsx from "clsx";

import { SearchContext } from "@/providers/SearchProvider.tsx";

import useSuggestionQuery from "@/hooks/use-suggestion-query.ts";

import Suggestion from "./Suggestion/Suggestion.tsx";

import styles from "./Suggestions.module.css";

type Props = {
  className?: string;
};

function Suggestions({ className }: Props) {
  const { filter, sortBy } = useContext(SearchContext);

  // const [filteredSuggestions, setFilteredSuggestions] = useState<
  //   SuggestionModel[]
  // >([]);
  // fetchSuggestions(filter, sortBy).then((x) => setFilteredSuggestions(x));
  const { data: filteredSuggestions } = useSuggestionQuery({
    suggestionType: filter,
    sortBy,
  });

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
