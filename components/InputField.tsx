import {
	View,
	Text,
	Image,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	TextInput,
	Platform,
	Keyboard,
} from "react-native"

export default function InputField({
	label,
	labelStyle,
	icon,
	iconStyle,
	inputStyle,
	...props
}: InputFieldProps) {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View className={styles.view}>
					<Text className={`${styles.text} ${labelStyle}`}>{label}</Text>
					<View className={styles.containerIcon}>
						{icon && (
							<Image
								source={icon}
								className={`${styles.icon} ${iconStyle}`}
								resizeMode={"contain"}
							/>
						)}
						<TextInput
							className={`${styles.input} ${inputStyle}`}
							placeholderTextColor={styles.placeholder}
							{...props}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

const styles = {
	view: "my-1 w-full",
	text: "text-lg font-JakartaSemiBold mb-2",
	containerIcon: `flex flex-row justify-center items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500`,
	icon: `w-6 h-6 ml-4`,
	input: "rounded-full p-3 font-JakartaSemiBold text-[15px] flex-1 text-left",
	placeholder: "",
}
