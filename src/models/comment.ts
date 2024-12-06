import { Person } from "./person.ts";

export type Comment = {
  id: string;
  sender: Person;
  commentText: string;
  reply: Comment[] | null;
};
