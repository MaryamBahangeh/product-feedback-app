import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router";

import NotFound from "@/pages/NotFound/NotFound..tsx";
import App from "@/App.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/notfound" element={<NotFound />} />
    </Routes>
    ,
  </BrowserRouter>,
);
