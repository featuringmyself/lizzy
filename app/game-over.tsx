import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Screen, { fontFamily } from "@/components/ui/Screen";
import { radii } from "@/constants/theme";
import { LIZARD_POINTS } from "@/hooks/useScore";
import { useTheme } from "@/providers/ThemeProvider";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function GameOverScreen() {
    const { palette } = useTheme();
    const params = useLocalSearchParams<{ score?: string; isNewBest?: string }>();
    const score = Number.parseInt(params.score ?? "0", 10) || 0;
    const isNewBest = params.isNewBest === "1";
    const hits = Math.floor(score / LIZARD_POINTS);

    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={[styles.heading, { color: palette.primary }]}>
                        Game Over
                    </Text>

                    <Card style={styles.card}>
                        <Text style={[styles.scoreLabel, { color: palette.textMuted }]}>
                            Final Score
                        </Text>
                        <Text style={[styles.score, { color: palette.primaryLight }]}>
                            {score}
                        </Text>
                        <Text style={[styles.hits, { color: palette.textMuted }]}>
                            {hits} lizard{hits === 1 ? "" : "s"} caught
                        </Text>

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
                                    New Best!
                                </Text>
                            </View>
                        )}
                    </Card>
                </View>

                <View style={styles.footer}>
                    <View style={styles.btnWrap}>
                        <Button
                            label="Play Again"
                            variant="accent"
                            onPress={() => router.replace("/game")}
                        />
                    </View>
                    <View style={styles.btnWrap}>
                        <Button
                            label="Home"
                            variant="secondary"
                            onPress={() => router.replace("/")}
                        />
                    </View>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        fontFamily: fontFamily.extraBold,
        fontSize: 36,
        marginBottom: 24,
    },
    card: {
        width: "100%",
        alignItems: "center",
    },
    scoreLabel: {
        fontFamily: fontFamily.semiBold,
        fontSize: 14,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    score: {
        fontFamily: fontFamily.extraBold,
        fontSize: 64,
        marginVertical: 4,
    },
    hits: {
        fontFamily: fontFamily.semiBold,
        fontSize: 15,
    },
    newBest: {
        borderRadius: radii.pill,
        paddingHorizontal: 14,
        paddingVertical: 5,
        marginTop: 12,
    },
    newBestText: {
        fontFamily: fontFamily.bold,
        fontSize: 14,
    },
    footer: {
        marginTop: "auto",
        width: "100%",
        paddingTop: 24,
    },
    btnWrap: {
        width: "100%",
        marginBottom: 12,
    },
});
