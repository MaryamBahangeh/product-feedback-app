import { User } from "@/assets/data/users.ts";

export type CommentModel = {
  id: string;
  text: string;
  user: User;
  comments: CommentModel[];
};
