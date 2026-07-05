import { DeviceMotion, Gyroscope } from "expo-sensors";
import { useEffect, useRef, useState } from "react";

export type MotionOffset = {
    x: number;
    y: number;
};

const PIXELS_PER_DEGREE = 12;
const PIXELS_PER_RADIAN = (PIXELS_PER_DEGREE * 180) / Math.PI;
const UPDATE_INTERVAL_MS = 16;

export function useMotionOffset(): MotionOffset {
    const [offset, setOffset] = useState<MotionOffset>({ x: 0, y: 0 });
    const offsetRef = useRef<MotionOffset>({ x: 0, y: 0 });
    const lastGyroTimestamp = useRef<number | null>(null);
    const orientationBaseline = useRef<{ beta: number; gamma: number } | null>(
        null,
    );

    useEffect(() => {
        let gyroSub: ReturnType<typeof Gyroscope.addListener> | null = null;
        let motionSub: ReturnType<typeof DeviceMotion.addListener> | null = null;
        let active = true;

        function publishOffset() {
            setOffset({ x: offsetRef.current.x, y: offsetRef.current.y });
        }

        async function start() {
            const gyroAvailable = await Gyroscope.isAvailableAsync();
            if (gyroAvailable && active) {
                Gyroscope.setUpdateInterval(UPDATE_INTERVAL_MS);
                gyroSub = Gyroscope.addListener(({ x, y, timestamp }) => {
                    const nowMs = timestamp * 1000;
                    const dt =
                        lastGyroTimestamp.current != null
                            ? (nowMs - lastGyroTimestamp.current) / 1000
                            : 0;
                    lastGyroTimestamp.current = nowMs;

                    if (dt <= 0 || dt > 0.25) return;

                    offsetRef.current = {
                        x: offsetRef.current.x + y * dt * PIXELS_PER_RADIAN,
                        y: offsetRef.current.y + x * dt * PIXELS_PER_RADIAN,
                    };
                    publishOffset();
                });
            }

            const motionAvailable = await DeviceMotion.isAvailableAsync();
            if (!motionAvailable || !active) return;

            const { granted } = await DeviceMotion.requestPermissionsAsync();
            if (!granted || !active) return;

            DeviceMotion.setUpdateInterval(UPDATE_INTERVAL_MS);
            motionSub = DeviceMotion.addListener(({ rotation }) => {
                if (!orientationBaseline.current) {
                    orientationBaseline.current = {
                        beta: rotation.beta,
                        gamma: rotation.gamma,
                    };
                    return;
                }

                const targetX =
                    (rotation.gamma - orientationBaseline.current.gamma) *
                    PIXELS_PER_DEGREE;
                const targetY =
                    (rotation.beta - orientationBaseline.current.beta) *
                    PIXELS_PER_DEGREE;

                offsetRef.current = {
                    x: offsetRef.current.x + (targetX - offsetRef.current.x) * 0.08,
                    y: offsetRef.current.y + (targetY - offsetRef.current.y) * 0.08,
                };
                publishOffset();
            });
        }

        start();

        return () => {
            active = false;
            gyroSub?.remove();
            motionSub?.remove();
        };
    }, []);

    return offset;
}
