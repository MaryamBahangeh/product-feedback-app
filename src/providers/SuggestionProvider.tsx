import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useReducer,
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
    }
  | {
      type: "sorted_suggestions";
      sortBy: SortType;
    };

function suggestionReducer(
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

    case "sorted_suggestions": {
      if (action.sortBy.value === "rank") {
        return suggestions.sort((a, b) => b.rank - a.rank);
      }
      if (action.sortBy.value === "title") {
        return suggestions.sort((a, b) => a.title.localeCompare(b.title));
      }
      return suggestions;
    }

    default: {
      throw Error("Unknown action");
    }
  }
}

type CommentAction = {
  type: "added_comment";
  newComment: Comment;
};

const commentReducer = (
  comments: Comment[],
  action: CommentAction,
): Comment[] => {
  switch (action.type) {
    case "added_comment": {
      return [...comments, action.newComment];
    }

    default: {
      throw Error("Unknown action");
    }
  }
};

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
  const [suggestions, dispatch] = useReducer(
    suggestionReducer,
    defaultLocalstorage(LOCAL_STORAGE_SUGGESTION_KEY, []),
  );

  const [comments, commentsDispatch] = useReducer(
    commentReducer,
    defaultLocalstorage(LOCAL_STORAGE_COMMENT_KEY, []),
  );

  const [sortBy, setSortBy] = useState<SortType>(SORT_OPTIONS[0]);

  const addSuggestion = (newSuggestion: SuggestionModel) => {
    dispatch({ type: "added_suggestion", newSuggestion: newSuggestion });
  };

  const editSuggestion = (
    suggestionId: string,
    newSuggestion: SuggestionModel,
  ) => {
    dispatch({
      type: "edited_suggestion",
      suggestionId: suggestionId,
      newSuggestion: newSuggestion,
    });
  };

  const getCommentsByParentId = (parentId: string): Comment[] => {
    return comments.filter((comment) => comment.parentId === parentId);
  };

  const addComment = (newComment: Comment) => {
    commentsDispatch({ type: "added_comment", newComment: newComment });
  };

  const increaseRank = (id: string) => {
    dispatch({ type: "rank_increased", suggestionId: id });
  };

  useEffect(() => {
    dispatch({ type: "sorted_suggestions", sortBy: sortBy });

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
