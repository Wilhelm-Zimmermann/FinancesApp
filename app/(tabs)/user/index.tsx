import { ButtonIcon } from "@/components/shared/ButtonIcon";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { defaultColors } from "@/contexts/ThemeContext/defaultColors";
import { useTheme } from "@/contexts/ThemeContext/ThemeContext";
import { Picker } from "@react-native-picker/picker";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function UserProfile() {
  const { logout, username } = useAuth();
  const { colorsTheme, setDarkTheme, setLightTheme, currentTheme } = useTheme();

  const handleSelectTheme = useCallback(
    (theme: string) => {
      if (theme === "light") {
        setLightTheme();
      } else {
        setDarkTheme();
      }
    },
    [setLightTheme, setDarkTheme]
  );

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: colorsTheme.background,
    },
    cardDividerContainer: {
      backgroundColor: colorsTheme.cardBackground,
      padding: 8,
      borderRadius: 6,
    },
    usernameText: {
      fontSize: 24,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.cardDividerContainer}>
        <Text style={styles.usernameText}> {username} </Text>
        {/* <Picker selectedValue={currentTheme} onValueChange={handleSelectTheme}>
          <Picker.Item label="Claro" value="light" key="light" />
          <Picker.Item label="Escuro" value="dark" key="dark" />
        </Picker> */}
        <ButtonIcon
          iconName="log-out-outline"
          iconColor={defaultColors.red500}
          title="Logout"
          customStyles={{
            borderColor: defaultColors.red500,
            marginTop: 10,
            alignSelf: "flex-end",
          }}
          onPress={logout}
        />
      </View>
    </View>
  );
}
