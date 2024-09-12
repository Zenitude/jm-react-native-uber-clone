import React, { useState, useEffect } from "react"
import Button from "./Button"
import { Alert } from "react-native"
import { functions } from "@/constants"
import { useStripe } from "@stripe/stripe-react-native"

export default function Payment() {
	const [success, setSuccess] = useState(false)
	const { initPaymentSheet, presentPaymentSheet } = useStripe()

	const confirmHandler = async (
		paymentMethod,
		shouldSavePaymentMethod,
		intentCreationCallback,
	) => {
		// Make a request to your own server.
    const myServerResponse = await fetch(...);
    // Call the `intentCreationCallback` with your server response's client secret or error
    const { clientSecret, error } = await response.json();
    if (clientSecret) {
      intentCreationCallback({clientSecret})
    } else {
      intentCreationCallback({error})
    }
	}

	const initializePaymentSheet = async () => {
		const { error } = await initPaymentSheet({
			merchantDisplayName: "Example, Inc.",
			intentConfiguration: {
				mode: {
					amount: 55,
					currencyCode: "USD",
				},
				confirmHandler: confirmHandler,
			},
		})
		if (error) {
			// handle error
		}
	}

	const openPaymentSheet = async () => {
		await initializePaymentSheet()
		const { error } = await presentPaymentSheet()

		if (error) {
			if (error) {
				Alert.alert(`Error code : ${error.code}`, error.message)
			} else {
				setSuccess(true)
			}
		} else {
			// Payment completed - show a confirmation screen.
		}
	}

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
