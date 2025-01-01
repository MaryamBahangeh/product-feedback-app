import EditSuggestion from "@/pages/EditSuggestion/EditSuggestion.tsx";

import NotFound from "@/pages/NotFound/NotFound.tsx";
import { Route, Routes } from "react-router";
import Home from "@/pages/Home/Home.tsx";
import SuggestionComments from "@/pages/SuggestionComments/SuggestionComments.tsx";
import CreateSuggestion from "@/pages/CreateSuggestion/CreateSuggestion.tsx";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateSuggestion />} />
      <Route
        path="/suggestion-comments/:id"
        element={<SuggestionComments />}
      ></Route>

      <Route path="/edit/:id" element={<EditSuggestion />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Routing;
