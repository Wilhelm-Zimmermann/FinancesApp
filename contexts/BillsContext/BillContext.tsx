import { BillListDto } from "@/models/bills/bill-list.dto";
import { ICreateBillDto } from "@/models/bills/create-bill.dto";
import { IUpdateBillDto } from "@/models/bills/update-bill.dto";
import { GenericApiResponse } from "@/models/GenericApiResponse";
import api from "@/utils/api";
import { endOfMonth, startOfMonth } from "date-fns";
import { router } from "expo-router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface IBillContextProps {
  bills: BillListDto[];
  creditSum: number;
  debitSum: number;
  create: (data: ICreateBillDto) => void;
  update: (data: IUpdateBillDto) => void;
  deleteBill: (id: string) => void;
  getBills: (searchParams?: string) => void;
  getBillById: (id: string) => Promise<BillListDto | undefined>;
  getDebitSumByMonth: () => void;
  getCreditSumByMonth: () => void;
}

const BillContext = createContext<IBillContextProps | undefined>(undefined);

export const BillProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bills, setBills] = useState<BillListDto[]>([]);
  const [creditSum, setCreditSum] = useState<number>(0);
  const [debitSum, setDebitSum] = useState<number>(0);

  const create = useCallback(
    async (data: ICreateBillDto) => {
      try {
        const response = (
          await api.post<GenericApiResponse<BillListDto>>("/bills/create", data)
        ).data;

        setBills([...bills, response.data]);
      } catch (err: any) {
        console.log(err);
      } finally {
        router.back();
      }
    },
    [bills]
  );

  const update = useCallback(
    async (data: IUpdateBillDto) => {
      try {
        const result = (
          await api.put<GenericApiResponse<BillListDto>>("/bills/update", data)
        ).data?.data;

        setBills((prevItens) =>
          prevItens.map((item) => {
            if (item.id === data.id) {
              return result;
            }
            return item;
          })
        );
      } catch (err: any) {
        console.log(err);
      } finally {
        router.back();
      }
    },
    [bills]
  );

  const deleteBill = useCallback(
    async (id: string) => {
      try {
        await api.delete("/bills/delete/" + id);

        setBills(bills.filter((x) => x.id !== id));
      } catch (err: any) {
        console.log(err);
      } finally {
        router.back();
      }
    },
    [bills]
  );

  const getBills = useCallback(
    async (searchParams?: string) => {
      try {
        const billsData = (
          await api.get<GenericApiResponse<BillListDto[]>>(
            `/bills/list/user-logged${searchParams ?? ""}`
          )
        ).data?.data;

        setBills(billsData);
      } catch (err: any) {
        console.log(err);
      }
    },
    [bills]
  );

  const getBillById = async (id: string) => {
    try {
      return (
        await api.get<GenericApiResponse<BillListDto>>(`/bills/list/${id}`)
      ).data?.data;
    } catch (err: any) {
      console.log(err);
    }
  };

  const getDebitSumByMonth = useCallback(async () => {
    try {
      const now = new Date();
      let startDate = startOfMonth(now).toISOString();
      let endDate = endOfMonth(now).toISOString();

      const billsDebitSum = (
        await api.get<GenericApiResponse<number>>(
          `/bills/sum?StartDate=${startDate}&EndDate=${endDate}&TransactionType=1`
        )
      ).data?.data;

      setDebitSum(billsDebitSum);
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  const getCreditSumByMonth = useCallback(async () => {
    try {
      const now = new Date();
      let startDate = startOfMonth(now).toISOString();
      let endDate = endOfMonth(now).toISOString();

      const billsCreditSum = (
        await api.get<GenericApiResponse<number>>(
          `/bills/sum?StartDate=${startDate}&EndDate=${endDate}&TransactionType=0`
        )
      ).data?.data;

      setCreditSum(billsCreditSum);
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getBills();
  }, []);

  return (
    <BillContext.Provider
      value={{
        create,
        update,
        bills,
        debitSum,
        creditSum,
        getBills,
        getBillById,
        getCreditSumByMonth,
        getDebitSumByMonth,
        deleteBill,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};

export const useBills = () => {
  const context = useContext(BillContext);

  if (!context) throw new Error("useBills must be used within an BillProvider");

  return context;
};
