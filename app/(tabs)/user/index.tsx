import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { Button, Text, View } from "react-native";

export default function UserProfile() {
  const { logout } = useAuth();

  return (
    <View>
      <Text> Meine Profil </Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
