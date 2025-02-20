import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useEffect,
  useReducer,
} from "react";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import { LOCAL_STORAGE_SUGGESTION_KEY } from "@/constants/localstorage.constants.ts";

import {
  SuggestionAction,
  suggestionReducer,
} from "@/reducers/suggestionReducer.ts";

type ContextTypes = {
  suggestions: SuggestionModel[];
  dispatch: Dispatch<SuggestionAction>;
  increaseRank: (id: string) => void;
};

export const SuggestionContext = createContext<ContextTypes>({
  suggestions: [],
  dispatch: () => {},
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



  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_SUGGESTION_KEY,
      JSON.stringify(suggestions),
    );
  }, [suggestions]);

  return (
    <SuggestionContext.Provider
      value={{
      }}
    >
      {children}
    </SuggestionContext.Provider>
  );
}

export default SuggestionProvider;
