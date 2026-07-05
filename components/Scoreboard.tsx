import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScoreboardProps = {
    score: number;
    highScore: number;
};

const SHADOW = {
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
};

export default function Scoreboard({ score, highScore }: ScoreboardProps) {
    const insets = useSafeAreaInsets();
    const scale = useSharedValue(1);

    useEffect(() => {
        if (score === 0) return;
        scale.value = withSequence(
            withSpring(1.12, { damping: 8, stiffness: 400 }),
            withSpring(1, { damping: 12, stiffness: 300 }),
        );
    }, [score, scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <View
            style={[styles.container, { top: insets.top + 6, left: 18 }]}
            pointerEvents="none"
        >
            <Animated.View style={animatedStyle}>
                <Text style={[styles.score, SHADOW]}>{score}</Text>
            </Animated.View>
            <Text style={[styles.best, SHADOW]}>BEST {highScore}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        alignItems: "flex-start",
    },
    score: {
        color: "#FFFFFF",
        fontSize: 40,
        fontWeight: "800",
        fontVariant: ["tabular-nums"],
        letterSpacing: -1,
    },
    best: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 11,
        fontWeight: "600",
        letterSpacing: 1.5,
        fontVariant: ["tabular-nums"],
        marginTop: 1,
    },
});
