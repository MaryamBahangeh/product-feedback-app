import { SuggestionModel } from "@/models/suggestion-model.ts";

export const defaultSuggestions: SuggestionModel[] = [
  {
    id: "5b9fa833-6c61-011-8a2d-1fedbfcbef7b",
    title: "Add a dark theme option",
    description:
      "It would help people with light sensitives and who prefer dark mode ",
    suggestionType: "Feature",
    suggestionStatus: "Suggestion",
    rank: 432,
    comments: [],
  },
  {
    id: "897c1568-3430-4ba5-9dee-50afde8573",
    title: "One-click portfolio generation",
    description:
      "Add ability to create professional looking portfolio from profile",
    suggestionType: "Feature",
    suggestionStatus: "In-Progress",
    rank: 560,
    comments: [],
  },
  {
    id: "897c13430-4ba5-9dee-50afd8ce8573",
    title: "Bookmark challenges",
    description: "Be able to bookmark challenges to take later on",
    suggestionType: "Feature",
    suggestionStatus: "In-Progress",
    rank: 120,
    comments: [],
  },
  {
    id: "897c1568-3430-4ba5-9deefd8ce857",
    title: "Animated solution screenshots",
    description:
      "screenshots of solutions with animations do not display currently",
    suggestionType: "Bug",
    suggestionStatus: "In-Progress",
    rank: 159,
    comments: [],
  },

  {
    id: "8907c-3430-4ba5-9deefd8ce8",
    title: "More comprehensive reports",
    description:
      "It would be great to see a more detailed breakdown of solutions",
    suggestionType: "Feature",
    suggestionStatus: "Planned",
    rank: 220,
    comments: [],
  },
  {
    id: "897c1-3430-4ba5-9deefd8ce8",
    title: "Learning paths",
    description:
      "Sequenced projects for different goals to help people improve",
    suggestionType: "Feature",
    suggestionStatus: "Planned",
    rank: 354,
    comments: [],
  },
  {
    id: "897c1568-34388-4ba5-9deefd8ce8",
    title: "Add micro-interactions",
    description: "Small animations at specific points can add delight",
    suggestionType: "Enhancement",
    suggestionStatus: "Live",
    rank: 200,
    comments: [],
  },
];
