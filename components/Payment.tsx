import React from "react"
import Button from "./Button"
import { functions } from "@/constants"

export default function Payment() {
	const openPaymentSheet = async () => {}

	return (
		<>
			<Button
				type={"text"}
				textButton={"Confirm Ride"}
				styles={stylesButtonConfirm}
				variantStyles={stylesButtonConfirmVariant}
				action={openPaymentSheet}
			/>
		</>
	)
}

const stylesButtonConfirm = {
	container:
		"w-full rounded-full flex flex-row p-3 shadow-md shadow-neutral-400/70 mb-10 mt-5",
	button: "w-full justify-center items-center",
	text: "text-lg font-bold",
}

const stylesButtonConfirmVariant = {
	container: functions.getBgVariantStyle("primary"),
	text: functions.getTextVariantStyle("default"),
}
