import { useTheme } from "@/providers/ThemeProvider";
import { View } from "react-native";

const OUTER_SIZE = 120;
const INNER_SIZE = 44;
const SPOKE_COUNT = 8;
const SPOKE_LENGTH = 12;

export default function Crosshair() {
    const { palette } = useTheme();
    const ringColor = palette.crosshair;
    const accentColor = palette.crosshairAccent;

    return (
        <View className="absolute inset-0 items-center justify-center" pointerEvents="none">
            <View
                style={{
                    width: OUTER_SIZE,
                    height: OUTER_SIZE,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        position: "absolute",
                        width: OUTER_SIZE,
                        height: OUTER_SIZE,
                        borderRadius: OUTER_SIZE / 2,
                        borderWidth: 2.5,
                        borderColor: ringColor,
                    }}
                />

                {Array.from({ length: SPOKE_COUNT }).map((_, i) => (
                    <View
                        key={i}
                        style={{
                            position: "absolute",
                            width: SPOKE_LENGTH,
                            height: 2,
                            backgroundColor: accentColor,
                            transform: [
                                { rotate: `${(360 / SPOKE_COUNT) * i}deg` },
                                { translateX: OUTER_SIZE / 2 - SPOKE_LENGTH / 2 },
                            ],
                        }}
                    />
                ))}

                <View
                    style={{
                        position: "absolute",
                        width: INNER_SIZE,
                        height: INNER_SIZE,
                        borderRadius: INNER_SIZE / 2,
                        borderWidth: 1.5,
                        borderColor: accentColor,
                    }}
                />

                <View
                    style={{
                        position: "absolute",
                        width: OUTER_SIZE,
                        height: 1.5,
                        backgroundColor: ringColor,
                    }}
                />

                <View
                    style={{
                        position: "absolute",
                        width: 1.5,
                        height: OUTER_SIZE,
                        backgroundColor: ringColor,
                    }}
                />

                <View
                    style={{
                        position: "absolute",
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: accentColor,
                    }}
                />
            </View>
        </View>
    );
}
