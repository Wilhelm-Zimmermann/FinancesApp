import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function BillListScreen() {
  return (
    <View>
      <Text>Bill listing</Text>
      <Link href={"/create"}>Create new bill</Link>
    </View>
  );
}
