import Home from "@/pages/Home/Home.tsx";
import EditSuggestion from "@/pages/EditSuggestion/EditSuggestion.tsx";
import NotFound from "@/pages/NotFound/NotFound..tsx";
import { Route, Routes } from "react-router";
import SuggestionComments from "@/pages/SuggestionComments/SuggestionComments.tsx";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/suggestion-comments/:id" element={<SuggestionComments />} />
      <Route path="/create" element={<NotFound />} />
      <Route path="/edit/:id" element={<EditSuggestion />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Routing;
