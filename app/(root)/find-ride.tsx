import { View, Text } from "react-native"
import React from "react"
import { useLocationStore } from "@/store"

export default function FindRide() {
	const {
		userAddress,
		destinationAddress,
		setDestinationLocation,
		setUserLocation,
	} = useLocationStore()
	return (
		<View>
			<Text className={styles.title}>You are here : {userAddress}</Text>
			<Text className={styles.title}>
				You are going to : {destinationAddress}
			</Text>
		</View>
	)
}

const styles = {
	title: "text-2xl",
}
