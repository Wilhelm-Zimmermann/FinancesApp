import { BillListItem } from "@/components/bills/BillListItem";
import { useBills } from "@/contexts/BillsContext/BillContext";
import { useTheme } from "@/contexts/ThemeContext/ThemeContext";
import { IBillListSearchParams } from "@/models/bills/bill-list-searcParams";
import { createSearchParams } from "@/utils/createSearchParams";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import {
  getDaysInMonth,
  startOfMonth,
  endOfMonth,
  subMonths,
  subDays,
  format,
  startOfWeek,
  endOfWeek,
  subWeeks,
  startOfYear,
  endOfYear,
  subYears,
  startOfDay,
  endOfDay,
} from "date-fns";
import { DatePicker } from "@/components/shared/form/DatePicker";

export default function BillListScreen() {
  const defaultTitle = "Contas";
  const { theme } = useTheme();
  const { bills, getBills } = useBills();
  const navigation = useNavigation();
  const routeParams = useLocalSearchParams<{}>();
  const [billSearchParams, setBillSearchParams] =
    useState<IBillListSearchParams>({} as IBillListSearchParams);
  const [selectedDateFilter, setSelectedDateFilter] =
    useState<string>("thisMonth");
  const [periodDateFilter, setPeriodDateFilter] = useState<
    Pick<IBillListSearchParams, "StartDate" | "EndDate">
  >({});

  const handleSearchParamsUpdate = (param: IBillListSearchParams) => {
    const currentParams = {
      ...routeParams,
      ...param,
    };

    router.setParams(currentParams);

    const searchParams = createSearchParams(currentParams);
    console.log(searchParams);
    setBillSearchParams(param);

    getBills(searchParams);
  };

  const handleUpdatePeriodDateFilter = (
    fieldToUpdate: keyof Pick<IBillListSearchParams, "StartDate" | "EndDate">,
    fieldValue: any
  ) => {
    setPeriodDateFilter((prev) => ({
      ...prev,
      [fieldToUpdate]: fieldValue,
    }));
  };

  const handleSelectedDateFilter = useCallback(
    (selectedFilter: string) => {
      setSelectedDateFilter(selectedFilter);
      const now = new Date();
      let formattedTitle = defaultTitle;
      let startDate = new Date();
      let endDate = new Date();

      switch (selectedFilter) {
        case "thisMonth":
          startDate = startOfMonth(now);
          endDate = endOfMonth(now);
          formattedTitle = `${defaultTitle} - ${format(startDate, "MMMM")}`;
          break;
        case "lastMonth":
          const lastMonth = subMonths(now, 1);
          startDate = startOfMonth(lastMonth);
          endDate = endOfMonth(lastMonth);
          formattedTitle = `${defaultTitle} - ${format(startDate, "MMMM")}`;
          break;
        case "thisWeek":
          startDate = startOfWeek(now);
          endDate = endOfWeek(now);
          formattedTitle = `${defaultTitle} - Esta Semana`;
          break;
        case "lastWeek":
          const lastWeek = subWeeks(now, 1);
          startDate = startOfWeek(lastWeek);
          endDate = endOfWeek(lastWeek);
          formattedTitle = `${defaultTitle} - Semana Passada`;
          break;
        case "thisYear":
          startDate = startOfYear(now);
          endDate = endOfYear(now);
          formattedTitle = `${defaultTitle} - ${format(startDate, "yyyy")}`;
          break;
        case "lastYear":
          const lastYear = subYears(now, 1);
          startDate = startOfYear(lastYear);
          endDate = endOfYear(lastYear);
          formattedTitle = `${defaultTitle} - ${format(startDate, "yyyy")}`;
          break;
        default:
          return;
      }
      handleSearchParamsUpdate({
        StartDate: startDate.toISOString(),
        EndDate: endDate.toISOString(),
      });

      navigation.setOptions({
        title: formattedTitle,
      });
    },
    [selectedDateFilter]
  );

  const applyPeriodDateFilter = () => {
    const formattedStartDate = new Date(
      periodDateFilter.StartDate ?? new Date()
    );

    const formattedEndDate = new Date(periodDateFilter.EndDate ?? new Date());

    handleSearchParamsUpdate({
      StartDate: startOfDay(formattedStartDate).toISOString(),
      EndDate: endOfDay(formattedEndDate).toISOString(),
    });

    navigation.setOptions({
      title: "fodaci",
    });
  };

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
      marginTop: 10,
    },
    buttonTransaction: {
      width: "33%",
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 5,
    },
    periodDatesContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginTop: 10,
    },
    periodContent: {
      width: "30%",
    },
  });

  const pickerItems = [
    {
      label: "Este mês",
      value: "thisMonth",
      key: "thisMonth",
    },
    {
      label: "Mês passado",
      value: "lastMonth",
      key: "lastMonth",
    },
    {
      label: "Esta semana",
      value: "thisWeek",
      key: "thisWeek",
    },
    {
      label: "Semana passada",
      value: "lastWeek",
      key: "lastWeek",
    },
    {
      label: "Este ano",
      value: "thisYear",
      key: "thisYear",
    },
    {
      label: "Ano passado",
      value: "lastYear",
      key: "lastYear",
    },
    {
      label: "Período",
      value: "period",
      key: "period",
    },
  ];

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedDateFilter}
            onValueChange={handleSelectedDateFilter}
          >
            {pickerItems.map((item) => (
              <Picker.Item
                label={item.label}
                value={item.value}
                key={item.value}
              />
            ))}
          </Picker>
        </View>

        {selectedDateFilter === "period" && (
          <View style={styles.periodDatesContainer}>
            <View style={styles.periodContent}>
              <DatePicker<Pick<IBillListSearchParams, "StartDate" | "EndDate">>
                fieldToSet="StartDate"
                onChange={handleUpdatePeriodDateFilter}
                title="Data de início"
              />
            </View>
            <View style={styles.periodContent}>
              <DatePicker<Pick<IBillListSearchParams, "StartDate" | "EndDate">>
                fieldToSet="EndDate"
                onChange={handleUpdatePeriodDateFilter}
                title="Data de término"
              />
            </View>
            <View style={styles.periodContent}>
              <Button title="Aplicar" onPress={applyPeriodDateFilter} />
            </View>
          </View>
        )}

        <View style={styles.transactionTypeContainer}>
          <View style={[styles.buttonTransaction]}>
            <Button
              title="Todos"
              color={
                billSearchParams.TransactionType == null ||
                billSearchParams.TransactionType == undefined
                  ? theme.gray800
                  : theme.gray500
              }
              onPress={() =>
                handleSearchParamsUpdate({ TransactionType: undefined })
              }
            />
          </View>
          <View style={[styles.buttonTransaction]}>
            <Button
              title="Débito"
              color={
                billSearchParams.TransactionType === 1
                  ? theme.red800
                  : theme.red400
              }
              onPress={() => handleSearchParamsUpdate({ TransactionType: 1 })}
            />
          </View>
          <View style={[styles.buttonTransaction]}>
            <Button
              title="Crédito"
              color={
                billSearchParams.TransactionType === 0
                  ? theme.green800
                  : theme.green400
              }
              onPress={() => handleSearchParamsUpdate({ TransactionType: 0 })}
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
    </View>
  );
}
