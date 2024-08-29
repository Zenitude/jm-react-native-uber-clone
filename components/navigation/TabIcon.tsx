import { TabIconType } from "@/types/global"
import { View, Text, Image } from "react-native"

export const TabIcon = ({
	icon,
	color,
	name,
	focused,
	styles,
}: TabIconType) => {
	return (
		<View
			className={`${styles.tab}
				${
					focused
						? styles.focused.tab
						: `${styles.unfocus?.tab ? styles.unfocus?.tab : ""}`
				}
			`}
		>
			<View
				className={`${styles.containerIcon}
						${
							focused
								? styles.focused.containerIcon
								: `${styles.unfocus?.containerIcon ? styles.unfocus?.containerIcon : ""}`
						}
					`}
			>
				<Image
					className={`${styles.icon}
						${
							focused
								? styles.focused.icon
								: `${styles.unfocus?.icon ? styles.unfocus?.icon : ""}`
						}
					`}
					source={icon}
					resizeMode="contain"
					tintColor={color}
				/>
			</View>
			<Text
				className={`${styles.text}
					${
						focused
							? styles.focused.text
							: `${styles.unfocus?.text ? styles.unfocus?.text : ""}`
					}
					`}
			>
				{name}
			</Text>
		</View>
	)
}
