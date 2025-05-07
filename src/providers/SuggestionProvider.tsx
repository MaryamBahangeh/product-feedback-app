import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
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
  isLoading: boolean;
};

export const SuggestionContext = createContext<ContextTypes>({
  suggestions: [],
  dispatch: () => {},
  increaseRank: () => {},
  isLoading: true,
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

  const [isLoading, setIsLoading] = useState(true);

  const increaseRank = (id: string): void => {
    dispatch({ type: "rank_increased", suggestionId: id });
  };

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_SUGGESTION_KEY,
      JSON.stringify(suggestions),
    );
  }, [suggestions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <SuggestionContext.Provider
      value={{
        suggestions,
        dispatch,
        increaseRank,
        isLoading,
      }}
    >
      {children}
    </SuggestionContext.Provider>
  );
}

export default SuggestionProvider;
