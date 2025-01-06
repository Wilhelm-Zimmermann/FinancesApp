import { IBillListSearchParams } from "@/models/bills/bill-list-searcParams";
import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, View } from "react-native";

interface IBillsDateFilterModalProps {
  handleSearchParamsUpdate: (
    param: keyof IBillListSearchParams,
    value: any
  ) => void;
  handleCloseModal: () => void;
  isModalVisible: boolean;
}

export const BillsDateFilterModal = ({
  handleSearchParamsUpdate,
  handleCloseModal,
  isModalVisible,
}: IBillsDateFilterModalProps) => {
  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={handleCloseModal}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.deleteButtonContainer}>
          <Ionicons name="close-outline" size={32} onPress={handleCloseModal} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  deleteButtonContainer: {
    display: "flex",
    alignSelf: "flex-end",
  },
  modalContainer: {
    padding: 10,
  },
});
