import { useContext } from "react";

import { SearchContext } from "@/providers/SearchProvider.tsx";

import Suggestion from "./Suggestion/Suggestion.tsx";

import styles from "./Suggestions.module.css";

import clsx from "clsx";

type Props = {
  className?: string;
};

function Suggestions({ className }: Props) {
  const { filteredSuggestions } = useContext(SearchContext);

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
