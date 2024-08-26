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
