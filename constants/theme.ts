export type ThemeId = "jungle" | "desert" | "urban";

export type ThemePalette = {
    id: ThemeId;
    name: string;
    primary: string;
    primaryLight: string;
    accent: string;
    accentSecondary: string;
    background: string;
    backgroundEnd: string;
    text: string;
    textMuted: string;
    card: string;
    crosshair: string;
    crosshairAccent: string;
};

export const themes: Record<ThemeId, ThemePalette> = {
    jungle: {
        id: "jungle",
        name: "Jungle",
        primary: "#1B4332",
        primaryLight: "#40916C",
        accent: "#FCD34D",
        accentSecondary: "#FF6B6B",
        background: "#FFF8E7",
        backgroundEnd: "#D8F3DC",
        text: "#1A1A2E",
        textMuted: "#52796F",
        card: "#FFFFFF",
        crosshair: "rgba(64, 145, 108, 0.9)",
        crosshairAccent: "rgba(252, 211, 77, 0.85)",
    },
    desert: {
        id: "desert",
        name: "Desert",
        primary: "#BC6C25",
        primaryLight: "#E9C46A",
        accent: "#F4A261",
        accentSecondary: "#E76F51",
        background: "#FFF8F0",
        backgroundEnd: "#FAEDCD",
        text: "#3D2C1E",
        textMuted: "#8B7355",
        card: "#FFFFFF",
        crosshair: "rgba(233, 196, 106, 0.9)",
        crosshairAccent: "rgba(231, 111, 81, 0.85)",
    },
    urban: {
        id: "urban",
        name: "Urban",
        primary: "#1D3557",
        primaryLight: "#457B9D",
        accent: "#06D6A0",
        accentSecondary: "#EF476F",
        background: "#F1FAEE",
        backgroundEnd: "#A8DADC",
        text: "#1D3557",
        textMuted: "#457B9D",
        card: "#FFFFFF",
        crosshair: "rgba(69, 123, 157, 0.9)",
        crosshairAccent: "rgba(6, 214, 160, 0.85)",
    },
};

export const defaultThemeId: ThemeId = "jungle";

export const radii = {
    sm: 12,
    md: 16,
    lg: 24,
    pill: 999,
} as const;

export const fontFamily = {
    semiBold: "Nunito_600SemiBold",
    bold: "Nunito_700Bold",
    extraBold: "Nunito_800ExtraBold",
} as const;
