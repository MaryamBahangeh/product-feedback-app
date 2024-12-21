import { useContext } from "react";

import { RoutingContext } from "@/providers/RoutingProvider.tsx";

import Home from "@/components/Home/Home.tsx";

import SuggestionDetail from "@/pages/SuggestionComments/SuggestionComments.tsx";
import EditSuggestion from "@/pages/EditSuggestion/EditSuggestion.tsx";

import { Suggestion as SuggestionModel } from "@/models/suggestion.ts";

function Routing() {
  const { page, params } = useContext(RoutingContext);

  if (page === "home") return <Home />;
  if (page === "suggestion-comments") return <SuggestionDetail />;
  if (page === "edit-suggestion")
    return (
      <EditSuggestion
        suggestion={params.suggestion as SuggestionModel}
        isEditing={params.isEditing as boolean}
      />
    );
}

export default Routing;
