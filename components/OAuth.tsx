import { View, Text, Image } from "react-native"
import Button from "./Button"
import { functions, icons } from "@/constants"

export default function OAuth() {
	const handleGoogleSignIn = async () => {}

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
