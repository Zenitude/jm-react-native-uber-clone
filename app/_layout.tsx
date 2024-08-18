import { Stack } from "expo-router"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import ContextProvider from "@/context/Context"
import * as SplashScreen from "expo-splash-screen"
import { fonts } from "@/constants"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded] = useFonts(fonts)

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<ContextProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen name="(root)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
			</Stack>
		</ContextProvider>
	)
}
