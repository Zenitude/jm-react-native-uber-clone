/* eslint-disable prettier/prettier */
import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View } from "react-native";
import RideLayout from "@/components/RideLayout";
import {icons, functions } from "@/constants";
import { useDriverStore, useLocationStore } from "@/store";
import Payment from "@/components/Payment";

export default function BookRide() {
    const { user } = useUser();
    const { userAddress, destinationAddress } = useLocationStore();
    const { drivers, selectedDriver } = useDriverStore();

    const driverDetails = drivers?.filter(
        (driver) => +driver.id! === selectedDriver,
    )[0];

    return (
        <RideLayout title="Book Ride">
            <>
                <Text className={styles.title}>
                    Ride Information
                </Text>

                <View className={styles.containerDriver}>
                    <Image
                        source={{uri: driverDetails?.profile_image_url}}
                        className={styles.iconProfileDriver}
                    />

                    <View className={styles.titleAndStars}>
                        <Text className={styles.titleDriver}>
                            {driverDetails?.title}
                        </Text>

                        <View className={styles.starsDriver}>
                            <Image
                                source={icons.star}
                                className={styles.iconStars}
                                resizeMode="contain"
                            />
                            <Text className={styles.ratingStars}>
                                {driverDetails?.rating}
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    className={styles.priceTimeSeats}>
                    <View className={styles.subContainer}>
                        <Text className={styles.label}>Ride Price</Text>
                        <Text className={`${styles.subLabel} ${styles.price}`}>
                            ${driverDetails?.price || 60}
                        </Text>
                    </View>

                    <View className={styles.subContainer}>
                        <Text className={styles.label}>Pickup Time</Text>
                        <Text className={styles.subLabel}>
                            {functions.formatDateTime(driverDetails?.time! || 5)}
                        </Text>
                    </View>

                    <View className={styles.containerSeats}>
                        <Text className={styles.label}>Car Seats</Text>
                        <Text className={styles.subLabel}>
                            {driverDetails?.car_seats}
                        </Text>
                    </View>
                </View>

                <View className={styles.containerLocations}>
                    <View
                        className={styles.containerUserLocation}>
                        <Image source={icons.to} className={styles.iconLocations}/>
                        <Text className={styles.locations}>
                            {userAddress}
                        </Text>
                    </View>

                    <View className={styles.containerDestinationLocation}>
                        <Image source={icons.point} className={styles.iconLocations}/>
                        <Text className={styles.locations}>
                            {destinationAddress}
                        </Text>
                    </View>
                </View>
								
								<Payment />
            </>
        </RideLayout>
    )
}

const styles = {
	title: "text-xl font-JakartaSemiBold mb-3",
	containerDriver: "flex flex-col w-full items-center justify-center mt-10",
	iconProfileDriver: "w-28 h-28 rounded-full",
	titleAndStars: "flex flex-row items-center justify-center mt-5 space-x-2",
	titleDriver: "text-lg font-JakartaSemiBold",
	starsDriver: "flex flex-row items-center space-x-0.5",
	iconStars: "w-5 h-5",
	ratingStars: "text-lg font-JakartaRegular",
	priceTimeSeats: "flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5",
	subContainer: "flex flex-row items-center justify-between w-full border-b border-white py-3",
	label: "text-lg font-JakartaRegular",
	subLabel: "text-lg font-JakartaRegular",
	price: "text-[#0CC25F]",
	containerSeats: "flex flex-row items-center justify-between w-full py-3",
	containerLocations: "flex flex-col w-full items-start justify-center mt-5",
	containerUserLocation: "flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3",
	containerDestinationLocation: "flex flex-row items-center justify-start border-b border-general-700 w-full py-3",
	iconLocations: "w-6 h-6",
	locations: "text-lg font-JakartaRegular ml-2",
}