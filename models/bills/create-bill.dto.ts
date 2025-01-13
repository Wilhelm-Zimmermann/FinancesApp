export interface ICreateBillDto {
  id?: string;
  name: string;
  price: number;
  description: string;
  transactionType: string;
  paidDate?: Date;
  effectiveDate: Date;
  billTypeId: string;
  isRecurring: boolean;
  recurrencePattern: string;
  paymentStatus: string;
  currency: string;
}
