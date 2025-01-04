import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable, TouchableOpacity } from "react-native";

export default function BillLayout() {
  const router = useRouter();

  const createNewBill = () => {
    router.push("/create");
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Contas",
          headerRight: () => (
            <TouchableOpacity onPressOut={createNewBill}>
              <Ionicons size={28} name={"add-outline"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="create" options={{ title: "Adicionar nova conta" }} />
    </Stack>
  );
}
