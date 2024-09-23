/* eslint-disable prettier/prettier */
import React, { useState } from "react"
import Button from "./Button"
import { Alert, View, Image, Text } from "react-native"
import { images } from "@/constants"
import { useStripe } from "@stripe/stripe-react-native"
import { fetchAPI } from "@/lib/fetch"
import { useLocationStore } from "@/store"
import { useAuth } from "@clerk/clerk-expo"
import ReactNativeModal from "react-native-modal"
import { router } from "expo-router"

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
	const { initPaymentSheet, presentPaymentSheet } = useStripe()
	const {
		userAddress,
		userLongitude,
		userLatitude,
		destinationAddress,
		destinationLatitude,
		destinationLongitude,
	} = useLocationStore()

	const { userId } = useAuth()
	const [success, setSuccess] = useState(false)

	const openPaymentSheet = async () => {
		const init = await initializePaymentSheet()
		const { error } = await presentPaymentSheet()
		console.log(init)
		if (error) {
			Alert.alert(`Error code : ${error.code}`, error.message)
		} else {
			setSuccess(true)
		}

	}

	const initializePaymentSheet = async () => {
		const { error } = await initPaymentSheet({
			merchantDisplayName: "Example, Inc.",
			intentConfiguration: {
				mode: {
					amount: parseInt(amount) * 100,
					currencyCode: "USD",
				},
				confirmHandler: async (paymentMethod, _, intentCreationCallback) => {
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
								client_secret: paymentIntent.client_secret
							}),
						})

						if (result.client_secret) {
							await fetchAPI("/(api)/ride/create", {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									origin_address: userAddress,
									destination_address: destinationAddress,
									origin_latitude: userLatitude,
									origin_longitude: userLongitude,
									destination_latitude: destinationLatitude,
									destination_longitude: destinationLongitude,
									ride_time: rideTime?.toFixed(0),
									fare_price: parseInt(amount) * 100,
									payment_status: "paid",
									driver_id: driverId,
									user_id: userId,
								}),
							})
							console.log("ok before intentCreationCallback : ", result.client_secret)
							intentCreationCallback({
								clientSecret: result.client_secret,
							})
							console.log("ok after intentCreationCallback")
						}
					}
				},
			},
			returnURL: "myapp://book-ride",
		})
		if (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Button
				type={"text"}
				textButton={"Confirm Ride"}
				styles={stylesButton}
				variantStyles={stylesButtonVariant}
				action={openPaymentSheet}
			/>

			<ReactNativeModal
				isVisible={success}
				onBackdropPress={() => setSuccess(false)}
			>
				<View className={styles.contentModal}>
					<Image
						source={images.check}
						resizeMode={"contain"}
						className={styles.imageModal}
					/>
					<Text className={styles.firstTextModal}>Ride booked !</Text>
					<Text className={styles.secondTextModal}>
						Thank you for your booking. Your reservation has been placed.
						Please proceed with your trip!
					</Text>
					<Button 
						type={"text"}
						textButton={"Back Home"}
						styles={stylesButton}
						variantStyles={stylesButtonVariant}
						action={() => {
							setSuccess(false)
							router.push("/(root)/(tabs)/home")
						}}
					/>
				</View>
			</ReactNativeModal>
		</>
	)
}

const styles = {
	contentModal:
		"flex flex-col items-center justify-center bg-white p-7 rounded-2xl",
	imageModal: "w-28 h-28 mt-5",
	firstTextModal: "text-2xl text-center font-JakartaBold mt-5",
	secondTextModal:
		"text-md text-general-200 font-JakartaMedium text-center mt-3",
}

const stylesButton = {
	container:
		"w-full rounded-full flex flex-row p-3 shadow-md shadow-neutral-400/70 mb-10 mt-5",
	button: "w-full justify-center items-center",
	text: "text-lg font-bold",
}

const stylesButtonVariant = {
	container: "bg-primary-600",
	text: "text-primary-100",
}
