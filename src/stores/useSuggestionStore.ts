import { SuggestionModel } from "@/models/suggestion-model.ts";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { LOCAL_STORAGE_SUGGESTION_KEY } from "@/constants/localstorage.constants.ts";
import { StateCreator } from "zustand";
import { defaultSuggestions } from "@/assets/data/defaultSuggestions.ts";

type SuggestionState = {
  suggestions: SuggestionModel[];
  addSuggestion: (suggestion: SuggestionModel) => void;
  removeSuggestion: (suggestionId: string) => void;
  editSuggestion: (suggestion: SuggestionModel, suggestionId: string) => void;
  increaseRank: (suggestionId: string) => void;
};

type SuggestionStoreCreator = StateCreator<
  SuggestionState,
  [["zustand/devtools", { name: string }], ["zustand/persist", unknown]]
>;

const suggestionStore: SuggestionStoreCreator = (set) => ({
  suggestions: defaultSuggestions,
  addSuggestion: (suggestion: SuggestionModel) =>
    set(
      (state) => ({
        suggestions: [...state.suggestions, suggestion],
      }),
      false,
      "addSuggestion",
    ),

  removeSuggestion: (suggestionId) =>
    set(
      (state) => ({
        suggestions: state.suggestions.filter((s) => s.id != suggestionId),
      }),
      false,
      "removeSuggestion",
    ),

  editSuggestion: (suggestion: SuggestionModel, suggestionId) =>
    set(
      (state) => ({
        suggestions: state.suggestions.map((s) =>
          s.id === suggestionId ? suggestion : s,
        ),
      }),
      false,
      "editSuggestion",
    ),

  increaseRank: (suggestionId) =>
    set(
      (state) => ({
        suggestions: state.suggestions.map((s) =>
          s.id === suggestionId ? { ...s, rank: s.rank + 1 } : s,
        ),
      }),
      false,
      "increaseRank",
    ),
});

const isDev = process.env.NODE_ENV === "development";
const middleware = isDev
  ? persist(devtools(suggestionStore as never, { name: "SuggestionStore" }), {
      name: LOCAL_STORAGE_SUGGESTION_KEY,
    })
  : persist(suggestionStore, { name: LOCAL_STORAGE_SUGGESTION_KEY });

export const useSuggestionStore = create<SuggestionState>()(
  middleware as never,
);
