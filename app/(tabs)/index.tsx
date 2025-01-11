import { useBills } from "@/contexts/BillsContext/BillContext";
import { defaultColors } from "@/contexts/ThemeContext/defaultColors";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { creditSum, debitSum, getCreditSumByMonth, getDebitSumByMonth } =
    useBills();

  useFocusEffect(
    useCallback(() => {
      getCreditSumByMonth();
      getDebitSumByMonth();
    }, [getDebitSumByMonth, getCreditSumByMonth])
  );
  return (
    <View style={styles.container}>
      <View style={styles.contentBox}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Total débito: </Text>
          <Text style={styles.debitPrice}>{debitSum}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Total crédito: </Text>
          <Text style={styles.creditPrice}>{creditSum}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  contentBox: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
  },
  priceTitle: {
    fontSize: 24,
  },
  creditPrice: {
    fontSize: 24,
    color: defaultColors.green500,
  },
  debitPrice: {
    fontSize: 24,
    color: defaultColors.red500,
  },
});
