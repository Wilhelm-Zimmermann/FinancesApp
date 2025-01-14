import { TransactionCard } from "@/components/home/TransactionCard";
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
      <View style={styles.priceContainer}>
        <View style={styles.priceContent}>
          <TransactionCard transactionType="debit" value={debitSum} />
        </View>
        <View style={styles.priceContent}>
          <TransactionCard transactionType="credit" value={creditSum} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
  priceContainer: {
    padding: 6,
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  priceContent: {
    width: "50%",
  },
});
