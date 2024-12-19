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
import { Suggestion as SuggestionModel } from "@/models/suggestion.ts";

type ContextType = {
  filteredType: string;
  setFilteredType: Dispatch<SetStateAction<string>>;
  filteredSuggestions: SuggestionModel[];
};

export const SearchContext = createContext<ContextType>({
  filteredType: "All",
  setFilteredType: () => {},
  filteredSuggestions: [],
});

function SearchProvider({ children }: PropsWithChildren) {
  const { suggestions } = useContext(SuggestionContext);

  const [filteredType, setFilteredType] = useState("All");

  const filteredSuggestions = useMemo(() => {
    if (filteredType === "All") return [...suggestions];
    else
      return [...suggestions].filter(
        (suggestion) => suggestion.suggestionType === filteredType,
      );
  }, [filteredType, suggestions]);

  return (
    <SearchContext.Provider
      value={{ filteredType, setFilteredType, filteredSuggestions }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
