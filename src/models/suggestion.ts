import { Comment } from "./comment.ts";

export type SuggestionModel = {
  id: string;
  title: string;
  description: string;
  suggestionType: string;
  rank: number;
  comments: Comment[] | null;
};
