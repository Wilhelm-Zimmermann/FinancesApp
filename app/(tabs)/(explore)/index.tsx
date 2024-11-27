import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ExploreScreen() {
  return (
    <View>
      <Text>Explore</Text>
      <Link href={"/(tabs)/(explore)/(bill)"}>Bills</Link>
    </View>
  );
}
