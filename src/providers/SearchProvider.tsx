import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

import { SORT_OPTIONS } from "@/dropdown-options/sort-options.ts";

type ContextType = {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
};

export const SearchContext = createContext<ContextType>({
  filter: "",
  setFilter: () => {},
  sortBy: "",
  setSortBy: () => {},
});

function SearchProvider({ children }: PropsWithChildren) {
  const [filter, setFilter] = useState("All");

  const [sortBy, setSortBy] = useState<string>(SORT_OPTIONS[0].value);

  return (
    <SearchContext.Provider
      value={{
        filter,
        setFilter,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
