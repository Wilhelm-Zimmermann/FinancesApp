import { IBillTypeListDto } from "../billTypes/billType-list.dto";

export interface BillListDto {
    id: string;
    name: string;
    price: number;
    description: string;
    effectiveDate: string;
    paidDate: string;
    billTypeId: string;
    userId: string;
    transactionType: string;
    billType?: IBillTypeListDto;
}