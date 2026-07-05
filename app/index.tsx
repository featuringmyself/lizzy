import PlayButton from "@/components/ui/PlayButton";
import Screen, { fontFamily } from "@/components/ui/Screen";
import IconButton from "@/components/ui/IconButton";
import { radii } from "@/constants/theme";
import { useScore } from "@/hooks/useScore";
import { useTheme } from "@/providers/ThemeProvider";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
    const { highScore, loaded } = useScore();
    const { palette, hapticsEnabled } = useTheme();

    if (!loaded) {
        return (
            <Screen>
                <View style={styles.loading}>
                    <ActivityIndicator color={palette.primaryLight} size="large" />
                </View>
            </Screen>
        );
    }

    const goToBestiary = () => router.push("/bestiary");
    const goToSettings = () => router.push("/settings");

    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <Pressable
                        onPress={() => {
                            if (hapticsEnabled) {
                                void Haptics.impactAsync(
                                    Haptics.ImpactFeedbackStyle.Light,
                                );
                            }
                            goToBestiary();
                        }}
                        style={({ pressed }) => [
                            styles.edgeBtn,
                            { opacity: pressed ? 0.65 : 1 },
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel="Bestiary"
                    >
                        <Text style={[styles.edgeLabel, { color: palette.primaryLight }]}>
                            Bestiary
                        </Text>
                    </Pressable>

                    <IconButton
                        name="settings-outline"
                        accessibilityLabel="Settings"
                        color={palette.primaryLight}
                        onPress={goToSettings}
                    />
                </View>

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
                                { backgroundColor: palette.backgroundEnd },
                            ]}
                        >
                            <Text
                                style={[styles.bestText, { color: palette.textMuted }]}
                            >
                                Best · {highScore}
                            </Text>
                        </View>
                    )}

                    <View style={styles.playWrap}>
                        <PlayButton onPress={() => router.push("/game")} />
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
        width: "100%",
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    edgeBtn: {
        paddingVertical: 8,
        paddingRight: 8,
    },
    edgeLabel: {
        fontFamily: fontFamily.bold,
        fontSize: 16,
    },
    hero: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
        textAlign: "center",
    },
    bestBadge: {
        borderRadius: radii.pill,
        paddingHorizontal: 14,
        paddingVertical: 5,
        marginTop: 12,
    },
    bestText: {
        fontFamily: fontFamily.bold,
        fontSize: 14,
    },
    playWrap: {
        marginTop: 32,
        alignItems: "center",
    },
});
