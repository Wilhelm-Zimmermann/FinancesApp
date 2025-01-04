import { Pressable, StyleProp, Text } from "react-native";

interface IButtonProps {
  title: string;
}

export const Button = ({ title }: IButtonProps) => {
  return (
    <Pressable>
      <Text>{}</Text>
    </Pressable>
  );
};
