import { Gyroscope } from "expo-sensors";
import { useEffect, useRef, useState } from "react";

export type MotionOffset = {
    x: number;
    y: number;
};

const PIXELS_PER_DEGREE = 12;
const PIXELS_PER_RADIAN = (PIXELS_PER_DEGREE * 180) / Math.PI;
const UPDATE_INTERVAL_MS = 16;

// Flip these if panning feels inverted on your device.
const INVERT_X = 1;
const INVERT_Y = 1;

// Reject absurd time gaps (e.g. app resuming from background).
const MAX_DT_SEC = 0.1;

export function useMotionOffset(): MotionOffset {
    const [offset, setOffset] = useState<MotionOffset>({ x: 0, y: 0 });
    const offsetRef = useRef<MotionOffset>({ x: 0, y: 0 });
    const lastSampleMs = useRef<number | null>(null);

    useEffect(() => {
        let sub: ReturnType<typeof Gyroscope.addListener> | null = null;
        let active = true;

        async function start() {
            const available = await Gyroscope.isAvailableAsync();
            if (!available || !active) return;

            Gyroscope.setUpdateInterval(UPDATE_INTERVAL_MS);

            sub = Gyroscope.addListener(({ x, y }) => {
                // Use the wall clock for dt — the sensor's own `timestamp`
                // field has inconsistent units across platforms.
                const nowMs = Date.now();
                const prevMs = lastSampleMs.current;
                lastSampleMs.current = nowMs;

                if (prevMs == null) return;

                const dt = (nowMs - prevMs) / 1000;
                if (dt <= 0 || dt > MAX_DT_SEC) return;

                // Panning the phone right (rotation around device Y) scrolls the
                // world left, so the viewport's world origin moves right.
                offsetRef.current = {
                    x: offsetRef.current.x - y * dt * PIXELS_PER_RADIAN * INVERT_X,
                    y: offsetRef.current.y - x * dt * PIXELS_PER_RADIAN * INVERT_Y,
                };
                setOffset({ x: offsetRef.current.x, y: offsetRef.current.y });
            });
        }

        start();

        return () => {
            active = false;
            sub?.remove();
        };
    }, []);

    return offset;
}
