import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

interface IButtonProps {
  title: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  customStyles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const ButtonIcon = ({
  title,
  iconName,
  iconColor,
  onPress,
  customStyles,
}: IButtonProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      padding: 10,
      borderRadius: 4,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      columnGap: 4,
      alignSelf: "flex-start",
      backgroundColor: isPressed ? iconColor : "white",
    },
    textContent: {
      color: isPressed ? "white" : iconColor ?? "white",
    },
  });

  const handleButtonPress = useCallback(() => {
    setIsPressed(true);
    if (onPress) onPress();
  }, [isPressed]);

  const handleButtonPressOut = useCallback(() => {
    setIsPressed(false);
  }, [isPressed]);

  return (
    <Pressable
      style={[styles.container, customStyles]}
      onPress={handleButtonPress}
      onPressOut={handleButtonPressOut}
      onResponderRelease={handleButtonPressOut}
    >
      {iconName && <Ionicons name={iconName} size={20} color={iconColor} />}
      <Text style={styles.textContent}>{title}</Text>
    </Pressable>
  );
};
