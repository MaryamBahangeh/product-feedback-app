import { User } from "@/assets/data/users.ts";

export type Comment = {
  id: string;
  text: string;
  user: User;
  parentId: string;
};
