import Crosshair from "@/components/Crosshair";
import GameHUD from "@/components/GameHUD";
import Gun from "@/components/Gun";
import LizardField from "@/components/LizardField";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Screen, { fontFamily } from "@/components/ui/Screen";
import type { LizardTypeId } from "@/hooks/useBestiary";
import { useBestiary } from "@/hooks/useBestiary";
import { useGameState } from "@/hooks/useGameState";
import { useMotionOffset } from "@/hooks/useMotionOffset";
import { useScore } from "@/hooks/useScore";
import { useTheme } from "@/providers/ThemeProvider";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function GameScreen() {
    const motionOffset = useMotionOffset();
    const { score, highScore, addLizardHit, resetScore, loaded: scoreLoaded } = useScore();
    const { lives, resetGame, loseLife, isGameOver } = useGameState();
    const { recordEncounter } = useBestiary();
    const { hapticsEnabled, palette } = useTheme();
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const sessionStartHighScore = useRef(0);
    const navigated = useRef(false);
    const highScoreRef = useRef(highScore);
    const [fieldKey, setFieldKey] = useState(0);
    highScoreRef.current = highScore;

    useFocusEffect(
        useCallback(() => {
            if (!scoreLoaded) return;
            sessionStartHighScore.current = highScoreRef.current;
            resetScore();
            resetGame();
            navigated.current = false;
            setFieldKey((key) => key + 1);
        }, [scoreLoaded, resetScore, resetGame]),
    );

    useEffect(() => {
        if (!isGameOver || navigated.current) return;
        navigated.current = true;
        const isNewBest = score > sessionStartHighScore.current && score > 0;
        router.replace({
            pathname: "/game-over",
            params: {
                score: String(score),
                isNewBest: isNewBest ? "1" : "0",
            },
        });
    }, [isGameOver, score]);

    const handleLizardHit = useCallback(
        (typeId: LizardTypeId) => {
            addLizardHit();
            recordEncounter(typeId);
        },
        [addLizardHit, recordEncounter],
    );

    const handleLizardEscape = useCallback(() => {
        loseLife();
        if (hapticsEnabled) {
            void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }
    }, [loseLife, hapticsEnabled]);

    const handlePause = useCallback(() => {
        Alert.alert("Quit game?", "Your progress will be lost.", [
            { text: "Keep playing", style: "cancel" },
            {
                text: "Quit",
                style: "destructive",
                onPress: () => router.replace("/"),
            },
        ]);
    }, []);

    if (!cameraPermission) {
        return <View style={styles.flex} />;
    }

    if (!cameraPermission.granted) {
        return (
            <Screen>
                <View style={styles.permissionCenter}>
                    <Card>
                        <Text style={[styles.permissionTitle, { color: palette.text }]}>
                            Camera access needed
                        </Text>
                        <Text style={[styles.permissionBody, { color: palette.textMuted }]}>
                            Lizzy uses your camera to turn any wall into a hunting ground.
                        </Text>
                        <Button
                            label="Grant access"
                            onPress={requestCameraPermission}
                        />
                    </Card>
                </View>
            </Screen>
        );
    }

    return (
        <View style={styles.flex}>
            <CameraView
                className="absolute inset-0"
                facing="back"
                style={{ width: "100%", height: "100%" }}
            />
            <LizardField
                key={fieldKey}
                motionOffset={motionOffset}
                onLizardHit={handleLizardHit}
                onLizardEscape={handleLizardEscape}
            />
            <GameHUD score={score} lives={lives} onPause={handlePause} />
            <Crosshair />
            <Gun />
        </View>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    permissionCenter: {
        flex: 1,
        justifyContent: "center",
    },
    permissionTitle: {
        fontFamily: fontFamily.bold,
        fontSize: 22,
        textAlign: "center",
        marginBottom: 8,
    },
    permissionBody: {
        fontFamily: fontFamily.semiBold,
        fontSize: 15,
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 22,
    },
});
