import { View } from "react-native"
import React, { useRef } from "react"
import { router } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Button from "./Button"
import { icons } from "@/constants"
import GoogleMap from "./GoogleMap"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"

export default function RideLayout({
	children,
	title,
	snapPoints,
}: {
	children: React.ReactNode,
	title: string,
	snapPoints?: string[],
}) {
	const bottomSheetRef = useRef(null)

	return (
		<GestureHandlerRootView>
			<View className={styles.container}>
				<View className={styles.background}>
					<View className={styles.top}>
						<Button
							type={"imageLabel"}
							srcImage={icons.arrowBack}
							textButton={title || "Go Back"}
							styles={stylesButtonBack}
							action={() => router.back()}
						/>
					</View>
					<GoogleMap userLocation={false} />
				</View>
				<BottomSheet
					keyboardBehavior={"extend"}
					ref={bottomSheetRef}
					snapPoints={snapPoints || ["40%", "85%"]}
					index={0}
				>
					<BottomSheetView style={{ flex: 1, padding: 20 }}>
						{children}
					</BottomSheetView>
				</BottomSheet>
			</View>
		</GestureHandlerRootView>
	)
}

const styles = {
	container: "flex-1 bg-white",
	background: "flex flex-col h-screen bg-blue-500",
	top: "flex flex-row absolute z-10 top-16 items-center justify-start px-5",
}

const stylesButtonBack = {
	container:
		"flex flex-row w-10 h-10 bg-white rounded-full items-center justify-center",
	image: "w-6 h-6",
	text: "text-xl font-JakartaSemiBold ml-5",
}
