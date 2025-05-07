import { DropdownOption } from "@/models/dropdown-type.ts";

export const SUGGESTION_STATUS: DropdownOption[] = [
  {
    value: "Suggestion",
    translationKey: "createEditForm.statusOptions.suggestion",
  },
  { value: "Planned", translationKey: "createEditForm.statusOptions.planned" },
  {
    value: "In-Progress",
    translationKey: "createEditForm.statusOptions.inProgressed",
  },
  { value: "Live", translationKey: "createEditForm.statusOptions.live" },
];
