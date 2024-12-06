import "./styles/color.css";
import LandingComponent from "./components/LandingComponent/LandingComponent.tsx";
import SuggestionProvider from "./providers/SuggestionProvider.tsx";
import SearchProvider from "./providers/SearchProvider.tsx";

function App() {
  return (
    <>
      <SuggestionProvider>
        <SearchProvider>
          <LandingComponent />
        </SearchProvider>
      </SuggestionProvider>
    </>
  );
}

export default App;
