import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { Suggestion as SuggestionModel } from "@/models/suggestion.ts";
import { Comment } from "@/models/comment.ts";

import {
  LOCAL_STORAGE_SUGGESTION_KEY,
  LOCAL_STORAGE_COMMENT_KEY,
} from "@/constants/localstorage.constants.ts";

type CotextTypes = {
  suggestions: SuggestionModel[];
  addSuggestion: (newSuggestion: SuggestionModel) => void;
  editSuggestion: (
    suggestionId: string,
    newSuggestion: SuggestionModel,
  ) => void;
  getComments: (parentId: string) => Comment[];
  addComment: (newComment: Comment) => void;
  increaseRank: (id: string) => void;
};

export const SuggestionContext = createContext<CotextTypes>({
  suggestions: [],
  addSuggestion: () => {},
  editSuggestion: () => {},
  getComments: () => {
    return [];
  },
  addComment: () => {},
  increaseRank: () => {},
});

type Props = PropsWithChildren;

function SuggestionProvider({ children }: Props) {
  const defaultSuggestions = () => {
    if (!localStorage.getItem(LOCAL_STORAGE_SUGGESTION_KEY)) {
      return [];
    }
    return JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_SUGGESTION_KEY) as string,
    );
  };

  const [suggestions, setSuggestions] =
    useState<SuggestionModel[]>(defaultSuggestions);

  const defaultComments = () => {
    if (!localStorage.getItem(LOCAL_STORAGE_COMMENT_KEY)) {
      return [];
    }
    return JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_COMMENT_KEY) as string,
    );
  };

  const [comments, setComments] = useState<Comment[]>(defaultComments);

  const addSuggestion = (newSuggestion: SuggestionModel) => {
    setSuggestions((old) =>
      [...old, newSuggestion].sort((a, b) => b.rank - a.rank),
    );
  };

  const editSuggestion = (
    suggestionId: string,
    newSuggestion: SuggestionModel,
  ) => {
    setSuggestions((old) =>
      old.map((suggestion: SuggestionModel) => {
        if (suggestion.id === suggestionId) {
          return newSuggestion;
        }
        return suggestion;
      }),
    );
  };

  const getComments = (parentId: string): Comment[] => {
    //return comments.filter((comment: Comment) => comment.parentId === parentId);
    return comments;
  };

  const addComment = (newComment: Comment) => {
    setComments((old) => [...old, newComment]);
  };

  const increaseRank = (id: string) => {
    setSuggestions((old) =>
      old.map((suggestion: SuggestionModel) => {
        if (suggestion.id === id) {
          return { ...suggestion, rank: suggestion.rank + 1 };
        }
        return suggestion;
      }),
    );
  };

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_SUGGESTION_KEY,
      JSON.stringify(suggestions),
    );
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
        getComments,
        addComment,
        increaseRank,
      }}
    >
      {children}
    </SuggestionContext.Provider>
  );
}

export default SuggestionProvider;
