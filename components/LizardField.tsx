import LizardSprite from "@/components/LizardSprite";
import type { MotionOffset } from "@/hooks/useMotionOffset";
import { useEffect, useRef, useState } from "react";

const MAX_LIZARDS = 12;
const FIRST_SPAWN_MS = 600;
const SLOWEST_SPAWN_MS = 2600;
const RAMP_PER_LIZARD_MS = 180;

function spawnDelayFor(count: number): number {
    if (count === 0) return FIRST_SPAWN_MS;
    return Math.max(FIRST_SPAWN_MS, SLOWEST_SPAWN_MS - count * RAMP_PER_LIZARD_MS);
}

type LizardFieldProps = {
    motionOffset: MotionOffset;
};

export default function LizardField({ motionOffset }: LizardFieldProps) {
    const [ids, setIds] = useState<number[]>([]);
    const nextId = useRef(0);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const scheduleNext = () => {
            const delay = spawnDelayFor(nextId.current);
            timeout = setTimeout(() => {
                setIds((prev) => [...prev, nextId.current]);
                nextId.current += 1;
                if (nextId.current < MAX_LIZARDS) {
                    scheduleNext();
                }
            }, delay);
        };

        scheduleNext();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {ids.map((id) => (
                <LizardSprite key={id} motionOffset={motionOffset} />
            ))}
        </>
    );
}
