import { StyleSheet, Text, View } from "react-native";
import { Picker as ReactPicker } from "@react-native-picker/picker";
import { FieldProps } from "formik";
import { defaultColors } from "@/contexts/ThemeContext/defaultColors";

interface IItem {
  label: string;
  value: string | number;
}

interface IPickerFormikProps<T> {
  title: string;
  items: IItem[];
}

export const PickerFormik = <T,>({
  title,
  items,
  field,
  form,
}: IPickerFormikProps<T> & FieldProps) => {
  const selectedValue = field.value;

  const handleValueChange = (itemValue: string | number) => {
    form.setFieldValue(field.name, itemValue);
  };

  return (
    <View style={styles.pickerContent}>
      <Text> {title} </Text>
      <View style={styles.pickerContainer}>
        <ReactPicker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={handleValueChange}
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
  pickerContent: {
    width: "100%",
    display: "flex",
  },
  pickerContainer: {
    borderWidth: 1,
    width: "100%",
    borderColor: defaultColors.gray300,
    borderRadius: 5,
    marginTop: 10,
  },
  picker: {
    width: "100%",
    height: 50,
  },
});
