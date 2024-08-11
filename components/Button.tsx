import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface CostumButtonProps {
  label?: string;
  onPress?: () => void;
  loading?: boolean;
}
const CostumButton: React.FC<CostumButtonProps> = ({
  label,
  onPress,
  loading,
}) => {
  return (
    <TouchableOpacity disabled={loading} onPress={onPress}>
      <View style={styles.btn}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.light.white} />
        ) : (
          <Text style={styles.btnText}>{label}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CostumButton;

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
    height: 50,
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.light.white,
  },
});
