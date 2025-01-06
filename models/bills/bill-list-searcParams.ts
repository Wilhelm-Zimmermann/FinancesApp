import { ISearchParams } from "../ISearchParams";

export interface IBillListSearchParams extends ISearchParams {
    TransactionType?: number;
    BillTypeId?: string;
    StartDate?: string;
    EndDate?: string;
}