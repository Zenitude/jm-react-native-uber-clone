import { View, Text, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState, useRef } from "react"
import { router } from "expo-router"
import Swiper from "react-native-swiper"
import Button from "@/components/Button"
import { onBoarding } from "@/constants"

export default function Onboarding() {
	const swiperRef = useRef<Swiper>(null)
	const [activeIndex, setActiveIndex] = useState(0)
	const isLastSlide = activeIndex === onBoarding.length - 1

	return (
		<SafeAreaView className={styles.area}>
			<Button
				type={"text"}
				styles={stylesSkipButton}
				action={() => router.replace("/(auth)/sign-up")}
				textButton={"Skip"}
			/>
			<Swiper
				ref={swiperRef}
				loop={false}
				dot={<View className={stylesSwiper.dot} />}
				activeDot={<View className={stylesSwiper.activeDot} />}
				onIndexChanged={(index) => setActiveIndex(index)}
			>
				{onBoarding.map((item, index) => (
					<View key={`${index}-${item.id}`} className={stylesSwiper.container}>
						<Image
							source={item.image}
							resizeMode="contain"
							className={stylesSwiper.image}
						/>
						<View className={stylesSwiper.viewText}>
							<Text className={stylesSwiper.text}>{item.title}</Text>
						</View>
						<Text className={stylesSwiper.desc}>{item.description}</Text>
					</View>
				))}
			</Swiper>
			<Button
				type={"text"}
				styles={stylesSwitchButton}
				variantStyles={stylesSwitchVariant}
				action={() =>
					isLastSlide
						? router.replace("/(auth)/sign-up")
						: swiperRef.current?.scrollBy(1)
				}
				textButton={isLastSlide ? "Get Started" : "Next"}
			/>
		</SafeAreaView>
	)
}

const styles = {
	area: "flex h-full items-center justify-between bg-white",
}

const stylesSwiper = {
	dot: "w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full",
	activeDot: "w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full",
	container: "flex items-center justify-center p-5",
	image: "w-full h-[300px]",
	viewText: "flex flex-row items-center justify-center w-full mt-10",
	text: "text-black text-3xl font-bold mx-10 text-center",
	desc: "text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3",
}

const stylesSkipButton = {
	container: "w-full flex items-end justify-end p-5",
	text: "text-black text-md font-JakartaBold",
}

const stylesSwitchButton = {
	container: `w-full rounded-full flex flex-row p-3 shadow-md shadow-neutral-400/70 w-11/12 mb-10 mt-5`,
	button: `w-full justify-center items-center`,
	text: `text-lg font-bold`,
}

const stylesSwitchVariant = {
	container: "", //functions.getBgVariantStyle("primary"),
	text: "", //functions.getTextVariantStyle("default"),
}
