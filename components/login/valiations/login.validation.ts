import * as Yup from "yup";


export const loginFormValidationSchema = Yup.object().shape({
    username: Yup.string().required("Nome é obrigatório"),
    password: Yup.string().required("Senha é obrigatório")
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .matches(/[0-9]/, "A senha deve conter pelo menos um número")
    .matches(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um símbolo"),
});