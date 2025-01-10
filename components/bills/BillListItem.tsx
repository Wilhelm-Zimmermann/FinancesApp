import { useTheme } from "@/contexts/ThemeContext/ThemeContext";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";
import { Link, router, useNavigation } from "expo-router";
import { defaultColors } from "@/contexts/ThemeContext/defaultColors";

interface BillListItemProps {
  bill: {
    id: string;
    name: string;
    price: number;
    effectiveDate: string;
    transactionType: string;
    billType?: {
      id: string;
      type: string;
    };
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
    leftSideContent: {
      display: "flex",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
    },
    price: {
      fontSize: 24,
      color:
        bill.transactionType == "Credit"
          ? defaultColors.green600
          : defaultColors.red600,
    },
  });

  const goToUpdatePage = () => {
    router.navigate(`/bills/update/${bill.id}`);
  };

  const BRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Pressable style={styles.container} key={bill.id} onPress={goToUpdatePage}>
      <View style={styles.leftSideContent}>
        <Text style={styles.title}>{bill.name}</Text>
        <Text>{bill?.billType?.type}</Text>
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
    </Pressable>
  );
};
