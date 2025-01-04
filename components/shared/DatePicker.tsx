import { Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface IDatePickerProps<T> {
  title: string;
  fieldToSet: keyof T;
  onChange: (fieldToUpdate: keyof T, fieldValue: any) => void;
}

export const DatePicker = <T,>({
  title,
  fieldToSet,
  onChange,
}: IDatePickerProps<T>) => {
  const [show, setShow] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleChangeDate = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (event.type === "dismissed") {
        setShow(false);
        return;
      }
      if (selectedDate) {
        setCurrentDate(selectedDate);
        onChange(fieldToSet, selectedDate);
      }
      setShow(false);
    },
    [onChange, fieldToSet]
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
        <Text>{currentDate.toLocaleDateString()}</Text>
        <Ionicons size={18} name={"calendar-clear-outline"} />
      </Pressable>
      {show && (
        <DateTimePicker
          value={currentDate}
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
    width: "50%",
    display: "flex",
  },
  pressableContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: 180,
  },
});
