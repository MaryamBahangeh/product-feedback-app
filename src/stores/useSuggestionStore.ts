import { SuggestionModel } from "@/models/suggestion-model.ts";
import { create } from "zustand/react";

type SuggestionState = {
  suggestions: SuggestionModel[];
  addSuggestion: (suggestion: SuggestionModel) => void;
  removeSuggestion: (suggestionId: string) => void;
  editSuggestion: (suggestion: SuggestionModel, id: string) => void;
  increaseRank: (suggestionId: string) => void;
};

export const useSuggestionStore = create<SuggestionState>((set) => ({
  suggestions: [],
  addSuggestion: (suggestion: SuggestionModel) =>
    set((state) => ({
      suggestions: [...state.suggestions, suggestion],
    })),

  removeSuggestion: (suggestionId) =>
    set((state) => ({
      suggestions: state.suggestions.filter((s) => s.id != suggestionId),
    })),

  editSuggestion: (suggestion: SuggestionModel) =>
    set((state) => ({
      suggestions: state.suggestions.map((s) => {
        if (s.id === suggestion.id) return suggestion;
        return s;
      }),
    })),

  increaseRank: (suggestionId) =>
    set((state) => ({
      suggestions: state.suggestions.map((s) => {
        if (s.id === suggestionId) s.rank++;
        return s;
      }),
    })),
}));
