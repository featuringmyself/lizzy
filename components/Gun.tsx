import { Image } from "expo-image";
import { useWindowDimensions, View } from "react-native";

export default function Gun() {
    const { width } = useWindowDimensions();
    const gunWidth = width * 0.75;
    const gunHeight = gunWidth * 0.6;

    return (
        <View
            className="absolute inset-x-0 bottom-0 items-center"
            pointerEvents="none"
        >
            <Image
                source={require("@/assets/images/gun.png")}
                style={{ width: gunWidth, height: gunHeight }}
                contentFit="contain"
                contentPosition="bottom"
            />
        </View>
    );
}
