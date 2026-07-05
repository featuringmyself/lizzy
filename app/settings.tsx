import BackHeader from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Screen, { fontFamily } from "@/components/ui/Screen";
import { radii, themes, type ThemeId } from "@/constants/theme";
import { useTheme } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
    const {
        palette,
        themeId,
        setThemeId,
        soundEnabled,
        hapticsEnabled,
        toggleSound,
        toggleHaptics,
    } = useTheme();

    const themeOptions: ThemeId[] = ["jungle", "desert", "urban"];

    return (
        <Screen>
            <BackHeader title="Settings" />

            <Card style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.rowLeft}>
                        <Ionicons
                            name="volume-high-outline"
                            size={22}
                            color={palette.primaryLight}
                        />
                        <Text style={[styles.rowLabel, { color: palette.text }]}>
                            Sound effects
                        </Text>
                    </View>
                    <Switch
                        value={soundEnabled}
                        onValueChange={toggleSound}
                        trackColor={{ false: "#D1D5DB", true: palette.primaryLight }}
                        thumbColor="#FFFFFF"
                    />
                </View>
                <View style={[styles.divider, { backgroundColor: palette.backgroundEnd }]} />
                <View style={styles.row}>
                    <View style={styles.rowLeft}>
                        <Ionicons
                            name="phone-portrait-outline"
                            size={22}
                            color={palette.primaryLight}
                        />
                        <Text style={[styles.rowLabel, { color: palette.text }]}>
                            Haptic feedback
                        </Text>
                    </View>
                    <Switch
                        value={hapticsEnabled}
                        onValueChange={toggleHaptics}
                        trackColor={{ false: "#D1D5DB", true: palette.primaryLight }}
                        thumbColor="#FFFFFF"
                    />
                </View>
            </Card>

            <Text style={[styles.sectionTitle, { color: palette.textMuted }]}>
                Theme
            </Text>
            <View style={styles.themeRow}>
                {themeOptions.map((id) => {
                    const theme = themes[id];
                    const selected = themeId === id;
                    return (
                        <Pressable
                            key={id}
                            onPress={() => setThemeId(id)}
                            style={[
                                styles.themeChip,
                                {
                                    backgroundColor: theme.primaryLight,
                                    borderColor: selected ? theme.accent : "transparent",
                                    borderWidth: selected ? 3 : 0,
                                },
                            ]}
                            accessibilityRole="button"
                            accessibilityLabel={`${theme.name} theme`}
                            accessibilityState={{ selected }}
                        >
                            <Text style={styles.themeChipText}>{theme.name}</Text>
                        </Pressable>
                    );
                })}
            </View>

            <View style={styles.footer}>
                <Button label="Done" variant="secondary" onPress={() => router.back()} />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 28,
        paddingVertical: 4,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
    },
    rowLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    rowLabel: {
        fontFamily: fontFamily.semiBold,
        fontSize: 16,
    },
    divider: {
        height: 1,
    },
    sectionTitle: {
        fontFamily: fontFamily.bold,
        fontSize: 13,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 12,
    },
    themeRow: {
        flexDirection: "row",
        gap: 10,
    },
    themeChip: {
        flex: 1,
        borderRadius: radii.md,
        paddingVertical: 16,
        alignItems: "center",
    },
    themeChipText: {
        fontFamily: fontFamily.bold,
        fontSize: 13,
        color: "#FFFFFF",
    },
    footer: {
        marginTop: "auto",
        paddingTop: 24,
    },
});
