import { View, TouchableOpacity } from "react-native";
import React from "react";

export default function ButtonModal({styles, setter, data, children}: ButtonModalProps) {
  return (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => setter(!data)}
        >
            {children}
        </TouchableOpacity>
    </View>
  )
}