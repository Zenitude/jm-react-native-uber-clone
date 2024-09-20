/* eslint-disable prettier/prettier */
import { View, Text, Image, ImageProps, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState } from "react"
import { useUser } from "@clerk/clerk-expo"
import { functions, icons } from "@/constants"
import InputField from "@/components/InputField"
import Button from "@/components/Button"

export default function Profile() {
	const { user } = useUser()
	const [enableButton, setEnableButton] = useState(false)
	const imageProfile = user?.imageUrl.includes("https") ? { uri: user?.imageUrl } : user?.imageUrl as ImageProps
	const [detailsUser, setDetailsUser] = useState({
		firstname: user?.firstName,
		lastname: user?.lastName,
		email: user?.emailAddresses[0].emailAddress,
		verification: user?.primaryEmailAddress?.verification.status === "verified" ? true : false,
		phoneNumber: user?.phoneNumbers.length === 0 ? "" : `${user?.phoneNumbers[0]}`,
	})
	const [dates] = useState({
		createdAt: user?.createdAt,
		updatedAt: user?.updatedAt,
	})

	const updateDetails = () => {}

	return (
		<SafeAreaView className={styles.area}>
			<ScrollView>
				<View className={styles.header}>
					<Text className={styles.title}>Your profile</Text>
					<Image
						source={imageProfile}
						resizeMode={"contain"}
						className={styles.imageProfile}
					/>
				</View>
				<View className={styles.formular}>
					<InputField
						label={"First name"}
						labelStyle={styles.label}
						inputStyle={styles.input}
						placeholder={"Enter your first name"}
						icon={icons.edit}
						iconStyle={styles.iconInput}
						value={detailsUser.firstname!}
						onChangeText={(value: string) => {
							const firstname = user?.firstName
							setDetailsUser({ ...detailsUser, firstname: value })
							setEnableButton(firstname !== detailsUser.firstname ? true : false)
						}}
						keyboardType={"default"}
					/>

					<InputField
						label={"Last name"}
						labelStyle={styles.label}
						inputStyle={styles.input}
						placeholder={"Enter your last name"}
						icon={icons.edit}
						iconStyle={styles.iconInput}
						secureTextEntry={false}
						value={detailsUser.lastname!}
						onChangeText={(value: string) => {
							const lastname = user?.lastName
							setDetailsUser({ ...detailsUser, lastname: value })
							setEnableButton(lastname !== detailsUser.lastname ? true : false)
						}}
						keyboardType={"default"}
					/>

					<>
						<InputField
							label={"Email"}
							labelStyle={styles.label}
							inputStyle={styles.input}
							placeholder={"Enter your email"}
							icon={icons.edit}
							iconStyle={styles.iconInput}
							secureTextEntry={false}
							value={detailsUser.email!}
							onChangeText={(value: string) => {
								const email = user?.emailAddresses[0].emailAddress
								setDetailsUser({ ...detailsUser, email: value, verification: false })
								setEnableButton(email !== detailsUser.email ? true : false)
							}}
							keyboardType={"email-address"}
						/>
						<View className={`${styles.email} ${detailsUser.verification ? styles.emailVerified : styles.emailNotVerified}`}>
							<Image 
								source={detailsUser.verification ? icons.check : icons.close}
								resizeMode={"contain"}
								className={styles.iconVerified}
							/>
							<Text className={styles.textVerified}>{detailsUser.verification ? "Verified" : "Not Verified"}</Text>
						</View>
					</>

					<InputField
						label={"Phone Number"}
						labelStyle={styles.label}
						inputStyle={styles.input}
						placeholder={"Enter your phone number"}
						icon={icons.edit}
						iconStyle={styles.iconInput}
						secureTextEntry={false}
						value={detailsUser.phoneNumber!}
						onChangeText={(value: string) => {
							const phoneNumber = user?.phoneNumbers[0]
							setDetailsUser({ ...detailsUser, phoneNumber: value })
							setEnableButton(`${phoneNumber}` !== detailsUser.phoneNumber ? true : false)
						}}
						keyboardType={"phone-pad"}
					/>
					{ enableButton && 
						<Button 
							type={"text"}
							textButton={"Validate changes"}
							styles={stylesButton}
							variantStyles={stylesButtonVariant} 
							action={updateDetails}
						/>
					}
					
				</View>
				<View className={styles.other}>
					<Text className={styles.title}>Other informations</Text>
					<Text className={styles.infos}>
						<Text className={styles.labelInfos}>Registered since : </Text> 
						<Text>{functions.formatDateTime(`${dates.createdAt}`)}</Text>
					</Text>
					<Text className={styles.infos}>
						<Text className={styles.labelInfos}>Last update : </Text>
						<Text>{functions.formatDateTime(`${dates.updatedAt}`)}</Text>
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = {
	area: "px-5 mb-[120px]",
	header: "flex flex-col gap-y-5 items-center py-10",
	title: "text-2xl font-JakartaBold self-start",
	imageProfile: "w-28 h-28 rounded-full",
	formular: "bg-general-500 rounded-xl shadow-lg shadow-general-100 px-5 mb-5 ",
	label: "w-full",
	input: "relative bg-general-100",
	iconInput: "absolute right-5 z-10",
	email: "flex flex-row items-center w-[100px] rounded-xl justify-center",
	emailVerified: "bg-green-300 text-black-500 border-2 border-success-500 w-[100px]",
	emailNotVerified: "bg-red-300 text-white border-2 border-red-500 w-[125px]",
	iconVerified: "w-6 h-6",
	textVerified: "text-sm font-JakartaSemiBold text-center",
	other: "flex flex-col gap-y-2",
	infos: "text-md",
	labelInfos: "font-JakartaSemiBold",
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