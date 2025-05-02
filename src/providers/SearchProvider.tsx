import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from "react";

import { SuggestionModel } from "@/models/suggestion-model.ts";
import { SORT_OPTIONS } from "@/dropdown-options/sort-options.ts";
import { useSuggestionStore } from "@/stores/useSuggestionStore.ts";

type ContextType = {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  filteredSuggestions: SuggestionModel[];
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
};

export const SearchContext = createContext<ContextType>({
  filter: "",
  setFilter: () => {},
  filteredSuggestions: [],
  sortBy: "",
  setSortBy: () => {},
});

function SearchProvider({ children }: PropsWithChildren) {
  const { suggestions } = useSuggestionStore();

  const [filter, setFilter] = useState("All");

  const [sortBy, setSortBy] = useState<string>(SORT_OPTIONS[0].value);

  const filteredSuggestions = useMemo(() => {
    const clone = [...suggestions];

    if (sortBy === "rank") {
      clone.sort((a, b) => b.rank - a.rank);
    }
    if (sortBy === "title") {
      clone.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (filter === "All") {
      return [...clone];
    }

    return suggestions.filter(
      (suggestion) => suggestion.suggestionType === filter,
    );
  }, [filter, suggestions, sortBy]);

  return (
    <SearchContext.Provider
      value={{
        filter,
        setFilter,
        filteredSuggestions,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
