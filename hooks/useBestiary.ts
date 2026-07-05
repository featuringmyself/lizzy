import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export type LizardTypeId =
    | "gecko"
    | "skink"
    | "iguana"
    | "chameleon"
    | "komodo";

export type LizardType = {
    id: LizardTypeId;
    name: string;
    description: string;
    unlockedByDefault: boolean;
};

export const LIZARD_TYPES: LizardType[] = [
    {
        id: "gecko",
        name: "Common Gecko",
        description: "Slow and predictable. Easy points.",
        unlockedByDefault: true,
    },
    {
        id: "skink",
        name: "Speed Skink",
        description: "Fast and erratic. Hard to hit.",
        unlockedByDefault: false,
    },
    {
        id: "iguana",
        name: "Armored Iguana",
        description: "Takes multiple shots to take down.",
        unlockedByDefault: false,
    },
    {
        id: "chameleon",
        name: "Camo Chameleon",
        description: "Blends in and fades — watch closely.",
        unlockedByDefault: false,
    },
    {
        id: "komodo",
        name: "Boss Komodo",
        description: "Rare spawn. High health, high reward.",
        unlockedByDefault: false,
    },
];

const ENCOUNTERS_KEY = "lizzy-bestiary-encounters";

export function useBestiary() {
    const [encounters, setEncounters] = useState<Record<LizardTypeId, number>>({
        gecko: 0,
        skink: 0,
        iguana: 0,
        chameleon: 0,
        komodo: 0,
    });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        void AsyncStorage.getItem(ENCOUNTERS_KEY).then((value) => {
            if (value) {
                try {
                    const parsed = JSON.parse(value) as Partial<Record<LizardTypeId, number>>;
                    setEncounters((prev) => ({ ...prev, ...parsed }));
                } catch {
                    // keep defaults
                }
            }
            setLoaded(true);
        });
    }, []);

    const recordEncounter = useCallback((typeId: LizardTypeId) => {
        setEncounters((prev) => {
            const next = { ...prev, [typeId]: (prev[typeId] ?? 0) + 1 };
            void AsyncStorage.setItem(ENCOUNTERS_KEY, JSON.stringify(next));
            return next;
        });
    }, []);

    const isUnlocked = useCallback(
        (typeId: LizardTypeId) => {
            const type = LIZARD_TYPES.find((t) => t.id === typeId);
            if (!type) return false;
            if (type.unlockedByDefault) return true;
            return (encounters[typeId] ?? 0) > 0;
        },
        [encounters],
    );

    return { encounters, loaded, recordEncounter, isUnlocked };
}
