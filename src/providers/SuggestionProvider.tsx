import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { SuggestionModel } from "../models/suggestion.ts";
import { Person } from "../models/person.ts";
import { v4 as uuidv4 } from "uuid";

type CotextTypes = {
  suggestions: SuggestionModel[];
  increaseRank: (id: string) => void;
  addSuggestion: (suggestionInfo: SuggestionModel) => void;

  addComment: (
    sender: Person,
    suggestionId: string,
    commentText: string,
  ) => void;

  reply: (
    sender: Person,
    suggestionId: string,
    commentId: string,
    replyText: string,
  ) => void;
};
export const SuggestionContext = createContext<CotextTypes>({
  suggestions: [],
  increaseRank: () => {},
  addSuggestion: () => {},
  addComment: () => {},
  reply: () => {},
});

type Props = PropsWithChildren;

function SuggestionProvider({ children }: Props) {
  const LOCAL_STORAGE_KEY = "suggestion";

  const defaultSuggestions = () => {
    if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
      return [];
    }
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string);
  };

  const [suggestions, setSuggestions] =
    useState<SuggestionModel[]>(defaultSuggestions);

  const increaseRank = (id: string) => {
    const old = [...suggestions];
    old.map((suggestion) => {
      if (suggestion.id === id) {
        suggestion.rank++;
      }
      return suggestion;
    });
    old.sort((a, b) => b.rank - a.rank);
    setSuggestions(old);
  };

  const addSuggestion = (suggestionInfo: SuggestionModel) => {
    const old = [...suggestions, suggestionInfo];
    old.sort((a, b) => b.rank - a.rank);
    setSuggestions(old);
  };

  const addComment = (
    sender: Person,
    suggestionId: string,
    commentText: string,
  ) => {
    const old = [...suggestions];
    old.map((suggestion) => {
      if (suggestion.id === suggestionId) {
        if (!suggestion.comments) {
          suggestion.comments = [
            {
              id: uuidv4(),
              sender: sender,
              commentText: commentText,
              reply: null,
            },
          ];
        } else {
          suggestion.comments.push({
            id: uuidv4(),
            sender: sender,
            commentText: commentText,
            reply: null,
          });
        }
      }
      return suggestion;
    });

    setSuggestions(old);
  };

  const reply = (
    sender: Person,
    suggestionId: string,
    commentId: string,
    replyText: string,
  ) => {
    const old = [...suggestions];
    old.map((suggestion) => {
      if (suggestion.id === suggestionId) {
        suggestion.comments?.map((comment) => {
          if (comment.id === commentId) {
            if (!comment.reply) {
              comment.reply = [
                {
                  id: uuidv4(),
                  sender: sender,
                  commentText: replyText,
                  reply: null,
                },
              ];
            } else {
              comment.reply.push({
                id: uuidv4(),
                sender: sender,
                commentText: replyText,
                reply: null,
              });
            }
          }
          return comment;
        });
      }
      return suggestion;
    });

    setSuggestions(old);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(suggestions));
  }, [suggestions]);

  return (
    <SuggestionContext.Provider
      value={{ suggestions, increaseRank, addSuggestion, addComment, reply }}
    >
      {children}
    </SuggestionContext.Provider>
  );
}

export default SuggestionProvider;
