import { Text, ScrollView, View, Image } from "react-native"
import { images, icons } from "@/constants"
import { Link } from "expo-router"
import { useState } from "react"
import Button from "@/components/Button"
import InputField from "@/components/InputField"
import OAuth from "@/components/OAuth"

export default function SignIn() {
	const [from, setForm] = useState({
		email: "",
		password: "",
	})

	const onSignInPress = async () => {}

	return (
		<ScrollView className={styles.scroll}>
			<View className={styles.container}>
				<View className={styles.containerImage}>
					<Image
						source={images.signupCar}
						resizeMode={"cover"}
						className={styles.image}
					/>
					<Text className={styles.legend}>Welcome</Text>
				</View>

				<View className={styles.containerField}>
					<InputField
						label={"Email"}
						labelStyle={""}
						placeholder={"Enter your email"}
						icon={icons.email}
						iconStyle={""}
						inputStyle={""}
						secureTextEntry={false}
						value={from.email}
						onChangeText={(value: string) => setForm({ ...from, email: value })}
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
						value={from.password}
						onChangeText={(value: string) =>
							setForm({ ...from, password: value })
						}
						keyboardType={"default"}
					/>

					<Button
						type={"text"}
						styles={stylesButton}
						variantStyles={stylesButtonVariant}
						action={onSignInPress}
						textButton={"Sign In"}
					/>

					<OAuth />

					<Link href={"/sign-up"} className={styles.account}>
						<Text>Don't have an account ? </Text>
						<Text className={styles.link}>Sign Up</Text>
					</Link>
				</View>
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
}

const stylesButton = {
	container:
		"w-full rounded-full flex flex-row p-3 shadow-md shadow-neutral-400/70 mb-10 mt-5",
	button: "w-full justify-center items-center",
	text: "text-lg font-bold",
}

const stylesButtonVariant = {
	container: "", //functions.getBgVariantStyle("primary"),
	text: "", //functions.getTextVariantStyle("default"),
}
