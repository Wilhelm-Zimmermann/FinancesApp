import { BillsForm } from "@/components/bills/BillsForm";
import { StyleSheet, Text, View } from "react-native";

export default function CreateBillScreen() {
  return (
    <View style={styles.container}>
      <BillsForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
