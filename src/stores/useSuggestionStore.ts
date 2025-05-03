import { SuggestionModel } from "@/models/suggestion-model.ts";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { LOCAL_STORAGE_SUGGESTION_KEY } from "@/constants/localstorage.constants.ts";
import { StateCreator } from "zustand";

type SuggestionState = {
  suggestions: SuggestionModel[];
  addSuggestion: (suggestion: SuggestionModel) => void;
  removeSuggestion: (suggestionId: string) => void;
  editSuggestion: (suggestion: SuggestionModel, suggestionId: string) => void;
  increaseRank: (suggestionId: string) => void;
};

const suggestionStore: StateCreator<SuggestionState> = (set) => ({
  suggestions: [],
  addSuggestion: (suggestion: SuggestionModel) =>
    set((state) => ({
      suggestions: [...state.suggestions, suggestion],
    })),

  removeSuggestion: (suggestionId) =>
    set((state) => ({
      suggestions: state.suggestions.filter((s) => s.id != suggestionId),
    })),

  editSuggestion: (suggestion: SuggestionModel, suggestionId) =>
    set((state) => ({
      suggestions: state.suggestions.map((s) =>
        s.id === suggestionId ? suggestion : s,
      ),
    })),

  increaseRank: (suggestionId) =>
    set((state) => ({
      suggestions: state.suggestions.map((s) =>
        s.id === suggestionId ? { ...s, rank: s.rank + 1 } : s,
      ),
    })),
});

const isDev = process.env.NODE_ENV === "development";
const middleware = isDev
  ? devtools(persist(suggestionStore, { name: LOCAL_STORAGE_SUGGESTION_KEY }), {
      name: "SuggestionStore",
    })
  : persist(suggestionStore, { name: LOCAL_STORAGE_SUGGESTION_KEY });

export const useSuggestionStore = create<SuggestionState>()(
  middleware as never,
);
