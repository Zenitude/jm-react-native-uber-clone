type InputFieldProps = {
	label: string,
	labelStyle: string,
	placeholder: string,
	icon: ImageSourcePropType,
	iconStyle: string,
	inputStyle: string,
	secureTextEntry: boolean,
	value: string,
	onChangeText: (value: string) => void,
	keyboardType: KeyboardTypeOptions,
}
