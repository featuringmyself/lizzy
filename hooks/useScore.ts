import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export const LIZARD_POINTS = 10;

const HIGH_SCORE_KEY = "lizzy-high-score";

export function useScore() {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        void AsyncStorage.getItem(HIGH_SCORE_KEY).then((value) => {
            if (value !== null) {
                setHighScore(Number.parseInt(value, 10) || 0);
            }
            setLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (!loaded || score <= highScore) return;
        setHighScore(score);
        void AsyncStorage.setItem(HIGH_SCORE_KEY, String(score));
    }, [highScore, loaded, score]);

    const addLizardHit = useCallback(() => {
        setScore((prev) => prev + LIZARD_POINTS);
    }, []);

    const resetScore = useCallback(() => {
        setScore(0);
    }, []);

    return { score, highScore, addLizardHit, resetScore, loaded };
}
