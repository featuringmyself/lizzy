import Button from "@/components/ui/Button";
import Screen, { fontFamily } from "@/components/ui/Screen";
import { radii } from "@/constants/theme";
import { useScore } from "@/hooks/useScore";
import { useTheme } from "@/providers/ThemeProvider";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
    const { highScore, loaded } = useScore();
    const { palette } = useTheme();

    if (!loaded) {
        return (
            <Screen>
                <View style={styles.loading}>
                    <ActivityIndicator color={palette.primaryLight} size="large" />
                </View>
            </Screen>
        );
    }

    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.hero}>
                    <Image
                        source={require("@/assets/gecko/0.png")}
                        style={styles.mascot}
                        contentFit="contain"
                    />
                    <Text style={[styles.title, { color: palette.primary }]}>
                        Lizzy
                    </Text>
                    <Text style={[styles.subtitle, { color: palette.textMuted }]}>
                        Hunt lizards on your wall
                    </Text>
                    {highScore > 0 && (
                        <View
                            style={[
                                styles.bestBadge,
                                { backgroundColor: palette.accent },
                            ]}
                        >
                            <Text
                                style={[styles.bestText, { color: palette.primary }]}
                            >
                                Best score · {highScore}
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.footer}>
                    <Button
                        label="Play"
                        onPress={() => router.push("/game")}
                    />
                    <View style={styles.secondaryRow}>
                        <Button
                            label="Bestiary"
                            variant="secondary"
                            size="md"
                            style={styles.halfBtn}
                            onPress={() => router.push("/bestiary")}
                        />
                        <Button
                            label="Settings"
                            variant="secondary"
                            size="md"
                            style={styles.halfBtn}
                            onPress={() => router.push("/settings")}
                        />
                    </View>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
    },
    hero: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 24,
    },
    mascot: {
        width: 140,
        height: 140,
        marginBottom: 12,
    },
    title: {
        fontFamily: fontFamily.extraBold,
        fontSize: 48,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontFamily: fontFamily.semiBold,
        fontSize: 16,
        marginTop: 6,
    },
    bestBadge: {
        borderRadius: radii.pill,
        paddingHorizontal: 18,
        paddingVertical: 8,
        marginTop: 20,
    },
    bestText: {
        fontFamily: fontFamily.bold,
        fontSize: 15,
    },
    footer: {
        gap: 12,
        paddingBottom: 8,
    },
    secondaryRow: {
        flexDirection: "row",
        gap: 12,
    },
    halfBtn: {
        flex: 1,
    },
});
