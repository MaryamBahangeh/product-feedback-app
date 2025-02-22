import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { SearchContext } from "@/providers/SearchProvider.tsx";
import { fetchSuggestionById } from "@/api/suggestion.ts";

function useSuggestionQueryById(id: string) {
  const { filter } = useContext(SearchContext);

  return useQuery({
    queryKey: ["suggestions", filter, id],
    queryFn: () => fetchSuggestionById(id),
  });
}

export default useSuggestionQueryById;
