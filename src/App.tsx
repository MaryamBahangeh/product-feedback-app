import SuggestionProvider from "./providers/SuggestionProvider.tsx";
import SearchProvider from "./providers/SearchProvider.tsx";
import Routing from "./Routing.tsx";
import { BrowserRouter } from "react-router";
import ThemeProvider from "@/providers/ThemeProvider.tsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <SuggestionProvider>
            <SearchProvider>
              <Routing />
            </SearchProvider>
          </SuggestionProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
