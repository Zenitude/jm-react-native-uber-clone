import { useUser } from "@clerk/clerk-expo"
import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList, View, Text, Image, ActivityIndicator } from "react-native"
import { images, icons, recentRides } from "@/constants"
import RideCard from "@/components/RideCard"
import { useState } from "react"
import Button from "@/components/Button"
import GoogleTextInput from "@/components/GoogleTextInput"
import Map from "@/components/Map"

export default function Home() {
	const { user } = useUser()
	const [loading] = useState(false)

	const signOut = () => {}

	const searchLocation = () => {}

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
							<View className={styles.containerSub}>
								<Map />
							</View>
						</>
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
}

const stylesButtonLogout = {
	container: "",
	button: "justify-center items-center w-10 h-10 rounded-full bg-white",
	image: "w-4 h-4",
}
