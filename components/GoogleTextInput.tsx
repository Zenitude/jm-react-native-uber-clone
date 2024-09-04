import { View, Text } from "react-native"
import React from "react"
import { GoogleInputProps } from "@/types/global"

export default function GoogleTextInput({
	icon,
	initialLocation,
	containerStyle,
	textInputBackgroundColor,
	handlePress,
}: GoogleInputProps) {
	return (
		<View
			className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
		>
			<Text>Search</Text>
		</View>
	)
}
