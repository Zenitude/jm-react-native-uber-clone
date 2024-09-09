import { Text } from "react-native"
import React from "react"
import MapView, { PROVIDER_DEFAULT } from "react-native-maps"
import { useLocationStore } from "@/store"
import { calculateRegion } from "@/lib/map"

export default function GoogleMap() {
	const {
		userLongitude,
		userLatitude,
		destinationLatitude,
		destinationLongitude,
	} = useLocationStore()

	const region = calculateRegion({
		userLongitude,
		userLatitude,
		destinationLatitude,
		destinationLongitude,
	})

	return (
		<MapView
			provider={PROVIDER_DEFAULT}
			className={styles.mapview}
			tintColor="black"
			mapType="mutedStandard"
			showsPointsOfInterest={false}
			initialRegion={region}
			showsUserLocation={true}
			userInterfaceStyle={"light"}
		>
			<Text>Map</Text>
		</MapView>
	)
}

const styles = {
	mapview: "w-full h-full rounded-2xl mt-5 ",
}
