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
    light: {
      background: "#FFF",
      green100: "#d4edda",
      green200: "#c3e6cb",
      green300: "#155724",
      green400: "#28a745",
      green500: "#218838",
      green600: "#1e7e34",
      green700: "#1c7430",
      green800: "#155724",
      green900: "#0b2e13",
      red100: "#f8d7da",
      red200: "#f5c6cb",
      red300: "#f1b0b7",
      red400: "#e3342f",
      red500: "#d9534f",
      red600: "#c9302c",
      red700: "#ac2925",
      red800: "#761b18",
      red900: "#4c110f",
      purple100: "#e9d8fd",
      purple200: "#d6bcfa",
      purple300: "#b794f4",
      purple400: "#9f7aea",
      purple500: "#805ad5",
      purple600: "#6b46c1",
      purple700: "#553c9a",
      purple800: "#44337a",
      purple900: "#322659",
      gray100: "#f8f9fa",
      gray200: "#e9ecef",
      gray300: "#dee2e6",
      gray400: "#ced4da",
      gray500: "#adb5bd",
      gray600: "#6c757d",
      gray700: "#495057",
      gray800: "#343a40",
      gray900: "#212529",
    },
    dark: {
      background: "#202120",
      green100: "#d4edda",
      green200: "#c3e6cb",
      green300: "#155724",
      green400: "#28a745",
      green500: "#218838",
      green600: "#1e7e34",
      green700: "#1c7430",
      green800: "#155724",
      green900: "#0b2e13",
      red100: "#f8d7da",
      red200: "#f5c6cb",
      red300: "#f1b0b7",
      red400: "#e3342f",
      red500: "#d9534f",
      red600: "#c9302c",
      red700: "#ac2925",
      red800: "#761b18",
      red900: "#4c110f",
      purple100: "#e9d8fd",
      purple200: "#d6bcfa",
      purple300: "#b794f4",
      purple400: "#9f7aea",
      purple500: "#805ad5",
      purple600: "#6b46c1",
      purple700: "#553c9a",
      purple800: "#44337a",
      purple900: "#322659",
      gray100: "#f8f9fa",
      gray200: "#e9ecef",
      gray300: "#dee2e6",
      gray400: "#ced4da",
      gray500: "#adb5bd",
      gray600: "#6c757d",
      gray700: "#495057",
      gray800: "#343a40",
      gray900: "#212529",
    },
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
