import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "../shared/Picker";
import { useCallback, useState } from "react";
import { DatePicker } from "../shared/DatePicker";
import { ICreateBillDto } from "@/models/bills/create-bill.dto";
import { Ionicons } from "@expo/vector-icons";
import { useBills } from "@/contexts/BillsContext/BillContext";

export const BillsForm = () => {
  const [billForm, setBillForm] = useState<ICreateBillDto>(
    {} as ICreateBillDto
  );
  const { create } = useBills();

  const handleUpdateBill = useCallback(
    (fieldToUpdate: keyof ICreateBillDto, fieldValue: any) => {
      setBillForm((prev) => ({
        ...prev,
        [fieldToUpdate]: fieldValue,
      }));
    },

    []
  );

  const handleCreatebill = useCallback(() => {
    create(billForm);
  }, [billForm]);

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.inputContainer}
        placeholder="Nome"
        onChangeText={(value) => handleUpdateBill("name", value)}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="Preço"
        keyboardType="number-pad"
        onChangeText={(value) => handleUpdateBill("price", value)}
      />
      <TextInput
        style={[styles.inputContainer, { height: 100 }]}
        placeholder="Descrição"
        onChangeText={(value) => handleUpdateBill("description", value)}
      />
      <View style={styles.twoColumns}>
        <Picker<ICreateBillDto>
          items={[
            { label: "Débito", value: 1 },
            { label: "Crédito", value: 0 },
          ]}
          title="Tipo de transação"
          fieldToSet="transactionType"
          onChange={handleUpdateBill}
        />
        <Picker<ICreateBillDto>
          items={[
            { label: "Débito", value: "028e9877-cbf1-47c1-9054-4ff1dc6e7769" },
            { label: "Crédito", value: "b8dd36fa-3293-4f9c-bd32-334ffa52c6b4" },
          ]}
          title="Tipo de conta"
          fieldToSet="billTypeId"
          onChange={handleUpdateBill}
        />
      </View>
      <View style={styles.twoColumns}>
        <DatePicker<ICreateBillDto>
          title="Data de vencimento: "
          fieldToSet="effectiveDate"
          onChange={handleUpdateBill}
        />
        <DatePicker<ICreateBillDto>
          title="Data de pagamento: "
          fieldToSet="paidDate"
          onChange={handleUpdateBill}
        />
      </View>
      <View style={styles.actionsContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.createButton,
            pressed && styles.createButtonPressed,
          ]}
          onPress={handleCreatebill}
        >
          <Text style={{ fontSize: 18 }}>Criar</Text>
          <Ionicons size={18} name={"add"} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
  },
  inputContainer: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
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
    borderColor: "#ddd",
    borderRadius: 5,
  },
  picker: {
    height: 50,
  },
  actionsContainer: {},
  createButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 82,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#29f04a",
    borderRadius: 5,
    transitionDuration: "100ms",
    alignSelf: "flex-end",
  },
  createButtonPressed: {
    backgroundColor: "#29f04a",
  },
});
