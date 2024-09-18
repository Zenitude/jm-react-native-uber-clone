import {
	View,
	TouchableOpacity,
	Text,
	Image,
	GestureResponderEvent,
	ImageSourcePropType,
} from "react-native"

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
	return (
		<>
			<View className={`${styles.container} ${variantStyles?.container}`}>
				<TouchableOpacity
					className={`${styles.button} ${variantStyles?.button}`}
					onPress={action}
				>
					{IconLeft && <IconLeft />}
					{(type === "full" || type === "image" || type === "imageLabel") && (
						<Image
							source={srcImage}
							resizeMode="contain"
							className={styles.image}
						/>
					)}
					{(type === "full" || type === "text") && (
						<Text className={`${styles.text} ${variantStyles?.text}`}>
							{textButton}
						</Text>
					)}
					{IconRight && <IconRight />}
				</TouchableOpacity>
			</View>
			{type === "imageLabel" && (
				<Text className={`${styles.text} ${variantStyles?.text}`}>
					{textButton}
				</Text>
			)}
		</>
	)
}

type ButtonProps = {
	type: string,
	styles: {
		container: string,
		button?: string,
		text?: string,
		image?: string,
	},
	variantStyles?: {
		container: string,
		button?: string,
		text?: string,
	},
	action: (event: GestureResponderEvent) => void,
	textButton?: string,
	srcImage?: ImageSourcePropType,
	IconLeft?: React.ComponentType<any>,
	IconRight?: React.ComponentType<any>,
}
