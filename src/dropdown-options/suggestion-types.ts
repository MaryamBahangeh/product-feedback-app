import { DropdownOption } from "@/models/dropdown-type.ts";

export const SUGGESTION_TYPES: DropdownOption[] = [
  { value: "UI", translationKey: "createEditForm.categoryOptions.ui" },
  { value: "UX", translationKey: "createEditForm.categoryOptions.ux" },
  {
    value: "Enhancement",
    translationKey: "createEditForm.categoryOptions.enhancement",
  },
  {
    value: "Feature",
    translationKey: "createEditForm.categoryOptions.feature",
  },
  { value: "Bug", translationKey: "createEditForm.categoryOptions.bug" },
];
