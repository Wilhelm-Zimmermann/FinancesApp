import { BillListItem } from "@/components/bills/BillListItem";
import { useTheme } from "@/contexts/ThemeContext/ThemeContext";
import { BillListDto } from "@/models/bills/bill-list.dto";
import { GenericApiResponse } from "@/models/GenericApiResponse";
import api from "@/utils/api";
import { useCallback, useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

export default function BillListScreen() {
  const [bills, setBills] = useState<BillListDto[]>([]);
  const { theme } = useTheme();

  const getBills = useCallback(async () => {
    try {
      const billsData = (
        await api.get<GenericApiResponse<BillListDto[]>>("/bills/list")
      ).data?.data;

      setBills(billsData);
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getBills();
  }, [getBills]);

  const styles = StyleSheet.create({
    container: {
      padding: 8,
    },
    transactionTypeContainer: {
      flexDirection: "row",
      marginBottom: 8,
    },
    buttonTransaction: {
      width: "50%",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.transactionTypeContainer}>
        <View style={[styles.buttonTransaction]}>
          <Button title="Débito" color={theme.green100} />
        </View>
        <View style={[styles.buttonTransaction]}>
          <Button title="Crédito" color={theme.red100} />
        </View>
      </View>

      <FlatList
        data={bills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BillListItem bill={item} />}
      />
    </View>
  );
}
