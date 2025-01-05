import * as Yup from "yup";


export const billFormValidationSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    price: Yup.number().required("Preço é obrigatório").positive("Deve ser positivo"),
    description: Yup.string(),
    transactionType: Yup.number().required("Tipo de transação é obrigatório"),
    billTypeId: Yup.string().required("Tipo de conta é obrigatório"),
    effectiveDate: Yup.date().required("Data de vencimento é obrigatória"),
    paidDate: Yup.date(),
});