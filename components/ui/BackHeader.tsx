import { fontFamily } from "@/constants/theme";
import { useTheme } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type BackHeaderProps = {
    title: string;
};

export default function BackHeader({ title }: BackHeaderProps) {
    const { palette } = useTheme();

    return (
        <View style={styles.header}>
            <Pressable
                onPress={() => router.back()}
                style={({ pressed }) => [
                    styles.backBtn,
                    { opacity: pressed ? 0.7 : 1 },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Go back"
                hitSlop={8}
            >
                <View style={styles.backRow}>
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        color={palette.primaryLight}
                    />
                    <Text
                        style={[styles.backLabel, { color: palette.primaryLight }]}
                    >
                        Back
                    </Text>
                </View>
            </Pressable>
            <Text style={[styles.title, { color: palette.primary }]}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 20,
    },
    backBtn: {
        alignSelf: "flex-start",
        marginBottom: 12,
    },
    backRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    backLabel: {
        fontFamily: fontFamily.bold,
        fontSize: 17,
        lineHeight: 22,
        includeFontPadding: false,
    },
    title: {
        fontFamily: fontFamily.extraBold,
        fontSize: 32,
    },
});
