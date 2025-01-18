import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useReducer,
} from "react";

import { SuggestionModel } from "@/models/suggestion-model.ts";
import { Comment } from "@/models/comment.ts";

import {
  LOCAL_STORAGE_SUGGESTION_KEY,
  LOCAL_STORAGE_COMMENT_KEY,
} from "@/constants/localstorage.constants.ts";

import { suggestionReducer } from "@/reducers/suggestionReducer.ts";
import { commentReducer } from "@/reducers/commentReducer.ts";

type ContextTypes = {
  suggestions: SuggestionModel[];
  addSuggestion: (newSuggestion: SuggestionModel) => void;
  editSuggestion: (
    suggestionId: string,
    newSuggestion: SuggestionModel,
  ) => void;
  deleteSuggestion: (suggestionId: string) => void;
  getCommentsByParentId: (parentId: string) => Comment[];
  addComment: (newComment: Comment) => void;
  increaseRank: (id: string) => void;
};

export const SuggestionContext = createContext<ContextTypes>({
  suggestions: [],
  addSuggestion: () => {},
  editSuggestion: () => {},
  deleteSuggestion: () => {},
  getCommentsByParentId: () => [],
  addComment: () => {},
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

  const [comments, commentsDispatch] = useReducer(
    commentReducer,
    defaultLocalstorage<Comment[]>(LOCAL_STORAGE_COMMENT_KEY, []),
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

  const getCommentsByParentId = useCallback(
    (parentId: string): Comment[] => {
      return comments.filter((comment) => comment.parentId === parentId);
    },
    [comments],
  );

  const addComment = (newComment: Comment): void => {
    commentsDispatch({ type: "added_comment", newComment: newComment });
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

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_COMMENT_KEY, JSON.stringify(comments));
  }, [comments]);

  return (
    <SuggestionContext.Provider
      value={{
        suggestions,
        addSuggestion,
        editSuggestion,
        deleteSuggestion,
        getCommentsByParentId,
        addComment,
        increaseRank,
      }}
    >
      {children}
    </SuggestionContext.Provider>
  );
}

export default SuggestionProvider;
