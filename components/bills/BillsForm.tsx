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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICreateBillDto } from "@/models/bills/create-bill.dto";
import { useBills } from "@/contexts/BillsContext/BillContext";
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
    // Initialize other fields as needed
    name: "",
    description: "",
    price: 0,
    transactionType: "Debit",
    billTypeId: "",
    paidDate: new Date(),
  } as ICreateBillDto);

  const { create, update, getBillById, deleteBill } = useBills();
  const { billTypes, getBillTypes } = useBillType();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Initialize react-hook-form with defaultValues from state and Yup validation.
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateBillDto>({
    defaultValues: billForm,
    resolver: zodResolver(billFormValidationSchema),
  });

  // Update the form values when billForm changes.
  useEffect(() => {
    reset(billForm);
  }, [billForm, reset]);

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
      // Multiply by 100 to work with the currency mask.
      price: currentBill?.price ? currentBill.price * 100 : 0,
      currency: ECurrency.BRL,
      isRecurring: false,
      paymentStatus: EPaymentStatus.Paid,
      recurrencePattern: ERecurrencyPattern.None,
    });
  }, [id, getBillById]);

  useEffect(() => {
    if (actionType === "update") {
      fetchCurrentBill();
    }
  }, [id, fetchCurrentBill, actionType]);

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

    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleSubmitForm = (data: ICreateBillDto) => {
    const dataToSend: ICreateBillDto = {
      ...data,
      price: parseCurrencyForSubmission(data.price.toString()),
    };

    if (actionType === "create") {
      create(dataToSend);
    } else {
      update({ ...dataToSend, id: id } as IUpdateBillDto);
    }
  };

  const handleDeleteBill = () => {
    if (billForm.id) deleteBill(billForm.id);
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.formContainer}>
          {/* Name Field */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                style={styles.inputContainer}
                placeholder="Nome"
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}

          {/* Price Field */}
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={formatCurrency(value)}
                style={styles.inputContainer}
                placeholder="Valor"
                keyboardType="number-pad"
                onChangeText={(text) => {
                  const rawValue = text.replace(/\D/g, "");
                  onChange(rawValue);
                }}
                onBlur={onBlur}
              />
            )}
          />
          {errors.price && (
            <Text style={styles.errorText}>{errors.price.message}</Text>
          )}

          {/* Description Field */}
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                style={[styles.inputContainer, { height: 100 }]}
                placeholder="Descrição"
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description.message}</Text>
          )}

          {/* Two Columns for Pickers */}
          <View style={styles.twoColumns}>
            {/* Transaction Type Picker */}
            <View style={[styles.fieldContainer, { width: "50%" }]}>
              <Controller
                control={control}
                name="transactionType"
                render={({ field: { onChange, value } }) => (
                  <PickerFormik
                    title="Tipo de transação"
                    items={[
                      { label: "Débito", value: "Debit" },
                      { label: "Crédito", value: "Credit" },
                    ]}
                    selectedValue={value}
                    onValueChange={onChange}
                  />
                )}
              />
              {errors.transactionType && (
                <Text style={styles.errorText}>
                  {errors.transactionType.message}
                </Text>
              )}
            </View>

            {/* Bill Type Picker */}
            <View style={[styles.fieldContainer, { width: "50%" }]}>
              <Controller
                control={control}
                name="billTypeId"
                render={({ field: { onChange, value } }) => (
                  <PickerFormik
                    title="Tipo da conta"
                    items={billTypes.map((billType) => ({
                      label: billType.type,
                      value: billType.id,
                    }))}
                    selectedValue={value}
                    onValueChange={onChange}
                  />
                )}
              />
              {errors.billTypeId && (
                <Text style={styles.errorText}>
                  {errors.billTypeId.message}
                </Text>
              )}
            </View>
          </View>

          {/* Two Columns for DatePickers */}
          <View style={styles.twoColumns}>
            {/* Effective Date */}
            <View style={[styles.fieldContainer, { width: "50%" }]}>
              <Controller
                control={control}
                name="effectiveDate"
                render={({ field: { onChange, value } }) => (
                  <DatePickerFormik
                    title="Data de vencimento: "
                    date={value}
                    onDateChange={onChange}
                  />
                )}
              />
              {errors.effectiveDate && (
                <Text style={styles.errorText}>
                  {errors.effectiveDate.message}
                </Text>
              )}
            </View>
            {/* Paid Date */}
            <View style={[styles.fieldContainer, { width: "50%" }]}>
              <Controller
                control={control}
                name="paidDate"
                render={({ field: { onChange, value } }) => (
                  <DatePickerFormik
                    title="Data de pagamento: "
                    date={value}
                    onDateChange={onChange}
                  />
                )}
              />
              {errors.paidDate && (
                <Text style={styles.errorText}>
                  {errors.paidDate.message}
                </Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            {actionType === "update" && (
              <Pressable
                style={({ pressed }) => [
                  styles.deleteButton,
                  pressed && styles.deleteButtonPressed,
                ]}
                onPress={handleDeleteBill}
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
              onPress={handleSubmit(handleSubmitForm)}
            >
              <Text style={{ fontSize: 18, color: "white" }}>
                {actionType === "update" ? "Atualizar" : "Criar"}
              </Text>
            </Pressable>
          </View>
        </View>
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
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    backgroundColor: defaultColors.green500,
    borderRadius: 5,
  },
  deleteButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
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
