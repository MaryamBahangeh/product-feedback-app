import { createContext, PropsWithChildren, useEffect, useReducer } from "react";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import { LOCAL_STORAGE_SUGGESTION_KEY } from "@/constants/localstorage.constants.ts";

import { suggestionReducer } from "@/reducers/suggestionReducer.ts";

type ContextTypes = {
  suggestions: SuggestionModel[];
  addSuggestion: (newSuggestion: SuggestionModel) => void;
  editSuggestion: (
    suggestionId: string,
    newSuggestion: SuggestionModel,
  ) => void;
  deleteSuggestion: (suggestionId: string) => void;
  increaseRank: (id: string) => void;
};

export const SuggestionContext = createContext<ContextTypes>({
  suggestions: [],
  addSuggestion: () => {},
  editSuggestion: () => {},
  deleteSuggestion: () => {},
  increaseRank: () => {},
});

function defaultLocalstorage<T>(key: string, defaultValue: T): T {
  if (!localStorage.getItem(key)) {
    return defaultValue as T;
  }
  return JSON.parse(localStorage.getItem(key) as string) as T;
}

type Props = PropsWithChildren;

function SuggestionProvider({ children }: Props) {
  const [suggestions, dispatch] = useReducer(
    suggestionReducer,
    defaultLocalstorage<SuggestionModel[]>(LOCAL_STORAGE_SUGGESTION_KEY, []),
  );

  const addSuggestion = (newSuggestion: SuggestionModel) => {
    dispatch({ type: "added_suggestion", newSuggestion });
  };

  const editSuggestion = (
    suggestionId: string,
    newSuggestion: SuggestionModel,
  ) => {
    dispatch({
      type: "edited_suggestion",
      suggestionId,
      newSuggestion,
    });
  };

  const deleteSuggestion = (suggestionId: string) => {
    dispatch({ type: "deleted_suggestion", suggestionId });
  };

  const increaseRank = (id: string): void => {
    dispatch({ type: "rank_increased", suggestionId: id });
  };

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_SUGGESTION_KEY,
      JSON.stringify(suggestions),
    );
  }, [suggestions]);

  return (
    <SuggestionContext.Provider
      value={{
        suggestions,
        addSuggestion,
        editSuggestion,
        deleteSuggestion,
        increaseRank,
      }}
    >
      {children}
    </SuggestionContext.Provider>
  );
}

export default SuggestionProvider;
