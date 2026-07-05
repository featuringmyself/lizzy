import { useCallback, useState } from "react";

export const STARTING_LIVES = 3;

export function useGameState() {
    const [lives, setLives] = useState(STARTING_LIVES);

    const resetGame = useCallback(() => {
        setLives(STARTING_LIVES);
    }, []);

    const loseLife = useCallback(() => {
        setLives((prev) => Math.max(0, prev - 1));
    }, []);

    return { lives, resetGame, loseLife, isGameOver: lives <= 0 };
}
