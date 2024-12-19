import { createContext, useContext, useState } from "react";
import { ThemeColorStyle } from "./themeColorStyle";
import { Themes } from "./themes";

interface ThemeContextProps {
  theme: ThemeColorStyle;
  setLightTheme: () => void;
  setDarkTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appTheme, setAppTheme] = useState<keyof Themes>("light");

  const setLightTheme = () => {
    setAppTheme("light");
  };

  const setDarkTheme = () => {
    setAppTheme("dark");
  };

  const themes: Themes = {
    light: { background: "#FFF", green100: "#32a852", red100: "#eb4034" },
    dark: { background: "#202120", green100: "#32a852", red100: "#eb4034" },
  };

  return (
    <ThemeContext.Provider
      value={{ setLightTheme, setDarkTheme, theme: themes[appTheme] }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error("useTheme must be used within an ThemeProvider");

  return context;
};
