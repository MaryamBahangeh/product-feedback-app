import SearchProvider from "./providers/SearchProvider.tsx";
import Routing from "./Routing.tsx";
import { BrowserRouter } from "react-router";
import ThemeProvider from "@/providers/ThemeProvider.tsx";
import QueryProvider from "@/providers/QueryProvider.tsx";

function App() {
  return (
    <>
      <QueryProvider>
        <BrowserRouter>
          <ThemeProvider>
            <SearchProvider>
              <Routing />
            </SearchProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryProvider>
    </>
  );
}

export default App;
