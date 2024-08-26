import { useAuth } from "@clerk/clerk-expo"
import { Redirect, Href } from "expo-router"

export default function Home() {
	const { isSignedIn } = useAuth()

	if (isSignedIn) {
		return <Redirect href={"/(root)/(tabs)/home"} />
	}

	return <Redirect href={"/(auth)/welcome" as Href} />
}
