import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

export default function UserStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: "User Profile" }}
      />
    </Stack>
  );
}
