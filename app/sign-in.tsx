import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInPage() {
  const { login } = useAuth();

  useEffect(() => {
    login({ password: "1234", username: "teste" });
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Text>Teste De Login</Text>
        <Button
          title="Logar nessa bagaça"
          onPress={() => login({ password: "1234", username: "teste" })}
        />
      </View>
    </SafeAreaView>
  );
}
