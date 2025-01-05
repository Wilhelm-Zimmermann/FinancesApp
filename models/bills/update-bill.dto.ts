import { ICreateBillDto } from "./create-bill.dto";

export interface IUpdateBillDto extends ICreateBillDto {
    id: string;
}