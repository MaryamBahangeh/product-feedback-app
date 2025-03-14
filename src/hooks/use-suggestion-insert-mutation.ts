import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addSuggestion } from "@/api/suggestion.ts";



function useSuggestionInsertMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSuggestion,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["suggestions"] });
    },
  });
}

export default useSuggestionInsertMutation;
