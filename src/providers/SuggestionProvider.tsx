import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { SuggestionModel } from "@/models/suggestion-model.ts";
import { Comment } from "@/models/comment.ts";

import {
  LOCAL_STORAGE_SUGGESTION_KEY,
  LOCAL_STORAGE_COMMENT_KEY,
} from "@/constants/localstorage.constants.ts";

import { SortType } from "@/models/sort-type.ts";
import { SORT_OPTIONS } from "@/sort-options/sort-options.ts";

type CotextTypes = {
  suggestions: SuggestionModel[];
  addSuggestion: (newSuggestion: SuggestionModel) => void;
  editSuggestion: (
    suggestionId: string,
    newSuggestion: SuggestionModel,
  ) => void;
  getCommentsByParentId: (parentId: string) => Comment[];
  addComment: (newComment: Comment) => void;
  increaseRank: (id: string) => void;
  sortBy: SortType;
  setSortBy: Dispatch<SetStateAction<SortType>>;
};

export const SuggestionContext = createContext<CotextTypes>({
  suggestions: [],
  addSuggestion: () => {},
  editSuggestion: () => {},
  getCommentsByParentId: () => {
    return [];
  },
  addComment: () => {},
  increaseRank: () => {},
  sortBy: SORT_OPTIONS[0],
  setSortBy: () => {},
});

const defaultLocalstorage = (key: string, defaultValue: any) => {
  if (!localStorage.getItem(key)) {
    return defaultValue;
  }
  return JSON.parse(localStorage.getItem(key) as string);
};

type Props = PropsWithChildren;

function SuggestionProvider({ children }: Props) {
  const [suggestions, setSuggestions] = useState<SuggestionModel[]>(
    defaultLocalstorage(LOCAL_STORAGE_SUGGESTION_KEY, []),
  );

  const [comments, setComments] = useState<Comment[]>(
    defaultLocalstorage(LOCAL_STORAGE_COMMENT_KEY, []),
  );

  const [sortBy, setSortBy] = useState<SortType>(SORT_OPTIONS[0]);

  const addSuggestion = (newSuggestion: SuggestionModel) => {
    setSuggestions((old) => [...old, { ...newSuggestion }]);
  };

  const editSuggestion = (
    suggestionId: string,
    newSuggestion: SuggestionModel,
  ) => {
    setSuggestions((old) =>
      old.map((suggestion) => {
        if (suggestion.id === suggestionId) {
          return { ...newSuggestion };
        }
        return suggestion;
      }),
    );
  };

  const getCommentsByParentId = (parentId: string): Comment[] => {
    return comments.filter((comment) => comment.parentId === parentId);
  };

  const addComment = (newComment: Comment) => {
    setComments((old) => [...old, newComment]);
  };

  const increaseRank = (id: string) => {
    setSuggestions((old) =>
      old.map((suggestion) => {
        if (suggestion.id === id) {
          return { ...suggestion, rank: suggestion.rank + 1 };
        }
        return suggestion;
      }),
    );
  };

  const sort = () => {
    if (sortBy.value === "rank")
      setSuggestions((old) => old.sort((a, b) => b.rank - a.rank));
    if (sortBy.value === "title") setSuggestions((old) => old.sort());
  };

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_SUGGESTION_KEY,
      JSON.stringify(suggestions),
    );

    sort();
  }, [suggestions]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_COMMENT_KEY, JSON.stringify(comments));
  }, [comments]);

  return (
    <SuggestionContext.Provider
      value={{
        suggestions,
        addSuggestion,
        editSuggestion,
        getCommentsByParentId,
        addComment,
        increaseRank,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </SuggestionContext.Provider>
  );
}

export default SuggestionProvider;
