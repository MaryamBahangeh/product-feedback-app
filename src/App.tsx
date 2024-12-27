import SuggestionProvider from "./providers/SuggestionProvider.tsx";
import SearchProvider from "./providers/SearchProvider.tsx";

import Home from "@/pages/Home/Home.tsx";

function App() {
  return (
    <>
      <SuggestionProvider>
        <SearchProvider>
          <Home></Home>
        </SearchProvider>
      </SuggestionProvider>
    </>
  );
}

export default App;
