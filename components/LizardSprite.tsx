import type { MotionOffset } from "@/hooks/useMotionOffset";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";

const STILL_FRAME = require("@/assets/gecko/0.png");
const FRAMES = [
    require("@/assets/gecko/1.png"),
    require("@/assets/gecko/2.png"),
    require("@/assets/gecko/3.png"),
    require("@/assets/gecko/4.png"),
    require("@/assets/gecko/5.png"),
    require("@/assets/gecko/6.png"),
] as const;

const SPRITE_SIZE = 250;
const FRAME_MS = 130;
const CRAWL_SPEED_PX_PER_SEC = 120;
const POSITION_TICK_MS = 16;

type SpawnConfig = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    spawnTime: number;
};

function pickSpawn(
    width: number,
    height: number,
    motionOffset: MotionOffset,
): SpawnConfig {
    const viewLeft = motionOffset.x;
    const viewTop = motionOffset.y;

    // Lizards only crawl straight down: fixed column, entering from the top.
    const x = viewLeft + width * 0.12 + Math.random() * (width * 0.76 - SPRITE_SIZE);
    const startY = viewTop - SPRITE_SIZE * 0.5;
    const endY =
        viewTop + height * 0.12 + Math.random() * (height * 0.76 - SPRITE_SIZE);

    return { startX: x, startY, endX: x, endY, spawnTime: Date.now() };
}

type LizardSpriteProps = {
    motionOffset: MotionOffset;
};

export default function LizardSprite({ motionOffset }: LizardSpriteProps) {
    const { width, height } = useWindowDimensions();
    const [now, setNow] = useState(Date.now());
    const spawn = useRef<SpawnConfig | null>(null);

    if (spawn.current === null && width > 0 && height > 0) {
        spawn.current = pickSpawn(width, height, motionOffset);
    }

    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), POSITION_TICK_MS);
        return () => clearInterval(id);
    }, []);

    if (!spawn.current) return null;

    const { startX, startY, endX, endY, spawnTime } = spawn.current;

    const dx = endX - startX;
    const dy = endY - startY;
    const totalDistance = Math.hypot(dx, dy);
    const elapsedSec = (now - spawnTime) / 1000;
    const traveled = Math.min(elapsedSec * CRAWL_SPEED_PX_PER_SEC, totalDistance);
    const progress = totalDistance === 0 ? 1 : traveled / totalDistance;
    const arrived = progress >= 1;

    // Cycle the crawl frames while moving; show the resting pose once stopped.
    const frameIndex = Math.floor(now / FRAME_MS) % FRAMES.length;
    const source = arrived ? STILL_FRAME : FRAMES[frameIndex];

    const worldX = startX + dx * progress;
    const worldY = startY + dy * progress;

    const screenX = worldX - motionOffset.x;
    const screenY = worldY - motionOffset.y;

    return (
        <View className="absolute inset-0" pointerEvents="none">
            <Image
                source={source}
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
