import { defaultColors } from "@/contexts/ThemeContext/defaultColors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface ITransactionCardProps {
  transactionType: "debit" | "credit";
  value: string;
}

export const TransactionCard = ({
  transactionType,
  value,
}: ITransactionCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {transactionType == "debit" ? "Débito" : "Crédito"}
      </Text>
      <View style={styles.priceContainer}>
        <Ionicons
          name={transactionType == "debit" ? "arrow-down" : "arrow-up"}
          size={18}
          color={
            transactionType == "debit"
              ? defaultColors.red500
              : defaultColors.green500
          }
        />
        <Text
          style={[
            {
              color:
                transactionType == "debit"
                  ? defaultColors.red500
                  : defaultColors.green500,
            },
            styles.priceContent,
          ]}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },
  priceContent: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
  },
});
