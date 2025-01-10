import * as Yup from "yup";

export const loginFormValidationSchema = Yup.object().shape({
  username: Yup.string().required("Nome é obrigatório"),
  password: Yup.string().required("Senha é obrigatório"),
});
