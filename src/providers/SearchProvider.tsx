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
  filteredType: string;
  setFilteredType: Dispatch<SetStateAction<string>>;
  filteredSuggestions: SuggestionModel[];
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
};

export const SearchContext = createContext<ContextType>({
  filteredType: "",
  setFilteredType: () => {},
  filteredSuggestions: [],
  sortBy: "",
  setSortBy: () => {},
});

function SearchProvider({ children }: PropsWithChildren) {
  const { suggestions } = useContext(SuggestionContext);

  const [filteredType, setFilteredType] = useState("All");

  const [sortBy, setSortBy] = useState<string>(SORT_OPTIONS[0].value);

  const filteredSuggestions = useMemo(() => {
    const clone = [...suggestions];

    if (sortBy === "rank") {
      clone.sort((a, b) => b.rank - a.rank);
    }
    if (sortBy === "title") {
      clone.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (filteredType === "All") {
      return [...clone];
    }

    return suggestions.filter(
      (suggestion) => suggestion.suggestionType === filteredType,
    );
  }, [filteredType, suggestions, sortBy]);

  return (
    <SearchContext.Provider
      value={{
        filteredType,
        setFilteredType,
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
