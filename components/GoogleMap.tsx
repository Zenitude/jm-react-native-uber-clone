import React, { useEffect, useState } from "react"
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps"
import { useDriverStore, useLocationStore } from "@/store"
import { calculateRegion, generateMarkersFromData } from "@/lib/map"
import { drivers, icons } from "@/constants"
import { MarkerData } from "@/types/global"

export default function GoogleMap() {
	const {
		userLongitude,
		userLatitude,
		destinationLatitude,
		destinationLongitude,
	} = useLocationStore()

	const { selectedDriver, setDrivers } = useDriverStore()

	const region = calculateRegion({
		userLongitude,
		userLatitude,
		destinationLatitude,
		destinationLongitude,
	})

	const [markers, setMarkers] = useState<MarkerData[]>([])

	useEffect(() => {
		// TODO: Remove
		setDrivers(drivers)

		if (Array.isArray(drivers)) {
			if (!userLatitude || !userLongitude) return

			const newMarkers = generateMarkersFromData({
				data: drivers,
				userLatitude: userLatitude,
				userLongitude: userLongitude,
			})

			setMarkers(newMarkers)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [drivers])

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
			{markers.map((marker) => (
				<Marker
					coordinate={{
						latitude: marker.latitude,
						longitude: marker.longitude,
					}}
					title={marker.title}
					image={
						selectedDriver === marker.id ? icons.selectedMarker : icons.marker
					}
				/>
			))}
		</MapView>
	)
}

const styles = {
	mapview: "w-full h-full rounded-2xl mt-5 ",
}
