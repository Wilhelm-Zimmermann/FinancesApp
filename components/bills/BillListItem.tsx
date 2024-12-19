import { useTheme } from "@/contexts/ThemeContext/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";

interface BillListItemProps {
  bill: {
    name: string;
    price: number;
    effectiveDate: string;
    transactionType: string;
  };
}

export const BillListItem = ({ bill }: BillListItemProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 8,
      backgroundColor: theme.background,
      elevation: 1,
      marginBottom: 8,
      borderRadius: 4,
    },
    title: {
      fontSize: 18,
    },
    price: {
      fontSize: 24,
      color: bill.transactionType == "Credit" ? theme.green100 : theme.red100,
    },
  });

  const BRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{bill.name}</Text>
        <Text style={[{ marginTop: 8 }]}>
          {format(new Date(bill.effectiveDate), "dd/MM/yyyy")}
        </Text>
      </View>
      <View>
        <Text style={styles.price}>
          {bill.transactionType == "Debit" && "- "}
          {""}
          {BRL.format(bill.price)}
        </Text>
      </View>
    </View>
  );
};
