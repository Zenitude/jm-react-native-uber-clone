import { View, Image } from "react-native"
import React from "react"
import { GoogleInputProps } from "@/types/global"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { icons } from "@/constants"

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY

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
			<GooglePlacesAutocomplete
				fetchDetails={true}
				placeholder={"Where you want to go ?"}
				debounce={200}
				styles={{
					textInputContainer: {
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 20,
						marginHorizontal: 20,
						position: "relative",
						shadowColor: "#d4d4d4",
					},
					textInput: {
						backgroundColor: textInputBackgroundColor || "white",
						fontSize: 16,
						fontWeight: "bold",
						marginTop: 5,
						width: "100%",
						borderRadius: 200,
					},
					listView: {
						backgroundColor: textInputBackgroundColor || "white",
						position: "absolute",
						top: 0,
						width: "100%",
						borderRadius: 10,
						shadowColor: "#d4d4d4",
						zIndex: 99,
					},
				}}
				onPress={(data, details = null) => 
					handlePress({
						// eslint-disable-next-line prettier/prettier
						latitude: details?.geometry.location.lat!, 
						longitude: details?.geometry.location.lng!, 
						address: data.description
					})
				}
				query={{
					key: googlePlacesApiKey,
					language: "en",
				}}
				renderLeftButton={() => (
					<View className={styles.buttonGoogle}>
						<Image 
							source={icon ?? icons.search}
							resizeMode={"contain"}
							className={styles.iconButtonGoogle}
						/>
					</View>
				)}
				textInputProps={{
					placeholderTextColor: "gray",
					placeholder: initialLocation ?? "Where do you want to go ?"
				}}
			/>
		</View>
	)
}

const styles = {
	buttonGoogle: "justify-center items-center w-6 h-6",
	iconButtonGoogle: "w-6 h-6",
}