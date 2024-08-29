import React from "react"
import { Tabs } from "expo-router"
import { View, Image, Text, ImageSourcePropType, Animated } from "react-native"

const TabIcon = ({ icon, color, name, focused, styles }: TabIconType) => {
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

export default function TabBar({
	initial,
	label,
	styles,
	iconColor,
	tabs,
}: TabBarProps) {
	return (
		<Tabs
			initialRouteName={initial}
			screenOptions={{
				tabBarShowLabel: label,
				tabBarActiveTintColor: iconColor.active,
				tabBarInactiveTintColor: iconColor.inactive,
				tabBarStyle: {
					display: styles?.display ? styles?.display : undefined,
					justifyContent: styles?.justifyContent
						? styles?.justifyContent
						: undefined,
					alignItems: styles?.alignItems ? styles?.alignItems : undefined,
					flexDirection: styles?.flexDirection
						? styles?.flexDirection
						: undefined,
					position: styles?.position ? styles?.position : undefined,
					backgroundColor: styles?.background ? styles?.background : undefined,
					borderTopWidth: styles?.border?.width?.top
						? styles?.border?.width?.top
						: undefined,
					borderRightWidth: styles?.border?.width?.right
						? styles?.border?.width?.right
						: undefined,
					borderBottomWidth: styles?.border?.width?.bottom
						? styles?.border?.width?.bottom
						: undefined,
					borderLeftWidth: styles?.border?.width?.left
						? styles?.border?.width?.left
						: undefined,
					borderWidth: styles?.border?.width?.full
						? styles?.border?.width?.full
						: undefined,
					borderTopColor: styles?.border?.color?.top
						? styles?.border?.color?.top
						: undefined,
					borderRightColor: styles?.border?.color?.right
						? styles?.border?.color?.right
						: undefined,
					borderBottomColor: styles?.border?.color?.bottom
						? styles?.border?.color?.bottom
						: undefined,
					borderLeftColor: styles?.border?.color?.left
						? styles?.border?.color?.left
						: undefined,
					borderColor: styles?.border?.color?.full
						? styles?.border?.color?.full
						: undefined,
					borderRadius: styles?.border?.radius?.full
						? styles?.border?.radius?.full
						: undefined,
					borderTopLeftRadius: styles?.border?.radius?.topLeft
						? styles?.border?.radius?.topLeft
						: undefined,
					borderTopRightRadius: styles?.border?.radius?.topRight
						? styles?.border?.radius?.topRight
						: undefined,
					borderBottomLeftRadius: styles?.border?.radius?.bottomLeft
						? styles?.border?.radius?.bottomLeft
						: undefined,
					borderBottomRightRadius: styles?.border?.radius?.bottomRight
						? styles?.border?.radius?.bottomRight
						: undefined,
					padding: styles?.padding?.full ? styles?.padding?.full : undefined,
					paddingTop: styles?.padding?.top ? styles?.padding?.top : undefined,
					paddingRight: styles?.padding?.right
						? styles?.padding?.right
						: undefined,
					paddingBottom: styles?.padding?.bottom
						? styles?.padding?.bottom
						: undefined,
					paddingLeft: styles?.padding?.left
						? styles?.padding?.left
						: undefined,
					paddingHorizontal: styles?.padding?.horizontal
						? styles?.padding?.horizontal
						: undefined,
					paddingVertical: styles?.padding?.vertical
						? styles?.padding?.vertical
						: undefined,
					margin: styles?.margin?.full ? styles?.margin?.full : undefined,
					marginTop: styles?.margin?.top ? styles?.margin?.top : undefined,
					marginRight: styles?.margin?.right
						? styles?.margin?.right
						: undefined,
					marginBottom: styles?.margin?.bottom
						? styles?.margin?.bottom
						: undefined,
					marginLeft: styles?.margin?.left ? styles?.margin?.left : undefined,
					marginHorizontal: styles?.margin?.horizontal
						? styles?.margin?.horizontal
						: undefined,
					marginVertical: styles?.margin?.vertical
						? styles?.margin?.vertical
						: undefined,
					height: styles?.height,
				},
			}}
		>
			{tabs.content.map((tab, index) => (
				<Tabs.Screen
					key={index}
					name={tab.name}
					options={{
						title: tab.title,
						headerShown: false,
						tabBarIcon: ({ focused, color }: IconType) => {
							return (
								<TabIcon
									icon={tab.icon}
									color={color}
									name="Home"
									focused={focused}
									styles={tabs.styles}
								/>
							)
						},
					}}
				/>
			))}
		</Tabs>
	)
}

export type TabBarStyleType = {
	background?: string,
	overflow?: string,
	padding?: {
		top?: number,
		right?: number,
		bottom?: number,
		left?: number,
		full?: number,
		horizontal?: number,
		vertical?: number,
	},
	margin?: {
		top?: number,
		right?: number,
		bottom?: number,
		left?: number,
		full?: number,
		horizontal?: number,
		vertical?: number,
	},
	border?: {
		radius?: {
			topLeft?: number,
			topRight?: number,
			bottomLeft?: number,
			bottomRight?: number,
			full?: number,
		},
		width?: {
			top?: number,
			right?: number,
			bottom?: number,
			left?: number,
			full?: number,
		},
		color?: {
			top?: string,
			right?: string,
			bottom?: string,
			left?: string,
			full?: string,
		},
	},
	height?: number,
	display?:
		| "none"
		| "flex"
		| Animated.Value
		| Animated.AnimatedInterpolation<string | number>
		| undefined,
	justifyContent?:
		| Animated.Value
		| Animated.AnimatedInterpolation<string | number>
		| "flex-start"
		| "flex-end"
		| "center"
		| "space-between"
		| "space-around"
		| "space-evenly",
	alignItems?:
		| Animated.Value
		| Animated.AnimatedInterpolation<string | number>
		| "flex-start"
		| "flex-end"
		| "center"
		| "stretch"
		| "baseline"
		| undefined,
	flexDirection?:
		| Animated.Value
		| Animated.AnimatedInterpolation<string | number>
		| "row"
		| "column"
		| "row-reverse"
		| "column-reverse"
		| undefined,
	position?:
		| Animated.Value
		| Animated.AnimatedInterpolation<string | number>
		| "absolute"
		| "relative"
		| "static"
		| undefined,
}

type TabBarProps = {
	initial: string,
	label: boolean,
	iconColor: {
		active: string,
		inactive: string,
	},
	styles?: TabBarStyleType,
	tabs: {
		content: {
			name: string,
			title: string,
			icon: ImageSourcePropType,
		}[],
		styles: TabIconStyleType,
	},
}

type TabIconStyleType = {
	tab: string,
	containerIcon: string,
	icon: string,
	text: string,
	focused: {
		tab: string,
		containerIcon: string,
		icon: string,
		text: string,
	},
	unfocus?: {
		tab: string,
		containerIcon: string,
		icon: string,
		text: string,
	},
}

type TabIconType = {
	icon: ImageSourcePropType,
	color: string,
	name: string,
	focused: boolean,
	styles: TabIconStyleType,
}

type IconType = {
	focused: boolean,
	color: string,
}
