import { Stack } from "expo-router";

export default function BillLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Bills" }} />
      <Stack.Screen name="create" options={{ title: "Create new bill" }} />
    </Stack>
  );
}
