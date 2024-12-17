import api from "@/utils/api";
import axios from "axios";
import { Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function BillListScreen() {
  const [bills, setBills] = useState();

  const getBills = useCallback(async () => {
    try {
      const billsData = (await api.get("/bills/list")).data;
      console.log(billsData);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error("Error message:", err.message);

        if (err.request) {
          console.error("Request details:");
          console.log(JSON.stringify(err.request, null, 2));
        }

        if (err.response) {
          console.error("Response data:", err.response.data);
          console.error("Response status:", err.response.status);
          console.error("Response headers:", err.response.headers);
        }
      } else {
        console.error("Unexpected error:", err);
      }
    }
  }, []);

  useEffect(() => {
    getBills();
  }, [getBills]);

  return (
    <View>
      <Text>Bill listing</Text>
      <Link href={"/create"}>Create new bill</Link>
    </View>
  );
}
