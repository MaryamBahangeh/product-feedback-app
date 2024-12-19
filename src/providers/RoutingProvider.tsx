import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

import { v4 as uuidv4 } from "uuid";
import { Suggestion as SuggestionModel } from "@/models/suggestion.ts";
import { SUGGESTION_OPTIONS } from "@/suggestion-options/suggestion-options.ts";

type Params = {
  suggestionId?: string;
  suggestion?: SuggestionModel;
  isEditing?: boolean;
};

type ContexType = {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;

  params: Params;
  setParams: Dispatch<SetStateAction<Params>>;
};

export const RoutingContext = createContext<ContexType>({
  page: "",
  setPage: () => {},

  params: {
    suggestionId: "",

    suggestion: {
      id: uuidv4(),
      title: "",
      description: "",
      suggestionType: SUGGESTION_OPTIONS[0].value,
      rank: 0,
    },

    isEditing: false,
  },
  setParams: () => {},
});

function RoutingProvider({ children }: PropsWithChildren) {
  const [page, setPage] = useState("home");
  const [params, setParams] = useState<Params>({ suggestionId: "" });

  return (
    <RoutingContext.Provider value={{ page, setPage, params, setParams }}>
      {children}
    </RoutingContext.Provider>
  );
}

export default RoutingProvider;
