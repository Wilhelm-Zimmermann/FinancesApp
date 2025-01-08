import { StyleSheet } from "react-native";
import Toast, { ErrorToast } from "react-native-toast-message";

export const Toaster = () => {
  return (
    <Toast
      config={{
        error: (props) => (
          <ErrorToast
            {...props}
            text1Style={styles.toastErrorTitle}
            text2Style={styles.toastErrorContent}
            text2NumberOfLines={2}
            style={styles.toastErrorContainer}
          />
        ),
      }}
    />
  );
};

const styles = StyleSheet.create({
  toastErrorContainer: {
    height: 100,
    borderLeftWidth: 4,
    borderColor: "red",
  },
  toastErrorTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  toastErrorContent: {
    fontSize: 14,
  },
});
