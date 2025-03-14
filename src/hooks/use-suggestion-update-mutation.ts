import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSuggestion } from "@/api/suggestion.ts";

function useSuggestionInsertMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSuggestion,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["suggestions"] });
    },
  });
}

export default useSuggestionInsertMutation;
