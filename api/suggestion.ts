import { SuggestionModel } from "@/models/suggestion-model.ts";

const BASE_URL = "http://localhost:3000/suggestions";

export const fetchSuggestions = async (
  suggestionType: string,
  sortBy: string,
): Promise<SuggestionModel[]> => {
  const params = new URLSearchParams({ suggestionType });

  let url = BASE_URL + "?_sort=" + sortBy + "&_order=desc";
  if (suggestionType !== "All") {
    url = BASE_URL + "&" + params;
  }

  const response = await fetch(url);
  return await response.json();
};

export const addSuggestion = async (suggestion: SuggestionModel) => {
  await fetch(BASE_URL, { method: "POST", body: JSON.stringify(suggestion) });
};

export const updateSuggestion = async (
  id: SuggestionModel["id"],
  partialSuggestion: Partial<SuggestionModel>,
) => {
  await fetch(BASE_URL + "/" + id, {
    method: "PATCH",
    body: JSON.stringify(partialSuggestion),
  });
};
