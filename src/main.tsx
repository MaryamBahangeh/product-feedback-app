import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/color.css";
import "./styles/typography.css";
import "./index.css";

import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "@/pages/NotFound/NotFound..tsx";
import EditSuggestion from "@/pages/EditSuggestion/EditSuggestion.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="editSuggestion/:isEditing" element={<EditSuggestion />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>,
);
