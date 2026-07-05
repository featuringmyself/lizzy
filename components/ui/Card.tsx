import { fontFamily, radii } from "@/constants/theme";
import { useTheme } from "@/providers/ThemeProvider";
import { type ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type CardProps = {
    children: ReactNode;
    style?: object;
};

export default function Card({ children, style }: CardProps) {
    const { palette } = useTheme();

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: palette.card,
                    shadowColor: palette.primary,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
}

export { fontFamily };

const styles = StyleSheet.create({
    card: {
        borderRadius: radii.lg,
        padding: 24,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 4,
    },
});
