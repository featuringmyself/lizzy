import { setAudioModeAsync, useAudioPlayer } from "expo-audio";
import { useCallback, useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";

const GUN_SOUND = require("@/assets/gunSoundEffect.mp3");

export function useGunSound() {
    const { soundEnabled } = useTheme();
    const player = useAudioPlayer(GUN_SOUND);

    useEffect(() => {
        void setAudioModeAsync({ playsInSilentMode: true });
    }, []);

    return useCallback(() => {
        if (!soundEnabled) return;
        player.seekTo(0);
        player.play();
    }, [player, soundEnabled]);
}
