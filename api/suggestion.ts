import { SuggestionModel } from "@/models/suggestion-model.ts";

const BASE_URL = "http://localhost:3000/suggestions";

export const fetchSuggestions = async (
  suggestionType: string,
): Promise<SuggestionModel[]> => {
  const params = new URLSearchParams({ suggestionType });

  let url = BASE_URL;
  if (suggestionType !== "All") {
    url = BASE_URL + "?" + params;
  }

  const response = await fetch(url);
  return await response.json();
};
