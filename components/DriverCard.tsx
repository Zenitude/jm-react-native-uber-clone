/* eslint-disable prettier/prettier */
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { functions, icons } from "@/constants"
import { DriverCardProps } from "@/types/global";

export default function DriverCard({item, selected, setSelected}: DriverCardProps) {
    return (
        <TouchableOpacity
            onPress={setSelected}
            className={`${
                selected === item.id ? styles.selectedDriver : styles.notSelectedDriver
            } ${styles.selectDriver}`}
        >
            <Image
                source={{uri: item.profile_image_url}}
                className={styles.iconProfile}
            />

            <View className={styles.details}>
                <View className={styles.titleAndStars}>
                    <Text className={styles.title}>{item.title}</Text>

                    <View className={styles.containerStars}>
                        <Image source={icons.star} className={styles.iconStars}/>
                        <Text className={styles.textStars}>4</Text>
                    </View>
                </View>

                <View className={styles.priceTimeSeats}>
                    <View className={styles.containerPrice}>
                        <Image source={icons.dollar} className={styles.iconDollar}/>
                        <Text className={styles.textPrice}>
                            ${item.price || 60}
                        </Text>
                    </View>

                    <Text className={styles.separator}>
                        |
                    </Text>

                    <Text className={styles.time}>
                        {functions.formatDateTime(parseInt(`${item.time}`) || 5)}
                    </Text>

                    <Text className={styles.separator}>
                        |
                    </Text>

                    <Text className={styles.seats}>
                        {item.car_seats} seats
                    </Text>
                </View>
            </View>

            <Image
                source={{uri: item.car_image_url}}
                className={styles.iconCar}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};

const styles = {
  selectDriver: "flex flex-row items-center justify-between py-5 px-3 rounded-xl",
  selectedDriver: "bg-general-600",
  notSelectedDriver: "bg-white",
  iconProfile: "w-14 h-14 rounded-full",
  details: "flex-1 flex flex-col items-start justify-center mx-3",
  titleAndStars: "flex flex-row items-center justify-start mb-1",
  title: "text-lg font-JakartaRegular",
  containerStars: "flex flex-row items-center space-x-1 ml-2",
  iconStars: "w-3.5 h-3.5",
  textStars: "text-sm font-JakartaRegular",
  priceTimeSeats: "flex flex-row items-center justify-start",
  containerPrice: "flex flex-row items-center",
  iconDollar: "w-4 h-4",
  textPrice: "text-sm font-JakartaRegular ml-1",
  separator: "text-sm font-JakartaRegular text-general-800 mx-1",
  time: "text-sm font-JakartaRegular text-general-800",
  seats: "text-sm font-JakartaRegular text-general-800",
  iconCar: "h-14 w-14"
}