import { BillListItem } from "@/components/bills/BillListItem";
import { useBills } from "@/contexts/BillsContext/BillContext";
import { useTheme } from "@/contexts/ThemeContext/ThemeContext";
import { IBillListSearchParams } from "@/models/bills/bill-list-searcParams";
import { createSearchParams } from "@/utils/createSearchParams";
import { useCallback, useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";

export default function BillListScreen() {
  const { theme } = useTheme();
  const { bills, getBills } = useBills();
  const [billSearchParams, setBillSearchParams] =
    useState<IBillListSearchParams>({} as IBillListSearchParams);

  const handleSearchParamsUpdate = useCallback(
    (param: keyof IBillListSearchParams, value: any) => {
      setBillSearchParams((prevState) => {
        const updatedParams = {
          ...prevState,
          [param]: value,
        };

        const searchParams = createSearchParams(updatedParams);

        getBills(searchParams);

        return updatedParams;
      });
    },
    [billSearchParams]
  );

  const styles = StyleSheet.create({
    container: {
      padding: 8,
    },
    billsContainer: {
      height: 630,
    },
    transactionTypeContainer: {
      flexDirection: "row",
      marginBottom: 8,
      gap: 4,
    },
    buttonTransaction: {
      width: "33%",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.transactionTypeContainer}>
        <View style={[styles.buttonTransaction]}>
          <Button
            title="Todos"
            color={
              billSearchParams.TransactionType == null ||
              billSearchParams.TransactionType == undefined
                ? theme.gray600
                : theme.gray500
            }
            onPress={() => handleSearchParamsUpdate("TransactionType", null)}
          />
        </View>
        <View style={[styles.buttonTransaction]}>
          <Button
            title="Débito"
            color={
              billSearchParams?.TransactionType == 1
                ? theme.red800
                : theme.red400
            }
            onPress={() => handleSearchParamsUpdate("TransactionType", 1)}
          />
        </View>
        <View style={[styles.buttonTransaction]}>
          <Button
            title="Crédito"
            color={
              billSearchParams?.TransactionType == 0
                ? theme.green800
                : theme.green400
            }
            onPress={() => handleSearchParamsUpdate("TransactionType", 0)}
          />
        </View>
      </View>

      <View style={styles.billsContainer}>
        <FlatList
          data={bills}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BillListItem bill={item} />}
        />
      </View>
    </View>
  );
}
