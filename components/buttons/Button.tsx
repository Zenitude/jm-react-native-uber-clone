import { View, TouchableOpacity } from "react-native";
import React from "react";

export default function Button({styles, children, action}: ButtonProps) {
  return (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.button}
            onPress={action}
        >
            {children}
        </TouchableOpacity>
    </View>
  )
}