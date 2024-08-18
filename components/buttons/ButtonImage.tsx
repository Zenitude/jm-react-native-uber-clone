import { View, TouchableOpacity, Image } from "react-native";
import React from 'react'

export default function ButtonImage({styles, src, action}: ButtonImageProps) {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={action} style={styles.button}>
            <Image 
                source={src}
                resizeMode="contain"
                style={styles.icon}
            />
        </TouchableOpacity>
    </View>
  )
}