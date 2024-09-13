import React, { useState, useEffect } from "react"
import Button from "./Button"
import { Alert } from "react-native"
import { functions } from "@/constants"
import { useStripe } from "@stripe/stripe-react-native"
import { fetchAPI } from "@/lib/fetch"

export default function Payment({
	fullName,
	email,
	amount,
	driverId,
	rideTime,
}: {
	fullName: string,
	email: string,
	amount: string,
	driverId: number | undefined,
	rideTime: number | undefined,
}) {
	const [success, setSuccess] = useState(false)
	const { initPaymentSheet, presentPaymentSheet } = useStripe()

	const confirmHandler = async (paymentMethod, _, intentCreationCallback) => {
		const { paymentIntent, customer } = await fetchAPI(
			"/(api)/(stripe)/create",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: fullName || email.split("@")[0],
					email: email,
					amount: amount,
					paymentMethodId: paymentMethod.id,
				}),
			},
		)

		if (paymentIntent.client_secret) {
			const { result } = await fetchAPI("/(api)/(stripe)/pay", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					payment_method_id: paymentMethod.id,
					payment_intent_id: paymentIntent.id,
					customer_id: customer,
				}),
			})

			if (result.client_secret) {
					
			}
		}

		// Call the `intentCreationCallback` with your server response's client secret or error
		const { clientSecret, error } = await response.json()
		if (clientSecret) {
			intentCreationCallback({ clientSecret })
		} else {
			intentCreationCallback({ error })
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
