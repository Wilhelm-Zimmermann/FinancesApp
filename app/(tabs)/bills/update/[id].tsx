import { BillsForm } from "@/components/bills/BillsForm";
import { StyleSheet, View } from "react-native";

export default function UpdateBillScreen() {
  return (
    <View style={styles.container}>
      <BillsForm actionType="update" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
