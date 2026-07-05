import { setAudioModeAsync, useAudioPlayer } from "expo-audio";
import { useCallback, useEffect } from "react";

const GUN_SOUND = require("@/assets/gunSoundEffect.mp3");

export function useGunSound() {
    const player = useAudioPlayer(GUN_SOUND);

    useEffect(() => {
        void setAudioModeAsync({ playsInSilentMode: true });
    }, []);

    return useCallback(() => {
        player.seekTo(0);
        player.play();
    }, [player]);
}
