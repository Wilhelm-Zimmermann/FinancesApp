import { StyleSheet, Text, View } from "react-native";
import { Picker as ReactPicker } from "@react-native-picker/picker";
import { defaultColors } from "@/contexts/ThemeContext/defaultColors";

interface IItem {
  label: string;
  value: string | number;
}

interface IPickerProps<T> {
  title: string;
  items: IItem[];
  fieldToSet: keyof T;
  onChange: (fieldToUpdate: keyof T, fieldValue: any) => void;
}

export const Picker = <T,>({
  title,
  items,
  fieldToSet,
  onChange,
}: IPickerProps<T>) => {
  return (
    <View style={styles.pickerContent}>
      <Text> {title} </Text>
      <View style={styles.pickerContainer}>
        <ReactPicker
          selectedValue={""}
          style={styles.picker}
          onValueChange={(item) => onChange(fieldToSet, item)}
        >
          <ReactPicker.Item label="Selecione..." value="" enabled={false} />
          {items.map((item) => (
            <ReactPicker.Item
              label={item.label}
              value={item.value}
              key={item.value}
            />
          ))}
        </ReactPicker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {},
  inputContainer: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: defaultColors.gray300,
    borderRadius: 5,
  },
  twoColumns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 2,
  },
  pickerContent: {
    width: "50%",
    display: "flex",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: defaultColors.gray300,
    borderRadius: 5,
    marginTop: 10,
  },
  picker: {
    height: 50,
  },
});
