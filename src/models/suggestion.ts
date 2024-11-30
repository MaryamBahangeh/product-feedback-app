import { Person } from "./person.ts";
import { SuggestionType } from "./suggestion-type.ts";

export type SuggestionModel = {
  title: string;
  description: string;
  suggestionType: SuggestionType;
  rank: number;
  comments: [
    {
      sender: Person;
      commentText: string;
    },
  ];
};
