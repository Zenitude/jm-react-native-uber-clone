import React, { useEffect, useState } from "react"
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps"
import { useDriverStore, useLocationStore } from "@/store"
import {
	calculateDriverTimes,
	calculateRegion,
	generateMarkersFromData,
} from "@/lib/map"
import { icons } from "@/constants"
import { Driver, MarkerData } from "@/types/global"
import { useFetch } from "@/lib/fetch"
import { ActivityIndicator, View, Text } from "react-native"

export default function GoogleMap({ userLocation }: { userLocation: boolean }) {
	const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver")
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

	useEffect(() => {
		if (markers.length > 0 && destinationLatitude && destinationLongitude) {
			calculateDriverTimes({
				markers,
				userLongitude,
				userLatitude,
				destinationLatitude,
				destinationLongitude,
			}).then((drivers) => {
				setDrivers(drivers as MarkerData[])
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [destinationLatitude, destinationLongitude, markers])

	if (loading || !userLatitude || !userLongitude) {
		return (
			<View className={styles.loadingView}>
				<ActivityIndicator size="small" color="#000" />
			</View>
		)
	}

	if (error) {
		return (
			<View className={styles.loadingView}>
				<Text>Error: {error}</Text>
			</View>
		)
	}

	return (
		<MapView
			provider={PROVIDER_DEFAULT}
			className={styles.mapview}
			tintColor="black"
			mapType="mutedStandard"
			showsPointsOfInterest={false}
			initialRegion={region}
			showsUserLocation={userLocation}
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
	loadingView: "flex justify-between items-center w-full",
}
