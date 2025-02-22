import { QueryClient, useMutation } from "@tanstack/react-query";
import { updateSuggestion } from "../../api/suggestion.ts";

const queryClient = new QueryClient();

function useSuggestionInsertMutation() {
  return useMutation({
    mutationFn: updateSuggestion,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["suggestions"] });
    },
  });
}

export default useSuggestionInsertMutation;
