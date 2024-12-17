import { BillListDto } from "@/models/bills/bill-list.dto";
import { GenericApiResponse } from "@/models/GenericApiResponse";
import api from "@/utils/api";
import axios from "axios";
import { Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function BillListScreen() {
  const [bills, setBills] = useState<BillListDto[]>([]);

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

  return (
    <View>
      <Text>Bill listing</Text>
      {bills.map((bill) => (
        <Text key={bill.userId + bill.name}>{bill.name}</Text>
      ))}
      <Link href={"/create"}>Create new bill</Link>
    </View>
  );
}
