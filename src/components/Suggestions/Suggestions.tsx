import { useContext } from "react";

import { SearchContext } from "@/providers/SearchProvider.tsx";

import Suggestion from "./Suggestion/Suggestion.tsx";

import styles from "./Suggestions.module.css";

import clsx from "clsx";

import SuggestionSkeleton from "@/components/Skeleton/SuggestionSkeleton/SuggestionSkeleton.tsx";

type Props = {
  className?: string;
  isLoading: boolean;
};

function Suggestions({ className, isLoading }: Props) {
  const { filteredSuggestions } = useContext(SearchContext);

  return (
    <ul className={clsx(styles.suggestions, className)}>
      {filteredSuggestions.map((suggestion) => (
        <li key={suggestion.id}>
          {isLoading ? (
            <SuggestionSkeleton />
          ) : (
            <Suggestion suggestion={suggestion} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;
