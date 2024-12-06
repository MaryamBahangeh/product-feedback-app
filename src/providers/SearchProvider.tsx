import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { SuggestionContext } from "./SuggestionProvider.tsx";
import { SuggestionModel } from "../models/suggestion.ts";

type ContextType = {
  filterByType: (type: string) => void;
  type: string;
  filteredSuggestions: SuggestionModel[];
};

export const SearchContext = createContext<ContextType>({
  filterByType: () => {},
  type: "All",
  filteredSuggestions: [],
});

function SearchProvider({ children }: PropsWithChildren) {
  const { suggestions } = useContext(SuggestionContext);
  const [filteredSuggestions, setFilteredSuggestions] =
    useState<SuggestionModel[]>(suggestions);

  const [type, setType] = useState("All");

  const filterByType = (type: string) => {
    setType(type);
    if (type === "All") {
      setFilteredSuggestions([...suggestions]);
      return;
    }
    setFilteredSuggestions(
      [...suggestions].filter((suggestion) => {
        return suggestion.suggestionType === type;
      }),
    );
  };

  useEffect(() => {
    filterByType(type);
  }, [suggestions]);

  return (
    <SearchContext.Provider value={{ filterByType, type, filteredSuggestions }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
