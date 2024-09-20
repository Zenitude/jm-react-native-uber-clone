/* eslint-disable prettier/prettier */
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native"
import React from "react"
import { useAuth, useUser } from "@clerk/clerk-expo"
import { useFetch } from "@/lib/fetch"
import { Ride } from "@/types/global"
import RideCard from "@/components/RideCard"
import Button from "@/components/Button"
import { images, icons } from "@/constants"
import { router } from "expo-router"

export default function Rides() {
	const { user } = useUser()
	const { data: recentRides, loading } = useFetch(`/(api)/ride/${user?.id}`)
	const { signOut } = useAuth()

	const handleSignOut = () => {
		signOut()
		router.replace("/(auth)/sign-in")
	}

	return (
		<View>
			<FlatList
				data={(recentRides as Ride[])!}
				renderItem={({ item }) => <RideCard ride={item} />}
				className={styles.list}
				keyboardShouldPersistTaps={"handled"}
				contentContainerStyle={{
					paddingBottom: 100,
				}}
				ListEmptyComponent={() => (
					<View className={styles.containerEmpty}>
						{!loading ? (
							<>
								<Image
									source={images.noResult}
									resizeMode="contain"
									className={styles.imageEmpty}
									alt={"No recent rides found"}
								/>
								<Text className={styles.textEmpty}>No recent rides found</Text>
							</>
						) : (
							<ActivityIndicator size={"small"} color={"#000"} />
						)}
					</View>
				)}
				ListHeaderComponent={() => (
					<>
						<View className={styles.containerHeader}>
							<Text className={styles.welcome}>
								All Rides
							</Text>
							<Button
								type="image"
								styles={stylesButtonLogout}
								srcImage={icons.out}
								action={handleSignOut}
							/>
						</View>
					</>
				)}
			/>
		</View>
	)
}

const styles = {
	area: "bg-general-500",
	list: "px-5",
	containerEmpty: "flex flex-col items-center justify-center pt-20",
	imageEmpty: "w-40 h-40",
	textEmpty: "text-sm",
	loadingText: "",
	containerHeader: "flex flex-row items-center justify-between my-10",
	welcome: "text-lg font-JakartaExtraBold capitalize",
	buttonLogout: "",
	iconButtonLogout: "w-4 h-4",
}

const stylesButtonLogout = {
	container: "",
	button: "justify-center items-center w-10 h-10 rounded-full bg-white",
	image: "w-4 h-4",
}