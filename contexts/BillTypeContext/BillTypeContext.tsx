import { BillListDto } from "@/models/bills/bill-list.dto";
import { ICreateBillDto } from "@/models/bills/create-bill.dto";
import { IBillTypeListDto } from "@/models/billTypes/billType-list.dto";
import { GenericApiResponse } from "@/models/GenericApiResponse";
import api from "@/utils/api";
import { router } from "expo-router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface IBillTypeContextProps {
  getBillTypes: () => void;
  billTypes: IBillTypeListDto[];
}

const BillTypeContext = createContext<IBillTypeContextProps | undefined>(
  undefined
);

export const BillTypeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [billTypes, setBillTypes] = useState<IBillTypeListDto[]>([]);

  const getBillTypes = useCallback(async () => {
    try {
      const response = (
        await api.get<GenericApiResponse<IBillTypeListDto[]>>("/billType/list")
      ).data;

      setBillTypes(response.data);
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getBillTypes();
  }, []);

  return (
    <BillTypeContext.Provider value={{ billTypes, getBillTypes }}>
      {children}
    </BillTypeContext.Provider>
  );
};

export const useBillType = () => {
  const context = useContext(BillTypeContext);

  if (!context)
    throw new Error("useBillType must be used within an BillTypeProvider");

  return context;
};
