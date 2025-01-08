import { loginFormValidationSchema } from "@/components/login/valiations/login.validation";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { IUserLogin } from "@/contexts/AuthContext/IUserLogin";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInPage() {
  const { login } = useAuth();
  const [userForm, setUserForm] = useState<IUserLogin>({} as IUserLogin);

  const handleSubmitForm = (data: IUserLogin) => {
    console.log("Logged");
    login({ password: "1234", username: "teste" });
  };

  return (
    <SafeAreaView>
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
              value={values.username}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
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
});
