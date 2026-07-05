import IconButton from "@/components/ui/IconButton";
import { fontFamily, radii } from "@/constants/theme";
import { STARTING_LIVES } from "@/hooks/useGameState";
import { useTheme } from "@/providers/ThemeProvider";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type GameHUDProps = {
    score: number;
    lives: number;
    onPause: () => void;
};

const SHADOW = {
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
};

export default function GameHUD({ score, lives, onPause }: GameHUDProps) {
    const insets = useSafeAreaInsets();
    const { palette } = useTheme();
    const scale = useSharedValue(1);
    const escapes = STARTING_LIVES - lives;

    useEffect(() => {
        if (score === 0) return;
        scale.value = withSequence(
            withSpring(1.08, { damping: 8, stiffness: 400 }),
            withSpring(1, { damping: 12, stiffness: 300 }),
        );
    }, [score, scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <View style={[styles.bar, { top: insets.top + 10 }]} pointerEvents="box-none">
            <View style={styles.left} pointerEvents="none">
                <View
                    style={[
                        styles.pill,
                        { borderColor: palette.crosshairAccent },
                    ]}
                >
                    <Text style={[styles.pillLabel, SHADOW]}>Score</Text>
                    <Animated.Text style={[styles.score, SHADOW, animatedStyle]}>
                        {score}
                    </Animated.Text>
                </View>
                <Text style={[styles.escapes, SHADOW]}>
                    Escaped {escapes}/{STARTING_LIVES}
                </Text>
            </View>

            <IconButton
                name="close"
                accessibilityLabel="Quit game"
                onPress={onPause}
                filled
            />
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        position: "absolute",
        left: 20,
        right: 20,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    left: {
        alignItems: "flex-start",
        gap: 4,
    },
    pill: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 8,
        borderRadius: radii.pill,
        borderWidth: 2,
        backgroundColor: "rgba(0,0,0,0.3)",
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    pillLabel: {
        color: "rgba(255,255,255,0.75)",
        fontSize: 13,
        fontFamily: fontFamily.semiBold,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    score: {
        color: "#FFFFFF",
        fontSize: 26,
        fontFamily: fontFamily.extraBold,
        fontVariant: ["tabular-nums"],
    },
    escapes: {
        color: "rgba(255,255,255,0.85)",
        fontSize: 13,
        fontFamily: fontFamily.semiBold,
        marginLeft: 4,
    },
});
