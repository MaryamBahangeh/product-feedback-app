import { SuggestionModel } from "@/models/suggestion-model.ts";

const BASE_URL = "https://json-server-nine-beta.vercel.app/suggestions";

export const fetchSuggestions = async (data: {
  suggestionType: string;
  sortBy: string;
}): Promise<SuggestionModel[]> => {
  const params = new URLSearchParams({ suggestionType: data.suggestionType });

  let url = BASE_URL + "?_sort=" + data.sortBy + "&_order=desc";
  if (data.suggestionType !== "All") {
    url = url + "&" + params;
  }

  const response = await fetch(url);
  return await response.json();
};

export const fetchSuggestionById = async (
  suggestionId: string,
): Promise<SuggestionModel> => {
  const response = await fetch(BASE_URL + "/" + suggestionId).then();
  return await response.json();
};

export const addSuggestion = async (suggestion: SuggestionModel) => {
  await fetch(BASE_URL, { method: "POST", body: JSON.stringify(suggestion), headers: { "Content-Type": "application/json" } });
};

export const updateSuggestion = async (data: {
  id: SuggestionModel["id"];
  partialSuggestion: Partial<SuggestionModel>;
}) => {
  await fetch(BASE_URL + "/" + data.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data.partialSuggestion),
  });
};

export const removeSuggestion = async (id: string) => {
  await fetch(BASE_URL + "/" + id, { method: "DELETE" });
};
