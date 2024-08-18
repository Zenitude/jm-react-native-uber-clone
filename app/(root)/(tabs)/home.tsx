import { Text, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
	return (
		<SafeAreaView className={styles.area}>
			<Text className={styles.text}>Home</Text>
			<StatusBar barStyle={"default"} />
		</SafeAreaView>
	)
}

const styles = {
	area: "flex-1 items-center justify-center bg-white",
	text: "text-red-500",
}
