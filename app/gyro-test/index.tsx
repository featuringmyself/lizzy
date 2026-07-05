import { EventSubscription } from "expo-modules-core";
import { Gyroscope } from "expo-sensors";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function GyroTest() {
    const [{ x, y, z }, setGyroscope] = useState({ x: 0, y: 0, z: 0 });
    const [subscription, setSubscription] = useState<EventSubscription | null>(null);


    const _slow = () => Gyroscope.setUpdateInterval(1000);
    const _fast = () => Gyroscope.setUpdateInterval(16);

    const _subscribe = () => {
        setSubscription(Gyroscope.addListener(gyroscopeData => setGyroscope(gyroscopeData)));
    }

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    }

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);


    return (
        <View className="flex-1 justify-center px-10">
            <Text className="text-center text-xl mb-4">Gyroscope Data:</Text>
            <Text>x: {x}</Text>
            <Text>y: {y}</Text>
            <Text>z: {z}</Text>

            <View className="flex-row items-stretch mt-14">
                <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} className="flex-1 justify-center items-center bg-[#eee] rounded-lg">
                    <Text>{subscription ? "On" : "Off"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_slow} className="flex-1 justify-center items-center bg-[#ccc] rounded-lg">
                    <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast} className="flex-1 justify-center items-center bg-[#eee] rounded-lg">
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}