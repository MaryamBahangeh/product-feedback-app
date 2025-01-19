import { CommentModel } from "@/models/comment-model.ts";

export type SuggestionModel = {
  id: string;
  title: string;
  description: string;
  suggestionType: string;
  rank: number;
  comments: CommentModel[];
};
