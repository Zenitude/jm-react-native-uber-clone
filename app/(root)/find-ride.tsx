/* eslint-disable prettier/prettier */
import { View, Text } from "react-native"
import React from "react"
import { useLocationStore } from "@/store"
import RideLayout from "@/components/RideLayout"
import GoogleTextInput from "@/components/GoogleTextInput"
import { functions, icons } from "@/constants"
import Button from "@/components/Button"
import { Href, router } from "expo-router"

export default function FindRide() {

	const {
		userAddress,
		destinationAddress,
		setDestinationLocation,
		setUserLocation,
	} = useLocationStore()

	return (
		<RideLayout title={"Ride"} snapPoints={['85%']}>
			<View className={styles.containerField}>
				<Text className={styles.title}>From</Text>
				<GoogleTextInput
					icon={icons.target}
					containerStyle={styles.googleInput}
					initialLocation={userAddress!}
					handlePress={(location) => setUserLocation(location)}
					textInputBackgroundColor={"#f5f5f5"}
				/>
			</View>

			<View className={styles.containerField}>
				<Text className={styles.title}>To</Text>
				<GoogleTextInput
					icon={icons.map}
					containerStyle={styles.googleInput}
					initialLocation={destinationAddress!}
					handlePress={(location) => setDestinationLocation(location)}
					textInputBackgroundColor={"transparent"}
				/>
			</View>

			<Button 
				type={"text"}
				textButton={"Find Now"}
				styles={stylesButtonFind}
				variantStyles={stylesButtonFindVariant}
				action={() => router.push("/(root)/confirm-ride" as Href)}
			/>
		</RideLayout>
	)
}

const styles = {
	containerField: "my-3",
	title: "text-lg font-JakartaSemiBold mb-3",
	googleInput: "bg-white shadow-md shadow-neutral-100 bg-neutral-100",
}

const stylesButtonFind = {
	container:
		"w-full rounded-full flex flex-row p-3 shadow-md shadow-neutral-400/70 mb-10 mt-5",
	button: "w-full justify-center items-center",
	text: "text-lg font-bold",
}

const stylesButtonFindVariant = {
	container: functions.getBgVariantStyle("primary"),
	text: functions.getTextVariantStyle("default"),
}
