import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScoreboardProps = {
    score: number;
    highScore: number;
};

const labelShadow = {
    textShadowColor: "rgba(0, 0, 0, 0.85)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
};

export default function Scoreboard({ score, highScore }: ScoreboardProps) {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="absolute left-0 right-0 flex-row items-start justify-between px-5"
            style={{ top: insets.top + 12 }}
            pointerEvents="none"
        >
            <View>
                <Text className="text-xs font-semibold uppercase tracking-widest text-white/70" style={labelShadow}>
                    Score
                </Text>
                <Text className="text-3xl font-bold text-white" style={labelShadow}>
                    {score}
                </Text>
            </View>
            <View className="items-end">
                <Text className="text-xs font-semibold uppercase tracking-widest text-white/70" style={labelShadow}>
                    Best
                </Text>
                <Text className="text-2xl font-bold text-white" style={labelShadow}>
                    {highScore}
                </Text>
            </View>
        </View>
    );
}
