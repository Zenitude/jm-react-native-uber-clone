import { Stack } from "expo-router"
import ContextProvider from "@/context/Context"

export default function Layout() {
	return (
		<ContextProvider>
			<Stack>
				<Stack.Screen name="welcome" options={{ headerShown: false }} />
				<Stack.Screen name="sign-in" options={{ headerShown: false }} />
				<Stack.Screen name="sign-up" options={{ headerShown: false }} />
			</Stack>
		</ContextProvider>
	)
}
