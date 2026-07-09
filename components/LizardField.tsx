import LizardSprite, { type LizardBounds, SPRITE_SIZE } from "@/components/LizardSprite";
import type { LizardTypeId } from "@/hooks/useBestiary";
import { useGunSound } from "@/hooks/useGunSound";
import type { MotionOffset } from "@/hooks/useMotionOffset";
import { useTheme } from "@/providers/ThemeProvider";
import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";

const FIRST_SPAWN_MS = 600;
const SLOWEST_SPAWN_MS = 2600;
const RAMP_PER_LIZARD_MS = 180;
const DEFAULT_LIZARD_TYPE: LizardTypeId = "gecko";

function spawnDelayFor(count: number): number {
    if (count === 0) return FIRST_SPAWN_MS;
    return Math.max(FIRST_SPAWN_MS, SLOWEST_SPAWN_MS - count * RAMP_PER_LIZARD_MS);
}

function pointInBounds(x: number, y: number, bounds: LizardBounds): boolean {
    const pad = SPRITE_SIZE * 0.12;
    return (
        x >= bounds.x + pad &&
        x <= bounds.x + bounds.width - pad &&
        y >= bounds.y + pad &&
        y <= bounds.y + bounds.height - pad
    );
}

type LizardFieldProps = {
    motionOffset: MotionOffset;
    onLizardHit?: (typeId: LizardTypeId) => void;
    onLizardEscape?: () => void;
};

export default function LizardField({
    motionOffset,
    onLizardHit,
    onLizardEscape,
}: LizardFieldProps) {
    const { width, height } = useWindowDimensions();
    const playGunSound = useGunSound();
    const { hapticsEnabled } = useTheme();
    const [ids, setIds] = useState<number[]>([]);
    const nextId = useRef(0);
    const spawnGeneration = useRef(0);
    const boundsRef = useRef<Map<number, LizardBounds>>(new Map());

    useEffect(() => {
        const generation = ++spawnGeneration.current;
        let timeout: ReturnType<typeof setTimeout>;
        let spawnCount = 0;
        let cancelled = false;

        const scheduleNext = () => {
            const delay = spawnDelayFor(spawnCount);
            timeout = setTimeout(() => {
                if (cancelled || spawnGeneration.current !== generation) return;
                setIds((prev) => {
                    const id = nextId.current++;
                    return prev.includes(id) ? prev : [...prev, id];
                });
                spawnCount += 1;
                scheduleNext();
            }, delay);
        };

        scheduleNext();
        return () => {
            cancelled = true;
            clearTimeout(timeout);
        };
    }, []);

    const removeLizard = useCallback((id: number) => {
        boundsRef.current.delete(id);
        setIds((prev) => prev.filter((existingId) => existingId !== id));
    }, []);

    const updateBounds = useCallback((id: number, bounds: LizardBounds | null) => {
        if (bounds) {
            boundsRef.current.set(id, bounds);
        } else {
            boundsRef.current.delete(id);
        }
    }, []);

    const handleFire = useCallback(() => {
        playGunSound();

        const aimX = width / 2;
        const aimY = height / 2;

        for (const id of ids) {
            const bounds = boundsRef.current.get(id);
            if (bounds && pointInBounds(aimX, aimY, bounds)) {
                removeLizard(id);
                onLizardHit?.(DEFAULT_LIZARD_TYPE);
                if (hapticsEnabled) {
                    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
                return;
            }
        }

        if (hapticsEnabled) {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    }, [height, hapticsEnabled, ids, onLizardHit, playGunSound, removeLizard, width]);

    const handleExitScreen = useCallback(
        (id: number) => {
            removeLizard(id);
            onLizardEscape?.();
        },
        [onLizardEscape, removeLizard],
    );

    return (
        <>
            {ids.map((id) => (
                <LizardSprite
                    key={id}
                    id={id}
                    motionOffset={motionOffset}
                    onBoundsChange={updateBounds}
                    onExitScreen={handleExitScreen}
                />
            ))}
            <Pressable
                style={StyleSheet.absoluteFill}
                onPress={handleFire}
                accessibilityRole="button"
                accessibilityLabel="Fire"
            />
        </>
    );
}
