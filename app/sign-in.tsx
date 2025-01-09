import { loginFormValidationSchema } from "@/components/login/valiations/login.validation";
import { Toaster } from "@/components/shared/Toaster";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { IUserLogin } from "@/contexts/AuthContext/IUserLogin";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function SignInPage() {
  const { login } = useAuth();
  const [userForm, setUserForm] = useState<IUserLogin>({} as IUserLogin);

  const handleSubmitForm = (data: IUserLogin) => {
    try {
      login(data);
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Atenção",
        text2: "Usuário/Senha inválido",
      });
    }
  };

  return (
    <View style={styles.loginForm}>
      <View>
        <Text>Faça o seu login</Text>
      </View>
      <Formik
        initialValues={userForm}
        onSubmit={handleSubmitForm}
        validationSchema={loginFormValidationSchema}
        enableReinitialize
      >
        {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <View style={styles.formContainer}>
            <TextInput
              value={values.username}
              style={styles.inputContainer}
              placeholder="Nome do usuário"
              onChangeText={handleChange("username")}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              value={values.password}
              style={styles.inputContainer}
              placeholder="Senha"
              onChangeText={handleChange("password")}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <View style={styles.loginButton}>
              <Button title="Logar" onPress={() => handleSubmit()} />
            </View>
          </View>
        )}
      </Formik>
      <Toaster />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    display: "flex",
    gap: 10,
    padding: 20,
  },
  inputContainer: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  loginButton: {
    width: 100,
    alignSelf: "flex-end",
  },
  errorText: {
    color: "red",
  },
  loginForm: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
