import ContextProvider from "@/context/Context"
import { icons } from "@/constants"
import React from "react"
import TabBar from "@/components/TabBar"
import { TabBarStyleType } from "@/components/TabBar"

export default function Layout() {
	const tabs = {
		content: [
			{ name: "home", title: "Home", icon: icons.home },
			{ name: "rides", title: "Rides", icon: icons.list },
			{ name: "chat", title: "Chat", icon: icons.chat },
			{ name: "profile", title: "Profile", icon: icons.profile },
		],
		styles: stylesTabIcon,
	}
	return (
		<ContextProvider>
			<TabBar
				initial={"index"}
				label={false}
				styles={stylesTabBar as TabBarStyleType}
				tabs={tabs}
				iconColor={{
					active: "white",
					inactive: "white",
				}}
			/>
		</ContextProvider>
	)
}

const stylesTabBar = {
	background: "#333333",
	height: 78,
	border: {
		radius: { full: 50 },
	},
	padding: { bottom: 0 },
	margin: { horizontal: 20, bottom: 20 },
	overflow: "hidden",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	flexDirection: "row",
	position: "absolute",
}

const stylesTabIcon = {
	tab: "flex flex-row justify-center items-center rounded-full w-12 h-12 relative",
	containerIcon: "rounded-full w-12 h-12 items-center justify-center absolute",
	icon: "w-7 h-7",
	text: "hidden",
	focused: {
		tab: "bg-general-300",
		containerIcon: "bg-general-400",
		icon: "",
		text: "",
	},
}
