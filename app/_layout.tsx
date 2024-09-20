import { Stack } from "expo-router"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import ContextProvider from "@/context/Context"
import * as SplashScreen from "expo-splash-screen"
import { fonts } from "@/constants"
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo"
import { tokenCache } from "@/lib/auth"
import { LogBox } from "react-native"

// eslint-disable-next-line prettier/prettier
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()
LogBox.ignoreLogs(["Clerk:"])

export default function RootLayout() {
	const [loaded] = useFonts(fonts)

	if (!publishableKey) {
		throw new Error(
			'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
		)
	}

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
			<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
				<ClerkLoaded>
					<Stack>
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen name="(auth)" options={{ headerShown: false }} />
						<Stack.Screen name="(root)" options={{ headerShown: false }} />
						<Stack.Screen name="+not-found" />
					</Stack>
				</ClerkLoaded>
			</ClerkProvider>
		</ContextProvider>
	)
}
