import { ButtonOnBoardingProps } from "@/types/global"

const getBgVariantStyle = (variant: ButtonOnBoardingProps["bgVariant"]) => {
	let style: string = ""
	switch (variant) {
		case "secondary":
			style = "bg-gray-500"
			break
		case "danger":
			style = "bg-red-500"
			break
		case "success":
			style = "bg-green-500"
			break
		case "outline":
			style = "bg-transparent border-neutral-300 border-[0.5px]"
			break
		default:
			style = "bg-primary-500"
	}
	return style
}

const getTextVariantStyle = (variant: ButtonOnBoardingProps["textVariant"]) => {
	let style: string = ""
	switch (variant) {
		case "primary":
			style = "text-black"
			break
		case "secondary":
			style = "text-gray-100"
			break
		case "danger":
			style = "text-red-100"
			break
		case "success":
			style = "text-green-100"
			break
		default:
			style = "text-white"
	}
	return style
}

const formatDateTime = (dateTime: string | number) => {
	if (typeof dateTime === "string") {
		const date = new Date(dateTime)
		const day = date.getDate()
		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		]
		const month = monthNames[date.getMonth()]
		const year = date.getFullYear()

		return `${day < 10 ? "0" + day : day} ${month} ${year}`
	} else if (typeof dateTime === "number") {
		const formattedMinutes = +dateTime?.toFixed(0) || 0

		if (formattedMinutes < 60) {
			return `${dateTime} min`
		} else {
			const hours = Math.floor(formattedMinutes / 60)
			const remainingMinutes = formattedMinutes % 60
			return `${hours}h ${remainingMinutes}m`
		}
	}
}

export const functions = {
	getBgVariantStyle,
	getTextVariantStyle,
	formatDateTime,
}
