import { ButtonIcon } from "@/components/shared/ButtonIcon";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { defaultColors } from "@/contexts/ThemeContext/defaultColors";
import { useTheme } from "@/contexts/ThemeContext/ThemeContext";
import { StyleSheet, Text, View } from "react-native";

export default function UserProfile() {
  const { logout, username } = useAuth();
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: theme.background,
    },
    cardDividerContainer: {
      backgroundColor: theme.cardBackground,
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
