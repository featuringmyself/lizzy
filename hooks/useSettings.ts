import { defaultThemeId, type ThemeId } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const SETTINGS_KEY = "lizzy-settings";

type Settings = {
    soundEnabled: boolean;
    hapticsEnabled: boolean;
    themeId: ThemeId;
};

const DEFAULT_SETTINGS: Settings = {
    soundEnabled: true,
    hapticsEnabled: true,
    themeId: defaultThemeId,
};

function parseSettings(raw: string | null): Settings {
    if (!raw) return DEFAULT_SETTINGS;
    try {
        const parsed = JSON.parse(raw) as Partial<Settings>;
        return {
            soundEnabled: parsed.soundEnabled ?? DEFAULT_SETTINGS.soundEnabled,
            hapticsEnabled: parsed.hapticsEnabled ?? DEFAULT_SETTINGS.hapticsEnabled,
            themeId: parsed.themeId ?? DEFAULT_SETTINGS.themeId,
        };
    } catch {
        return DEFAULT_SETTINGS;
    }
}

export function useSettings() {
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        void AsyncStorage.getItem(SETTINGS_KEY).then((value) => {
            setSettings(parseSettings(value));
            setLoaded(true);
        });
    }, []);

    const persist = useCallback((next: Settings) => {
        setSettings(next);
        void AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    }, []);

    const toggleSound = useCallback(() => {
        setSettings((prev) => {
            const next = { ...prev, soundEnabled: !prev.soundEnabled };
            void AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
            return next;
        });
    }, []);

    const toggleHaptics = useCallback(() => {
        setSettings((prev) => {
            const next = { ...prev, hapticsEnabled: !prev.hapticsEnabled };
            void AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
            return next;
        });
    }, []);

    const setThemeId = useCallback((themeId: ThemeId) => {
        setSettings((prev) => {
            const next = { ...prev, themeId };
            void AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
            return next;
        });
    }, []);

    return {
        ...settings,
        loaded,
        toggleSound,
        toggleHaptics,
        setThemeId,
        persist,
    };
}
