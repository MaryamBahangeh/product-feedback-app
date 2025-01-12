import { SuggestionModel } from "@/models/suggestion-model.ts";

type SuggestionAction =
  | {
      type: "added_suggestion";
      newSuggestion: SuggestionModel;
    }
  | {
      type: "edited_suggestion";
      newSuggestion: SuggestionModel;
      suggestionId: string;
    }
  | {
      type: "rank_increased";
      suggestionId: string;
    };

export function suggestionReducer(
  suggestions: SuggestionModel[],
  action: SuggestionAction,
): SuggestionModel[] {
  switch (action.type) {
    case "added_suggestion": {
      return [...suggestions, action.newSuggestion];
    }

    case "edited_suggestion": {
      return suggestions.map((suggestion) => {
        if (suggestion.id === action.suggestionId) {
          return { ...action.newSuggestion };
        }
        return suggestion;
      });
    }

    case "rank_increased": {
      return suggestions.map((suggestion) => {
        if (suggestion.id === action.suggestionId) {
          return { ...suggestion, rank: suggestion.rank + 1 };
        }
        return suggestion;
      });
    }

    default: {
      throw Error("Unknown action");
    }
  }
}
