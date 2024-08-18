import { View, Text } from "react-native"
import { Link, Stack } from "expo-router"
import React from "react"

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View className={styles.container}>
				<Text className={styles.title}>This screen doesn't exist</Text>
				<Link href="/" className={styles.link}>
					<Text className={styles.textLink}>Go to home screen</Text>
				</Link>
			</View>
		</>
	)
}

const styles = {
	container: "flex-1 items-center justify-center, p-[20px]",
	title: "",
	link: "mt-[15px] py-[15px]",
	textLink: "",
}
