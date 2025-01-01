import SuggestionProvider from "./providers/SuggestionProvider.tsx";
import SearchProvider from "./providers/SearchProvider.tsx";
import Routing from "./Routing.tsx";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <SuggestionProvider>
          <SearchProvider>
            <Routing></Routing>
          </SearchProvider>
        </SuggestionProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
