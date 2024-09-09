import { useUser } from "@clerk/clerk-expo"
import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList, View, Text, Image, ActivityIndicator } from "react-native"
import { images, icons, recentRides } from "@/constants"
import RideCard from "@/components/RideCard"
import { useEffect, useState } from "react"
import Button from "@/components/Button"
import GoogleTextInput from "@/components/GoogleTextInput"
import GoogleMap from "@/components/GoogleMap"
import { useLocationStore } from "@/store"
import * as Location from "expo-location"
import { addressType } from "@/types/global"

export default function Home() {
	const { setUserLocation, setDestinationLocation } = useLocationStore()
	const [ addressUser, setAddressUser ] = useState<addressType>({
		number: null,
		street: null,
		postalcode: null,
		city: null,
		region: null,
		subregion: null,
		country: null,
	}) 
	const { user } = useUser()
	const [loading] = useState(false)
	const [hasPermissions, setHasPermissions] = useState(false)

	const signOut = () => {}

	const searchLocation = () => {}

	useEffect(() => {
		const requestLocation = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()

			if (status !== "granted") {
				setHasPermissions(false)
				return
			}
			
			setHasPermissions(true)
			let location = await Location.getCurrentPositionAsync()

			const address = await Location.reverseGeocodeAsync({
				// eslint-disable-next-line prettier/prettier
				latitude: location.coords?.latitude!,
				longitude: location.coords?.longitude!
			})
			console.log(`lat: ${location.coords.latitude}, long: ${location.coords.longitude}`)
			const { name, street, postalCode, city, region, subregion, country } = address[0]
			setUserLocation({
				latitude: location.coords.latitude!,
				longitude: location.coords.longitude!,
				address: `${name}, ${region}`
			})

			setAddressUser({
				number: name,
				street: street,
				postalcode: postalCode,
				city: city,
				region: region,
				subregion: subregion,
				country: country,
			})
		}
		
		requestLocation()
		
	}, [setAddressUser, setUserLocation])

	return (
		<SafeAreaView className={styles.area}>
			<FlatList
				data={recentRides.slice(0, 5)}
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
								Welcome{", "}
								{user?.firstName ||
									user?.emailAddresses[0].emailAddress
										.split("@")[0]
										.split(".")
										.join(" ")}
							</Text>
							<Button
								type="image"
								styles={stylesButtonLogout}
								srcImage={icons.out}
								action={signOut}
							/>
						</View>

						<GoogleTextInput
							icon={icons.search}
							containerStyle={styles.googleInput}
							handlePress={searchLocation}
						/>

						<>
							<Text className={styles.title}>Your current Location</Text>
							{ hasPermissions 
							  ? (
										<>
									  	<Text className={styles.currentLocation}>{`${addressUser.number} ${addressUser.street} ${addressUser.postalcode}, ${addressUser.city}`}</Text>
											<Text className={styles.currentLocation}>{`${addressUser.subregion}, ${addressUser.region} (${addressUser.country})`}</Text>
										</>
									)
								: (<Text>Geolocalisation not activated</Text>)
							}
							<View className={styles.containerSub}>
								<GoogleMap />
							</View>
						</>
						<Text className={styles.title}>Recent Rides</Text>
					</>
				)}
			/>
		</SafeAreaView>
	)
}

const styles = {
	area: "bg-general-500",
	list: "px-5",
	containerEmpty: "flex flex-col items-center justify-center pt-20",
	imageEmpty: "w-40 h-40",
	textEmpty: "text-sm",
	loadingText: "",
	containerHeader: "flex flex-row items-center justify-between my-5",
	welcome: "text-lg font-JakartaExtraBold capitalize",
	buttonLogout: "",
	iconButtonLogout: "w-4 h-4",
	googleInput: "bg-white shadow-md shadow-neutral-300",
	title: "text-xl font-JakartaBold mt-5 mb-3",
	containerSub: "flex flex-row items-center bg-transparent h-[300px]",
	currentLocation: "text-gray-500"
}

const stylesButtonLogout = {
	container: "",
	button: "justify-center items-center w-10 h-10 rounded-full bg-white",
	image: "w-4 h-4",
}
