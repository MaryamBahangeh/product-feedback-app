import { DropdownOption } from "@/models/dropdown-type.ts";

export const SUGGESTION_TYPES: DropdownOption[] = [
  { value: "UI", translationKey: "createEditForm.categoryOptions.UI" },
  { value: "UX", translationKey: "createEditForm.categoryOptions.UX" },
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
