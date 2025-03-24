import { z } from "zod";

export const billFormValidationSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.number()
    .min(1, "Valor é obrigatório")
    .positive("Deve ser positivo"),
  description: z.string().optional().nullable(),
  transactionType: z.string().min(1, "Tipo de transação é obrigatório"),
  billTypeId: z.string().min(1, "Tipo de conta é obrigatório"),
  effectiveDate: z.string().min(1, "Data de vencimento é obrigatória"),
  paidDate: z.string(),
});
