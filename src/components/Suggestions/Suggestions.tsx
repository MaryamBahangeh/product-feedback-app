import { useContext, useState } from "react";

import Suggestion from "./Suggestion/Suggestion.tsx";

import styles from "./Suggestions.module.css";

import clsx from "clsx";
import { fetchSuggestions } from "../../../api/suggestion.ts";
import { SuggestionModel } from "@/models/suggestion-model.ts";

import { SearchContext } from "@/providers/SearchProvider.tsx";

type Props = {
  className?: string;
};

function Suggestions({ className }: Props) {
  const { filter, sortBy } = useContext(SearchContext);

  const [filteredSuggestions, setFilteredSuggestions] = useState<
    SuggestionModel[]
  >([]);
  fetchSuggestions(filter, sortBy).then((x) => setFilteredSuggestions(x));

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
