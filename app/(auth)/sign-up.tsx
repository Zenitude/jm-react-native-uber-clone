import { Text, ScrollView, View, Image, Alert } from "react-native"
import { images, icons } from "@/constants"
import { Link, router } from "expo-router"
import { useState } from "react"
import { useSignUp } from "@clerk/clerk-expo"
import Button from "@/components/Button"
import InputField from "@/components/InputField"
import OAuth from "@/components/OAuth"
import { ReactNativeModal } from "react-native-modal"
import { fetchAPI } from "@/lib/fetch"

export default function SignUp() {
	const { isLoaded, signUp, setActive } = useSignUp()
	const [showSuccessModal, setShowSuccessModal] = useState(false)

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirm: "",
	})

	const [verification, setVerification] = useState({
		state: "default",
		error: "",
		code: "",
	})

	const onSignUpPress = async () => {
		if (!isLoaded) {
			return
		}

		try {
			await signUp.create({
				emailAddress: form.email,
				password: form.password,
			})

			await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

			setVerification({ ...verification, state: "pending" })
		} catch (err: any) {
			Alert.alert("Error", err.errors[0].longMessage)
		}
	}

	const onPressVerify = async () => {
		if (!isLoaded) return

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code: verification.code,
			})

			if (completeSignUp.status === "complete") {
				await fetchAPI("/(api)/user", {
					method: "POST",
					body: JSON.stringify({
						name: form.name,
						email: form.email,
						clerkId: completeSignUp.createdUserId,
					}),
				})

				await setActive({ session: completeSignUp.createdSessionId })
				setVerification({ ...verification, state: "success" })
			} else {
				setVerification({
					...verification,
					error: "Verification failed.",
					state: "failed",
				})
			}
		} catch (err: any) {
			setVerification({
				...verification,
				error: err.errors[0].longMessage,
				state: "failed",
			})
		}
	}

	return (
		<ScrollView className={styles.scroll}>
			<View className={styles.container}>
				<View className={styles.containerImage}>
					<Image
						source={images.signupCar}
						resizeMode={"cover"}
						className={styles.image}
					/>
					<Text className={styles.legend}>Create Your Account</Text>
				</View>

				<View className={styles.containerField}>
					<InputField
						label={"Name"}
						labelStyle={""}
						placeholder={"Enter your name"}
						icon={icons.person}
						iconStyle={""}
						inputStyle={""}
						secureTextEntry={false}
						value={form.name}
						onChangeText={(value: string) => setForm({ ...form, name: value })}
						keyboardType={"default"}
					/>
					<InputField
						label={"Email"}
						labelStyle={""}
						placeholder={"Enter your email"}
						icon={icons.email}
						iconStyle={""}
						inputStyle={""}
						secureTextEntry={false}
						value={form.email}
						onChangeText={(value: string) => setForm({ ...form, email: value })}
						keyboardType={"email-address"}
					/>
					<InputField
						label={"Password"}
						labelStyle={""}
						placeholder={"Enter your password"}
						icon={icons.lock}
						iconStyle={""}
						inputStyle={""}
						secureTextEntry={true}
						value={form.password}
						onChangeText={(value: string) =>
							setForm({ ...form, password: value })
						}
						keyboardType={"default"}
					/>
					<InputField
						label={"Confirm"}
						labelStyle={""}
						placeholder={"Confirm your password"}
						icon={icons.lock}
						iconStyle={""}
						inputStyle={""}
						secureTextEntry={true}
						value={form.confirm}
						onChangeText={(value: string) =>
							setForm({ ...form, confirm: value })
						}
						keyboardType={"default"}
					/>

					<Button
						type={"text"}
						styles={stylesButton}
						variantStyles={stylesButtonVariant}
						action={onSignUpPress}
						textButton={"Sign Up"}
					/>

					<OAuth />

					<Link href={"/sign-in"} className={styles.account}>
						<Text>Already have an account ? </Text>
						<Text className={styles.link}>Log In</Text>
					</Link>
				</View>

				<ReactNativeModal
					isVisible={verification.state === "pending"}
					onModalHide={() => {
						if (verification.state === "success") setShowSuccessModal(true)
					}}
				>
					<View className={styles.containerModal}>
						<Text className={styles.textModalVerification}>Verification</Text>
						<Text className={styles.textModal}>
							We've se,t a verification code to {form.email}
						</Text>
						<InputField
							label={"Code"}
							labelStyle={""}
							icon={icons.lock}
							placeholder="12345"
							value={verification.code}
							keyboardType={"numeric"}
							iconStyle={""}
							inputStyle={""}
							onChangeText={(code) =>
								setVerification({ ...verification, code: code })
							}
							secureTextEntry={false}
						/>

						{verification.error && (
							<Text className={styles.textError}>{verification.error}</Text>
						)}

						<Button
							type={"text"}
							styles={stylesButton}
							variantStyles={stylesButtonVariant}
							action={onPressVerify}
							textButton={"Verify Email"}
						/>
					</View>
				</ReactNativeModal>

				<ReactNativeModal isVisible={showSuccessModal}>
					<View className={styles.containerModal}>
						<Image
							source={images.check}
							resizeMode="contain"
							className={styles.iconCheckModal}
						/>
						<Text className={styles.textModalVerify}>Verify</Text>

						<Text className={styles.textModalMessage}>
							You have successfully verified your account.
						</Text>

						<Button
							type={"text"}
							styles={stylesButton}
							variantStyles={stylesButtonVariant}
							action={() => {
								setShowSuccessModal(false)
								router.replace("/(root)/(tabs)/home")
							}}
							textButton={"Browse Home"}
						/>
					</View>
				</ReactNativeModal>
			</View>
		</ScrollView>
	)
}

const styles = {
	scroll: "flex-1 bg-white",
	container: "flex-1 bg-white",
	containerImage: "relative w-full h-[150px]",
	image: "z-0 w-full h-[150px]",
	legend: "text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5",
	containerField: "p-0 px-5",
	account: "text-lg text-center text-general-200",
	link: "text-primary-500",
	containerModal: "bg-white px-7 py-9 rounded-2xl min-h-[300px]",
	textModalVerification: "text-2xl font-JakartaExtraBold mb-2 ",
	textModal: "font-JakartaLight mb-5",
	textError: "text-red-500 text-sm mt-1",
	iconCheckModal: "w-[110px] h-[110px] mx-auto my-5",
	textModalVerify: "text-3xl font-JakartaBold text-center",
	textModalMessage:
		"text-base text-gray-400 font-JakartaLight text-center mt-2",
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
