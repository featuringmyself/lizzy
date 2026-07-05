import PlayButton from "@/components/ui/PlayButton";
import Screen, { fontFamily } from "@/components/ui/Screen";
import { radii } from "@/constants/theme";
import { LIZARD_POINTS } from "@/hooks/useScore";
import { useTheme } from "@/providers/ThemeProvider";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function GameOverScreen() {
    const { palette, hapticsEnabled } = useTheme();
    const params = useLocalSearchParams<{ score?: string; isNewBest?: string }>();
    const score = Number.parseInt(params.score ?? "0", 10) || 0;
    const isNewBest = params.isNewBest === "1";
    const hits = Math.floor(score / LIZARD_POINTS);

    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.hero}>
                    <Image
                        source={require("@/assets/gecko/0.png")}
                        style={styles.mascot}
                        contentFit="contain"
                    />

                    <Text style={[styles.heading, { color: palette.primary }]}>
                        Game Over
                    </Text>
                    <Text style={[styles.subtitle, { color: palette.textMuted }]}>
                        Too many lizards got away
                    </Text>

                    <View style={styles.stats}>
                        {isNewBest && (
                            <View
                                style={[
                                    styles.newBest,
                                    { backgroundColor: palette.accent },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.newBestText,
                                        { color: palette.primary },
                                    ]}
                                >
                                    New best score!
                                </Text>
                            </View>
                        )}

                        <Text style={[styles.score, { color: palette.primary }]}>
                            {score}
                        </Text>
                        <Text style={[styles.hits, { color: palette.textMuted }]}>
                            {hits} lizard{hits === 1 ? "" : "s"} caught
                        </Text>
                    </View>

                    <View style={styles.playWrap}>
                        <PlayButton
                            label="Play Again"
                            onPress={() => router.replace("/game")}
                        />
                    </View>
                </View>

                <Pressable
                    onPress={() => {
                        if (hapticsEnabled) {
                            void Haptics.impactAsync(
                                Haptics.ImpactFeedbackStyle.Light,
                            );
                        }
                        router.replace("/");
                    }}
                    style={({ pressed }) => [
                        styles.homeBtn,
                        { opacity: pressed ? 0.65 : 1 },
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel="Home"
                >
                    <Text style={[styles.homeLabel, { color: palette.primaryLight }]}>
                        Home
                    </Text>
                </Pressable>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    hero: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    mascot: {
        width: 100,
        height: 100,
        marginBottom: 16,
        opacity: 0.85,
    },
    heading: {
        fontFamily: fontFamily.extraBold,
        fontSize: 40,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontFamily: fontFamily.semiBold,
        fontSize: 16,
        marginTop: 6,
        textAlign: "center",
    },
    stats: {
        alignItems: "center",
        marginTop: 28,
    },
    newBest: {
        borderRadius: radii.pill,
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginBottom: 12,
    },
    newBestText: {
        fontFamily: fontFamily.bold,
        fontSize: 14,
    },
    score: {
        fontFamily: fontFamily.extraBold,
        fontSize: 72,
        lineHeight: 80,
        fontVariant: ["tabular-nums"],
        letterSpacing: -2,
    },
    hits: {
        fontFamily: fontFamily.semiBold,
        fontSize: 15,
        marginTop: 4,
    },
    playWrap: {
        marginTop: 32,
        alignItems: "center",
    },
    homeBtn: {
        alignSelf: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 4,
    },
    homeLabel: {
        fontFamily: fontFamily.bold,
        fontSize: 16,
    },
});
