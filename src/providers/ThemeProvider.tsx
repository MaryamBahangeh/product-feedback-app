import {
  createContext,
  PropsWithChildren,
  useLayoutEffect,
  useState,
} from "react";

import { LOCAL_STORAGE_IS_DARK_MODE_KEY } from "@/constants/localstorage.constants.ts";

type ContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const ThemeContext = createContext<ContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

const defaultIsDarkMode = (): boolean => {
  if (localStorage.getItem(LOCAL_STORAGE_IS_DARK_MODE_KEY)) {
    return (
      localStorage.getItem(LOCAL_STORAGE_IS_DARK_MODE_KEY)?.toString() ===
      "true"
    );
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

function ThemeProvider({ children }: PropsWithChildren) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(defaultIsDarkMode);

  const toggleDarkMode = () => {
    setIsDarkMode((old) => !old);
    localStorage.setItem(
      LOCAL_STORAGE_IS_DARK_MODE_KEY,
      (!isDarkMode).toString(),
    );
  };

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
