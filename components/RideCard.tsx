import { View, Text, Image } from "react-native"
import React, { useState } from "react"
import { Ride } from "@/types/global"
import { icons, functions } from "@/constants"

export default function RideCard({
	ride: {
		destination_longitude,
		destination_latitude,
		destination_address,
		origin_address,
		created_at,
		ride_time,
		driver,
		payment_status,
	},
}: {
	ride: Ride,
}) {
	const [measures] = useState({ width: 600, height: 400, zoom: 14 })
	return (
		<View className={styles.container}>
			<View className={styles.containerLocation}>
				<View className={styles.containerImage}>
					<Image
						source={{
							uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=${measures.width}&height=${measures.height}&center=lonlat:${destination_longitude},${destination_latitude}&zoom=${measures.zoom}&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_KEY}`,
						}}
						resizeMode="contain"
						className={styles.image}
					/>
					<View className={styles.containerAddress}>
						<View className={styles.address}>
							<Image
								source={icons.to}
								resizeMode="contain"
								className={styles.icons}
							/>
							<Text className={styles.locationText} numberOfLines={1}>
								{origin_address}
							</Text>
						</View>
						<View className={styles.address}>
							<Image
								source={icons.point}
								resizeMode="contain"
								className={styles.icons}
							/>
							<Text className={styles.locationText} numberOfLines={1}>
								{destination_address}
							</Text>
						</View>
					</View>
				</View>

				<View className={styles.containerInfos}>
					<View className={styles.element}>
						<Text className={styles.label}>Date & Time</Text>
						<Text>
							{functions.formatDateTime(created_at)},{" "}
							{functions.formatDateTime(ride_time)}
						</Text>
					</View>

					<View className={styles.element}>
						<Text className={styles.label}>Driver</Text>
						<Text>
							{driver.first_name} {driver.last_name}
						</Text>
					</View>

					<View className={styles.element}>
						<Text className={styles.label}>Car Seats</Text>
						<Text>{driver.car_seats}</Text>
					</View>

					<View className={styles.element}>
						<Text className={styles.label}>Payment Status</Text>
						<Text
							className={
								payment_status === "paid"
									? styles.paymentPaid
									: styles.paymentNotPaid
							}
						>
							{payment_status}
						</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = {
	container:
		"flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-5",
	containerLocation: "flex flex-col items-center justify-center p-3",
	containerImage: "flex flex-row items-center justify-between",
	image: "w-[80px] h-[90px] rounded-lg",
	containerAddress: "flex flex-col mx-5 gap-y-5 flex-1",
	address: "flex flex-row items-center gap-x-2",
	icons: "w-5 h-5",
	locationText: "text-md font-JakartaMedium",
	containerInfos:
		"flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center",
	element: "flex flex-row items-center w-full justify-between mb-5",
	label: "text-md font-JakartaMedium text-gray-500",
	paymentPaid: "text-green-500 capitalize",
	paymentNotPaid: "text-red-500 capitalize",
}
