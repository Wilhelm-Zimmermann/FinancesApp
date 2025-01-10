import { Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FieldProps } from "formik";
import { defaultColors } from "@/contexts/ThemeContext/defaultColors";

interface IDatePickerProps<T> {
  title: string;
  name: keyof T;
}

export const DatePickerFormik = <T,>({
  title,
  field,
  form,
}: IDatePickerProps<T> & FieldProps) => {
  const [show, setShow] = useState(false);

  const currentDate = field.value || new Date();

  const handleChangeDate = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (event.type === "dismissed") {
        setShow(false);
        return;
      }
      if (selectedDate) {
        form.setFieldValue(field.name, selectedDate);
      }
      setShow(false);
    },
    [form, field.name]
  );

  return (
    <View style={styles.container}>
      <View>
        <Text>{title}</Text>
      </View>
      <Pressable
        style={styles.pressableContainer}
        onPress={() => setShow(true)}
      >
        <Text>{new Date(currentDate).toLocaleDateString()}</Text>
        <Ionicons size={18} name={"calendar-clear-outline"} />
      </Pressable>
      {show && (
        <DateTimePicker
          value={new Date(currentDate)}
          mode="date"
          display="calendar"
          onChange={handleChangeDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
  },
  pressableContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: defaultColors.gray300,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: 180,
  },
});
