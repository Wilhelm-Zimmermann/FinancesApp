import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { ICreateBillDto } from "@/models/bills/create-bill.dto";
import { useBills } from "@/contexts/BillsContext/BillContext";
import { Formik, Field } from "formik";
import { billFormValidationSchema } from "./validations/bill-form.validation";
import { DatePickerFormik } from "../shared/form/DatePickerFormik";
import { PickerFormik } from "../shared/form/PickerFormik";
import { useBillType } from "@/contexts/BillTypeContext/BillTypeContext";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { IUpdateBillDto } from "@/models/bills/update-bill.dto";
import { defaultColors } from "@/contexts/ThemeContext/defaultColors";
import { ECurrency } from "@/models/bills/enums/ECurrency";
import { EPaymentStatus } from "@/models/bills/enums/EPaymentStatus";
import { ERecurrencyPattern } from "@/models/bills/enums/ERecurrencyPattern";

interface IBillsFormProps {
  actionType?: "create" | "update";
}

export const BillsForm = ({ actionType = "create" }: IBillsFormProps) => {
  const [billForm, setBillForm] = useState<ICreateBillDto>({
    effectiveDate: new Date(),
    currency: ECurrency.BRL,
    isRecurring: false,
    paymentStatus: EPaymentStatus.Paid,
    recurrencePattern: ERecurrencyPattern.None,
  } as ICreateBillDto);
  const { create, update, getBillById, deleteBill } = useBills();
  const { billTypes, getBillTypes } = useBillType();
  const { id } = useLocalSearchParams<{ id: string }>();

  const fetchCurrentBill = useCallback(async () => {
    const currentBill = await getBillById(id);
    setBillForm({
      id: id,
      billTypeId: currentBill?.billTypeId ?? "",
      description: currentBill?.description ?? "",
      effectiveDate: new Date(currentBill?.effectiveDate ?? new Date()),
      transactionType: currentBill?.transactionType ?? "Debit",
      paidDate: new Date(currentBill?.paidDate ?? new Date()),
      name: currentBill?.name ?? "",
      price: currentBill?.price ?? 0,
      currency: ECurrency.BRL,
      isRecurring: false,
      paymentStatus: EPaymentStatus.Paid,
      recurrencePattern: ERecurrencyPattern.None,
    });
  }, [billForm]);

  useEffect(() => {
    if (actionType === "update") {
      fetchCurrentBill();
    }
  }, [id]);

  const handleDeleteBill = () => {
    if (billForm.id) deleteBill(billForm.id);
  };

  const handleCreatebill = (data: ICreateBillDto) => {
    create(data);
  };

  const handleUpdateBill = (data: IUpdateBillDto) => {
    update(data);
  };

  const handleSubmitForm = (data: ICreateBillDto) => {
    const dataToSend: ICreateBillDto = {
      ...data,
      price: parseCurrencyForSubmission(data.price.toString()),
    };

    if (actionType === "create") {
      handleCreatebill(dataToSend);
    } else {
      handleUpdateBill({ ...dataToSend, id: id });
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBillTypes();
    }, [])
  );

  const parseCurrencyForSubmission = (value: string): number => {
    return parseFloat(value.replace(/\D/g, "")) / 100;
  };

  const formatCurrency = (value: string | number): string => {
    if (value === null || value === undefined) return "";

    const numericValue =
      typeof value === "string"
        ? parseFloat(value.replace(/[^0-9]/g, ""))
        : value;

    const number = numericValue / 100;

    const result = number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return result;
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Formik
          initialValues={billForm}
          onSubmit={handleSubmitForm}
          validationSchema={billFormValidationSchema}
          enableReinitialize
        >
          {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
            <View style={styles.formContainer}>
              <TextInput
                value={values.name}
                style={styles.inputContainer}
                placeholder="Nome"
                onChangeText={handleChange("name")}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
              <TextInput
                value={formatCurrency(values.price)}
                style={styles.inputContainer}
                placeholder="Valor"
                keyboardType="number-pad"
                onChangeText={(text) => {
                  const rawValue = text.replaceAll(/\D/g, "");
                  setFieldValue("price", rawValue);
                }}
              />
              {errors.price && (
                <Text style={styles.errorText}>{errors.price}</Text>
              )}
              <TextInput
                value={values.description}
                style={[styles.inputContainer, { height: 100 }]}
                placeholder="Descrição"
                onChangeText={handleChange("description")}
              />
              {errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
              <View style={styles.twoColumns}>
                <View style={[styles.fieldContainer, { width: "50%" }]}>
                  <Field
                    name="transactionType"
                    title="Tipo de transação"
                    items={[
                      {
                        label: "Débito",
                        value: "Debit",
                      },
                      {
                        label: "Crédito",
                        value: "Credit",
                      },
                    ]}
                    component={PickerFormik}
                  />
                  {errors.transactionType && (
                    <Text style={styles.errorText}>
                      {errors.transactionType}
                    </Text>
                  )}
                </View>

                <View style={[styles.fieldContainer, { width: "50%" }]}>
                  <Field
                    name="billTypeId"
                    title="Tipo da conta"
                    items={billTypes.map((billType) => {
                      return {
                        label: billType.type,
                        value: billType.id,
                      };
                    })}
                    component={PickerFormik}
                  />
                  {errors.billTypeId && (
                    <Text style={styles.errorText}>{errors.billTypeId}</Text>
                  )}
                </View>
              </View>
              <View style={styles.twoColumns}>
                <View style={[styles.fieldContainer, { width: "50%" }]}>
                  <Field
                    name="effectiveDate"
                    title="Data de vencimento: "
                    component={DatePickerFormik}
                  />
                  {errors.effectiveDate &&
                    typeof errors.effectiveDate === "string" && (
                      <Text style={styles.errorText}>
                        {errors.effectiveDate}
                      </Text>
                    )}
                </View>
                <View style={[styles.fieldContainer, { width: "50%" }]}>
                  <Field
                    name="paiedDate"
                    title="Data de pagamento: "
                    component={DatePickerFormik}
                  />
                  {errors.paidDate && typeof errors.paidDate === "string" && (
                    <Text style={styles.errorText}>{errors.paidDate}</Text>
                  )}
                </View>
              </View>
              <View style={styles.actionsContainer}>
                {actionType === "update" && (
                  <Pressable
                    style={({ pressed }) => [
                      styles.deleteButton,
                      pressed && styles.deleteButtonPressed,
                    ]}
                    onPress={() => handleDeleteBill()}
                  >
                    <Text style={{ fontSize: 18, color: "white" }}>
                      Deletar
                    </Text>
                  </Pressable>
                )}
                <Pressable
                  style={({ pressed }) => [
                    styles.createButton,
                    pressed && styles.createButtonPressed,
                  ]}
                  onPress={() => handleSubmit()}
                >
                  <Text style={{ fontSize: 18, color: "white" }}>
                    {actionType === "update" ? "Atualizar" : "Criar"}
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
  },
  fieldContainer: {
    display: "flex",
  },
  inputContainer: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: defaultColors.gray300,
    borderRadius: 5,
  },
  twoColumns: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    justifyContent: "space-between",
    marginTop: 10,
  },
  pickerContent: {
    width: "50%",
    display: "flex",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: defaultColors.gray300,
    borderRadius: 5,
  },
  picker: {
    height: 50,
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },
  createButton: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    width: 100,
    padding: 10,
    marginTop: 10,
    backgroundColor: defaultColors.green500,
    borderRadius: 5,
  },
  deleteButton: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    width: 100,
    padding: 10,
    marginTop: 10,
    backgroundColor: defaultColors.red500,
    borderRadius: 5,
  },
  deleteButtonPressed: {
    backgroundColor: defaultColors.red700,
  },
  createButtonPressed: {
    backgroundColor: defaultColors.green700,
  },
  errorText: {
    color: "red",
  },
});
