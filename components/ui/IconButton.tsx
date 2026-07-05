import { useTheme } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, type PressableProps, type StyleProp, type ViewStyle } from "react-native";

type IconButtonProps = PressableProps & {
    name: React.ComponentProps<typeof Ionicons>["name"];
    accessibilityLabel: string;
    size?: number;
    color?: string;
    filled?: boolean;
    style?: StyleProp<ViewStyle>;
};

export default function IconButton({
    name,
    accessibilityLabel,
    size = 22,
    color,
    filled = false,
    onPress,
    style,
    ...rest
}: IconButtonProps) {
    const { hapticsEnabled } = useTheme();
    const iconColor = color ?? "#FFFFFF";

    const handlePress: PressableProps["onPress"] = (event) => {
        if (hapticsEnabled) {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress?.(event);
    };

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
                filled ? styles.filled : styles.ghost,
                { opacity: pressed ? 0.75 : 1 },
                style,
            ]}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            hitSlop={8}
            {...rest}
        >
            <Ionicons name={name} size={size} color={iconColor} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    filled: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(0,0,0,0.35)",
        alignItems: "center",
        justifyContent: "center",
    },
    ghost: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
});
