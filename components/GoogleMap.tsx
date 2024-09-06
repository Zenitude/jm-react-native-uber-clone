import { Text } from "react-native"
import React from "react"
import MapView, { PROVIDER_DEFAULT } from "react-native-maps"

export default function GoogleMap() {
	// const region = {

	// }

	return (
		<MapView
			provider={PROVIDER_DEFAULT}
			className={styles.mapview}
			tintColor="black"
			mapType="mutedStandard"
			showsPointsOfInterest={false}
			// initialRegion={region}
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
