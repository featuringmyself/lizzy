import { themes, type ThemeId, type ThemePalette } from "@/constants/theme";
import { useSettings } from "@/hooks/useSettings";
import { createContext, useContext, type ReactNode } from "react";

type ThemeContextValue = {
    palette: ThemePalette;
    themeId: ThemeId;
    setThemeId: (id: ThemeId) => void;
    soundEnabled: boolean;
    hapticsEnabled: boolean;
    toggleSound: () => void;
    toggleHaptics: () => void;
    loaded: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const settings = useSettings();
    const palette = themes[settings.themeId] ?? themes.jungle;

    return (
        <ThemeContext.Provider
            value={{
                palette,
                themeId: settings.themeId,
                setThemeId: settings.setThemeId,
                soundEnabled: settings.soundEnabled,
                hapticsEnabled: settings.hapticsEnabled,
                toggleSound: settings.toggleSound,
                toggleHaptics: settings.toggleHaptics,
                loaded: settings.loaded,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return ctx;
}
