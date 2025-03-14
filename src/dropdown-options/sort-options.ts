import { DropdownOption } from "@/models/dropdown-type.ts";

export const SORT_OPTIONS: DropdownOption[] = [
  { value: "rank", translationKey: "toolbar.sortOptions.mostUpVotes" },
  { value: "title", translationKey: "toolbar.sortOptions.title" },
  // { value: "comments", translationKey: "toolbar.sortOptions.comments" },
  // {
  //   value: "suggestionType",
  //   translationKey: "toolbar.sortOptions.category",
  // },
] as const;
