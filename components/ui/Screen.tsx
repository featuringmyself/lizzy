import { fontFamily } from "@/constants/theme";
import { useTheme } from "@/providers/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenProps = {
    children: ReactNode;
    padded?: boolean;
};

export default function Screen({ children, padded = true }: ScreenProps) {
    const { palette } = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.root}>
            <LinearGradient
                colors={[palette.background, palette.backgroundEnd]}
                style={StyleSheet.absoluteFill}
            />
            <View
                style={[
                    styles.content,
                    {
                        paddingTop: insets.top + (padded ? 16 : 0),
                        paddingBottom: insets.bottom + (padded ? 16 : 0),
                        paddingHorizontal: padded ? 24 : 0,
                    },
                ]}
            >
                {children}
            </View>
        </View>
    );
}

export { fontFamily };

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});
