import SuggestionProvider from "./providers/SuggestionProvider.tsx";
import SearchProvider from "./providers/SearchProvider.tsx";
import RoutingProvider from "@/providers/RoutingProvider.tsx";
import Routing from "@/Routing.tsx";

function App() {
  return (
    <>
      <RoutingProvider>
        <SuggestionProvider>
          <SearchProvider>
            <Routing></Routing>
          </SearchProvider>
        </SuggestionProvider>
      </RoutingProvider>
    </>
  );
}

export default App;
