import { View } from "react-native";

const RETICLE_COLOR = "rgba(255, 255, 255, 0.9)";
const OUTER_SIZE = 150;
const INNER_SIZE = 54;

// Number of radial "spider-web" spokes around the ring.
const SPOKE_COUNT = 12;
const SPOKE_LENGTH = 14;

export default function Crosshair() {
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
                {/* Outer scope ring */}
                <View
                    style={{
                        position: "absolute",
                        width: OUTER_SIZE,
                        height: OUTER_SIZE,
                        borderRadius: OUTER_SIZE / 2,
                        borderWidth: 2,
                        borderColor: RETICLE_COLOR,
                    }}
                />

                {/* Radial spokes — the "spider-web" look */}
                {Array.from({ length: SPOKE_COUNT }).map((_, i) => (
                    <View
                        key={i}
                        style={{
                            position: "absolute",
                            width: SPOKE_LENGTH,
                            height: 2,
                            backgroundColor: RETICLE_COLOR,
                            transform: [
                                { rotate: `${(360 / SPOKE_COUNT) * i}deg` },
                                { translateX: OUTER_SIZE / 2 - SPOKE_LENGTH / 2 },
                            ],
                        }}
                    />
                ))}

                {/* Inner ring */}
                <View
                    style={{
                        position: "absolute",
                        width: INNER_SIZE,
                        height: INNER_SIZE,
                        borderRadius: INNER_SIZE / 2,
                        borderWidth: 1,
                        borderColor: RETICLE_COLOR,
                    }}
                />

                {/* Horizontal crosshair line */}
                <View
                    style={{
                        position: "absolute",
                        width: OUTER_SIZE,
                        height: 1.5,
                        backgroundColor: RETICLE_COLOR,
                    }}
                />

                {/* Vertical crosshair line */}
                <View
                    style={{
                        position: "absolute",
                        width: 1.5,
                        height: OUTER_SIZE,
                        backgroundColor: RETICLE_COLOR,
                    }}
                />

                {/* Center gap so the exact aim point stays visible */}
                <View
                    style={{
                        position: "absolute",
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: RETICLE_COLOR,
                    }}
                />

                {/* Center aim dot */}
                <View
                    style={{
                        position: "absolute",
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: RETICLE_COLOR,
                    }}
                />
            </View>
        </View>
    );
}
