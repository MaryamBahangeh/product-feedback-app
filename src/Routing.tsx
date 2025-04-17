import SuggestionEditPage from "@/pages/SuggestionEditPage/SuggestionEditPage.tsx";

import NotFound from "@/pages/NotFound/NotFound.tsx";
import { Route, Routes } from "react-router";
import Home from "@/pages/Home/Home.tsx";
import SuggestionPage from "@/pages/SuggestionPage/SuggestionPage.tsx";
import SuggestionCreatePage from "@/pages/SuggestionCreatePage/SuggestionCreatePage.tsx";
import RoadmapPage from "@/pages/RoadmapPage/RoadmapPage.tsx";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/suggestion/create" element={<SuggestionCreatePage />} />
      <Route path="/suggestion/:id" element={<SuggestionPage />}></Route>

      <Route path="/suggestion/:id/edit" element={<SuggestionEditPage />} />
        <Route path='/roadmap' element={<RoadmapPage/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Routing;
