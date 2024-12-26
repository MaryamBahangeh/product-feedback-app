import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

import { SuggestionModel } from "@/models/suggestion-model.ts";

type Params = {
  suggestionId?: string;
  suggestion?: SuggestionModel;
  isEditing?: boolean;
};

type ContextType = {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;

  params: Params;
  setParams: Dispatch<SetStateAction<Params>>;
};

export const RoutingContext = createContext<ContextType>({
  page: "",
  setPage: () => {},

  params: {},
  setParams: () => {},
});

function RoutingProvider({ children }: PropsWithChildren) {
  const [page, setPage] = useState("home");
  const [params, setParams] = useState<Params>({});

  return (
    <RoutingContext.Provider value={{ page, setPage, params, setParams }}>
      {children}
    </RoutingContext.Provider>
  );
}

export default RoutingProvider;
