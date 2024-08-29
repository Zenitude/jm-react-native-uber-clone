import ContextProvider from "@/context/Context"
import { Stack } from "expo-router"

export default function Layout() {
	return (
		<ContextProvider>
			<Stack>
				<Stack.Screen name="home" options={{ headerShown: false }} />
			</Stack>
		</ContextProvider>
	)
}
