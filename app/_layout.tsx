import { AuthProvider } from "@/contexts/AuthContext/AuthContext";
import { BillProvider } from "@/contexts/BillsContext/BillContext";
import { BillTypeProvider } from "@/contexts/BillTypeContext/BillTypeContext";
import { ThemeProvider } from "@/contexts/ThemeContext/ThemeContext";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <BillProvider>
          <BillTypeProvider>
            <Slot />
            <StatusBar style="dark" />
          </BillTypeProvider>
        </BillProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
