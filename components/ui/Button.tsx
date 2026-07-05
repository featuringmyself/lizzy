import { fontFamily, radii } from "@/constants/theme";
import { useTheme } from "@/providers/ThemeProvider";
import * as Haptics from "expo-haptics";
import {
    Pressable,
    StyleSheet,
    Text,
    type PressableProps,
    type StyleProp,
    type ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "accent";

type ButtonProps = PressableProps & {
    label: string;
    variant?: ButtonVariant;
    size?: "md" | "lg";
    fullWidth?: boolean;
    style?: StyleProp<ViewStyle>;
};

export default function Button({
    label,
    variant = "primary",
    size = "lg",
    fullWidth = true,
    onPress,
    disabled,
    style,
    ...rest
}: ButtonProps) {
    const { palette, hapticsEnabled } = useTheme();

    const handlePress: PressableProps["onPress"] = (event) => {
        if (hapticsEnabled) {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress?.(event);
    };

    const colors =
        variant === "accent"
            ? {
                  bg: palette.accent,
                  border: palette.primary,
                  text: palette.primary,
              }
            : variant === "primary"
              ? {
                    bg: palette.primary,
                    border: palette.primary,
                    text: palette.background,
                }
              : {
                    bg: palette.card,
                    border: palette.primaryLight,
                    text: palette.text,
                };

    const isShadow = variant !== "secondary";

    return (
        <Pressable
            onPress={handlePress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.base,
                size === "lg" ? styles.lg : styles.md,
                fullWidth && styles.fullWidth,
                isShadow && styles.primaryShadow,
                !isShadow && styles.secondary,
                {
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                    opacity: disabled ? 0.5 : pressed ? 0.88 : 1,
                },
                style,
            ]}
            accessibilityRole="button"
            accessibilityLabel={label}
            {...rest}
        >
            <Text
                style={[
                    styles.label,
                    size === "lg" ? styles.labelLg : styles.labelMd,
                    { color: colors.text },
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: radii.md,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    fullWidth: {
        alignSelf: "stretch",
    },
    lg: {
        height: 56,
        paddingHorizontal: 24,
    },
    md: {
        height: 48,
        paddingHorizontal: 16,
    },
    primaryShadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
    },
    secondary: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 1,
    },
    label: {
        fontFamily: fontFamily.bold,
    },
    labelLg: {
        fontSize: 18,
    },
    labelMd: {
        fontSize: 16,
    },
});
