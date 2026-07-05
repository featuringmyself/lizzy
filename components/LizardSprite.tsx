import type { MotionOffset } from "@/hooks/useMotionOffset";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";

export const SPRITE_SIZE = 250;

const FRAMES = [
    require("@/assets/gecko/0.png"),
    require("@/assets/gecko/1.png"),
    require("@/assets/gecko/2.png"),
    require("@/assets/gecko/3.png"),
    require("@/assets/gecko/4.png"),
    require("@/assets/gecko/5.png"),
    require("@/assets/gecko/6.png"),
] as const;

const FRAME_MS = 130;
const CRAWL_SPEED_PX_PER_SEC = 120;
const POSITION_TICK_MS = 16;

export type LizardBounds = {
    x: number;
    y: number;
    width: number;
    height: number;
};

type SpawnConfig = {
    startX: number;
    startY: number;
    spawnTime: number;
};

function pickSpawn(
    width: number,
    height: number,
    motionOffset: MotionOffset,
): SpawnConfig {
    const viewLeft = motionOffset.x;
    const viewTop = motionOffset.y;

    const crawlLaneWidth = Math.max(width * 0.76 - SPRITE_SIZE, width * 0.4);
    const x = viewLeft + width * 0.12 + Math.random() * crawlLaneWidth;
    const startY = viewTop - SPRITE_SIZE * 0.5;

    return { startX: x, startY, spawnTime: Date.now() };
}

type LizardSpriteProps = {
    id: number;
    motionOffset: MotionOffset;
    onBoundsChange: (id: number, bounds: LizardBounds | null) => void;
    onExitScreen: (id: number) => void;
};

export default function LizardSprite({
    id,
    motionOffset,
    onBoundsChange,
    onExitScreen,
}: LizardSpriteProps) {
    const { width, height } = useWindowDimensions();
    const [now, setNow] = useState(Date.now());
    const spawn = useRef<SpawnConfig | null>(null);
    const exited = useRef(false);

    if (spawn.current === null && width > 0 && height > 0) {
        spawn.current = pickSpawn(width, height, motionOffset);
    }

    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), POSITION_TICK_MS);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        return () => onBoundsChange(id, null);
    }, [id, onBoundsChange]);

    const spawnConfig = spawn.current;
    const elapsedSec = spawnConfig ? (now - spawnConfig.spawnTime) / 1000 : 0;
    const worldX = spawnConfig?.startX ?? 0;
    const worldY = spawnConfig ? spawnConfig.startY + elapsedSec * CRAWL_SPEED_PX_PER_SEC : 0;
    const screenX = worldX - motionOffset.x;
    const screenY = worldY - motionOffset.y;

    useEffect(() => {
        if (!spawnConfig) return;

        onBoundsChange(id, {
            x: screenX,
            y: screenY,
            width: SPRITE_SIZE,
            height: SPRITE_SIZE,
        });
    }, [id, onBoundsChange, screenX, screenY, spawnConfig]);

    useEffect(() => {
        if (!spawnConfig || exited.current) return;
        if (screenY > height + SPRITE_SIZE * 0.25) {
            exited.current = true;
            onBoundsChange(id, null);
            onExitScreen(id);
        }
    }, [height, id, onBoundsChange, onExitScreen, screenY, spawnConfig]);

    if (!spawnConfig) return null;

    const frameIndex = Math.floor(now / FRAME_MS) % FRAMES.length;

    return (
        <View className="absolute inset-0" pointerEvents="none">
            <Image
                source={FRAMES[frameIndex]}
                style={{
                    position: "absolute",
                    left: screenX,
                    top: screenY,
                    width: SPRITE_SIZE,
                    height: SPRITE_SIZE,
                }}
                contentFit="contain"
            />
        </View>
    );
}
