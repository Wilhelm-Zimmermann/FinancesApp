import { Stack } from "expo-router";

export default function ExploreStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: "Explore" }}
      />
      <Stack.Screen name="(bill)" options={{ headerShown: false }} />
    </Stack>
  );
}
