import { QueryClient, useMutation } from "@tanstack/react-query";
import { addSuggestion } from "@/api/suggestion.ts";

const queryClient = new QueryClient();

function useSuggestionInsertMutation() {
  return useMutation({
    mutationFn: addSuggestion,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["suggestions"] });
    },
  });
}

export default useSuggestionInsertMutation;
