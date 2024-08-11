import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface InputFieldProps {
  label?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  onChangeText?: (text: string) => void;
  placeholder?: string;
  value?: string;
  secureTextEntry?: boolean;
  error?: string;
}
const InputField: React.FC<InputFieldProps> = ({
  label,
  keyboardType = "default",
  onChangeText,
  placeholder,
  value,
  secureTextEntry,
  error,
}) => {
  return (
    <View style={styles.input}>
      <Text style={styles.inputLabel}>
        {label}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "red",
              paddingStart: 5,
            }}
          >
            {error}
          </Text>
        </View>
      </Text>

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.secondary}
        style={styles.inputControl}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: Colors.light.inputBgColor,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: Colors.light.text,
  },
});
