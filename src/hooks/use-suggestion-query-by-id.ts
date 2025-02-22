import { useQuery } from "@tanstack/react-query";
import { fetchSuggestionById } from "@/api/suggestion.ts";

function useSuggestionQueryById(id: string) {
  return useQuery({
    queryKey: ["suggestions", id],
    queryFn: () => fetchSuggestionById(id),
  });
}

export default useSuggestionQueryById;
