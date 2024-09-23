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
	formatDateTime,
}
