/* eslint-disable prettier/prettier */
import { View, Text, FlatList } from "react-native"
import React from "react"
import RideLayout from "@/components/RideLayout"
import { functions } from "@/constants"
import DriverCard from "@/components/DriverCard"
import Button from "@/components/Button"
import { Href, router } from "expo-router"
import { useDriverStore } from "@/store"

export default function ConfirmRide() {
	const { drivers, selectedDriver, setSelectedDriver } = useDriverStore()
	return (
		<RideLayout title={"Choose a Driver"} snapPoints={["65%", "85%"]}>
			<FlatList
				data={drivers}
				renderItem={({ item }) => (
					<DriverCard
						item={item}
						selected={selectedDriver!}
						setSelected={() => setSelectedDriver(item.id!)}
					/>
				)}
				ListFooterComponent={() => (
					<View className={styles.footerCard}>
						<Button
							type={"text"}
							textButton={"Select Ride"}
							styles={stylesButtonSelect}
							variantStyles={stylesButtonSelectVariant}
							action={() => router.push("/(root)/book-ride" as Href)}
						/>
					</View>
				)}
				ListEmptyComponent={() => <Text>Empty</Text>}
			/>
		</RideLayout>
	)
}

const styles = {
	footerCard: "mx-5 mt-10",
}

const stylesButtonSelect = {
	container:
		"w-full rounded-full flex flex-row p-3 shadow-md shadow-neutral-400/70 mb-10 mt-5",
	button: "w-full justify-center items-center",
	text: "text-lg font-bold",
}

const stylesButtonSelectVariant = {
	container: functions.getBgVariantStyle("primary"),
	text: functions.getTextVariantStyle("default"),
}