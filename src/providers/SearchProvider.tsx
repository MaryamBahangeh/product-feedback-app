import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

import { SuggestionContext } from "./SuggestionProvider.tsx";
import { SuggestionModel } from "@/models/suggestion-model.ts";
import { SORT_OPTIONS } from "@/sort-options/sort-options.ts";

type ContextType = {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  filteredSuggestions: SuggestionModel[];
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<(typeof SORT_OPTIONS)[number]["value"]>>;
};

export const SearchContext = createContext<ContextType>({
  filter: "",
  setFilter: () => {},
  filteredSuggestions: [],
  sortBy: "",
  setSortBy: () => {},
});

function SearchProvider({ children }: PropsWithChildren) {
  const { suggestions } = useContext(SuggestionContext);

  const [filter, setFilter] = useState("All");

  const [sortBy, setSortBy] = useState<(typeof SORT_OPTIONS)[number]["value"]>(
    SORT_OPTIONS[0].value,
  );

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
