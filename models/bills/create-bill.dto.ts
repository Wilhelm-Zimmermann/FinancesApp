export interface ICreateBillDto {
    id?: string;
    name: string;
    price: number;
    description: string;
    transactionType: number;
    paidDate?: Date;
    effectiveDate: Date;
    billTypeId: string;
}