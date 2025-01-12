import { SortType } from "@/models/sort-type.ts";

export const SORT_OPTIONS: SortType[] = [
  { value: "rank", name: "Most Upvotes" },
  { value: "title", name: "Title" },
  { value: "comments", name: "Comments" },
  { value: "suggestionType", name: "Category" },
];
