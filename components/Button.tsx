import { View, TouchableOpacity, Text, Image } from "react-native"

export default function Button({
	type,
	styles,
	variantStyles,
	action,
	textButton,
	srcImage,
	IconLeft,
	IconRight,
}: ButtonProps) {
	const children = () => {
		if (type === "text") {
			return (
				<Text className={`${styles.text} ${variantStyles?.text}`}>
					{textButton}
				</Text>
			)
		} else if (type === "image") {
			return (
				<Image
					source={srcImage}
					resizeMode="contain"
					className={styles.image}
				/>
			)
		}
	}

	return (
		<View className={`${styles.container} ${variantStyles?.container}`}>
			<TouchableOpacity
				className={`${styles.button} ${variantStyles?.button}`}
				onPress={action}
			>
				{IconLeft && <IconLeft />}
				{children()}
				{IconRight && <IconRight />}
			</TouchableOpacity>
		</View>
	)
}
