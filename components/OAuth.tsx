/* eslint-disable prettier/prettier */
import { View, Text, Image, Alert } from "react-native"
import Button from "./Button"
import { useCallback } from "react"
import { functions, icons } from "@/constants"
import { useOAuth } from "@clerk/clerk-expo"
import { googleOAuth } from "@/lib/auth"
import { router } from "expo-router"

export default function OAuth() {
	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google"})

	const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow)

			if (result?.code === "session_exists" || result?.code === "success") {
				router.push("/(root)/(tabs)/home")
			}
    } catch (err) {
      console.error('OAuth error', err)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

	return (
		<View className={styles.containerMain}>
			<View className={styles.containerSeparator}>
				<View className={styles.separator} />
				<Text className={styles.or}>Or</Text>
				<View className={styles.separator} />
			</View>
			<Button
				type={"text"}
				styles={stylesButton}
				variantStyles={stylesButtonVariant}
				action={handleGoogleSignIn}
				textButton={"Log in with Google"}
				IconLeft={() => (
					<Image
						source={icons.google}
						resizeMode={"contain"}
						className={styles.image}
					/>
				)}
			/>
		</View>
	)
}

const styles = {
	containerMain: "",
	containerSeparator: "flex flex-row justify-center items-center gap-x-1",
	separator: "flex-1 h-[1px] bg-general-100",
	or: "text-lg",
	image: "w-5 h-5 mx-2",
}

const stylesButton = {
	container:
		"w-full rounded-full flex flex-row p-3 shadow-md shadow-neutral-400/70 mb-5 mt-5",
	button: "w-full flex-row justify-center items-center",
	text: "text-lg font-bold",
}

const stylesButtonVariant = {
	container: functions.getBgVariantStyle("outline"),
	text: functions.getTextVariantStyle("primary"),
}
