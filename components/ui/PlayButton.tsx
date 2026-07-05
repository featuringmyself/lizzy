import { fontFamily, radii } from "@/constants/theme";
import { useTheme } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PlayButtonProps = {
    onPress: () => void;
    label?: string;
};

export default function PlayButton({ onPress, label = "Play" }: PlayButtonProps) {
    const { palette, hapticsEnabled } = useTheme();

    return (
        <Pressable
            onPress={() => {
                if (hapticsEnabled) {
                    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
                onPress();
            }}
            style={({ pressed }) => [
                styles.btn,
                {
                    backgroundColor: palette.accent,
                    borderColor: palette.primary,
                    shadowColor: palette.primary,
                    opacity: pressed ? 0.9 : 1,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                },
            ]}
            accessibilityRole="button"
            accessibilityLabel={label}
        >
            <View style={styles.row}>
                <Ionicons name="play" size={20} color={palette.primary} />
                <Text style={[styles.label, { color: palette.primary }]}>{label}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn: {
        height: 64,
        minWidth: 220,
        paddingHorizontal: 40,
        borderRadius: radii.pill,
        borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.22,
        shadowRadius: 10,
        elevation: 6,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    label: {
        fontFamily: fontFamily.extraBold,
        fontSize: 22,
        lineHeight: 26,
        letterSpacing: 0.3,
        includeFontPadding: false,
    },
});
