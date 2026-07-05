import { Image } from "expo-image";
import { View } from "react-native";

export default function LizardSprite() {
    return (
        <View className="absolute inset-0 items-center justify-center">
            <Image
                source={require("@/assets/gecko/1.png")}
                style={{ width: 250, height: 250 }}
                contentFit="contain"
            />
        </View>
    );
}