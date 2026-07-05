import BackHeader from "@/components/ui/BackHeader";
import Card from "@/components/ui/Card";
import Screen, { fontFamily } from "@/components/ui/Screen";
import { LIZARD_TYPES, useBestiary } from "@/hooks/useBestiary";
import { useTheme } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function BestiaryScreen() {
    const { palette } = useTheme();
    const { isUnlocked, encounters } = useBestiary();

    return (
        <Screen padded={false}>
            <View style={styles.headerWrap}>
                <BackHeader title="Bestiary" />
            </View>

            <ScrollView
                contentContainerStyle={styles.grid}
                showsVerticalScrollIndicator={false}
            >
                {LIZARD_TYPES.map((lizard) => {
                    const unlocked = isUnlocked(lizard.id);
                    const count = encounters[lizard.id] ?? 0;

                    return (
                        <Card key={lizard.id} style={styles.cell}>
                            {unlocked ? (
                                <Image
                                    source={require("@/assets/gecko/0.png")}
                                    style={styles.sprite}
                                    contentFit="contain"
                                />
                            ) : (
                                <View
                                    style={[
                                        styles.lockedSprite,
                                        { backgroundColor: palette.backgroundEnd },
                                    ]}
                                >
                                    <Ionicons
                                        name="lock-closed"
                                        size={28}
                                        color={palette.textMuted}
                                    />
                                </View>
                            )}
                            <Text
                                style={[
                                    styles.name,
                                    {
                                        color: unlocked
                                            ? palette.text
                                            : palette.textMuted,
                                    },
                                ]}
                            >
                                {unlocked ? lizard.name : "Unknown"}
                            </Text>
                            {unlocked && (
                                <Text
                                    style={[styles.desc, { color: palette.textMuted }]}
                                >
                                    {lizard.description}
                                </Text>
                            )}
                            {unlocked && count > 0 && (
                                <Text
                                    style={[styles.count, { color: palette.primaryLight }]}
                                >
                                    Caught · {count}
                                </Text>
                            )}
                        </Card>
                    );
                })}
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    headerWrap: {
        paddingHorizontal: 24,
    },
    grid: {
        paddingHorizontal: 24,
        paddingBottom: 32,
        gap: 12,
    },
    cell: {
        marginBottom: 0,
    },
    sprite: {
        width: 72,
        height: 72,
        alignSelf: "center",
        marginBottom: 10,
    },
    lockedSprite: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    name: {
        fontFamily: fontFamily.bold,
        fontSize: 18,
        textAlign: "center",
    },
    desc: {
        fontFamily: fontFamily.semiBold,
        fontSize: 13,
        textAlign: "center",
        marginTop: 4,
        lineHeight: 18,
    },
    count: {
        fontFamily: fontFamily.bold,
        fontSize: 12,
        textAlign: "center",
        marginTop: 8,
    },
});
