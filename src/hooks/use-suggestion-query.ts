import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { SearchContext } from "@/providers/SearchProvider.tsx";
import { fetchSuggestions } from "@/api/suggestion.ts";

function useSuggestionQuery() {
  const { filter, sortBy } = useContext(SearchContext);

  return useQuery({
    queryKey: ["suggestions", filter, sortBy],
    queryFn: () => fetchSuggestions({ suggestionType: filter, sortBy }),
    initialData: [],
  });
}

export default useSuggestionQuery;
