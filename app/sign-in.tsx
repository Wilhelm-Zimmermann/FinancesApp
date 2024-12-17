import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { Button, Text, View } from "react-native";

export default function SignInPage() {
  const { login } = useAuth();

  return (
    <View>
      <Text>Teste De Login</Text>
      <Button
        title="Logar nessa bagaça"
        onPress={() => login({ password: "1234", username: "teste" })}
      />
    </View>
  );
}
