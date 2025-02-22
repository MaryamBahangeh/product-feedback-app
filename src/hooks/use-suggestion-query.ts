import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { SearchContext } from "@/providers/SearchProvider.tsx";
import { fetchSuggestions } from "@/api/suggestion.ts";

function useSuggestionQuery(data: { suggestionType: string; sortBy: string }) {
  const { filter } = useContext(SearchContext);

  return useQuery({
    queryKey: ["suggestions", filter, data],
    queryFn: () => fetchSuggestions(data),
    initialData: [],
  });
}

export default useSuggestionQuery;
