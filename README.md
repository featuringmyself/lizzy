# Lizzy 🦎

**Lizzy** is an augmented-reality lizard shooting game for your phone. Point your device at a wall, and lizards crawl out of the surface. Aim, tap, and shoot them before they get away.

Turn any blank wall into a hunting ground.

---

## How It Works

1. **Point** — Open the app and aim your phone at a flat surface (a wall works best).
2. **Spawn** — Lizards appear on the surface, scurrying across the "wall" in front of you.
3. **Shoot** — Tap the screen to fire at the lizards. Hit them before they escape off-screen.
4. **Score** — Rack up points, unlock new lizard types, and chase high scores.

The camera feed becomes your viewport. Lizards are overlaid onto the real world, so it feels like they're actually crawling on the wall in front of you.

---

## Features

### Core Gameplay
- Real-time camera view as the game canvas
- Tap-to-shoot mechanics with haptic feedback
- Score tracking and combo multipliers
- Wave-based spawning with increasing difficulty
- Game over screen with stats and retry

### Lizard Types
Different lizards behave differently — learn their patterns to hunt them effectively.

| Lizard | Behavior |
|--------|----------|
| **Common Gecko** | Slow, predictable path. Easy points. |
| **Speed Skink** | Fast and erratic. Hard to hit. |
| **Armored Iguana** | Takes multiple shots to take down. |
| **Camo Chameleon** | Blends in and fades — watch closely. |
| **Boss Komodo** | Rare spawn. High health, high reward. |

More lizard types will be added over time.

### Planned Features
- **Power-ups** — Slow-mo, multi-shot, and area blast
- **Daily challenges** — Unique spawn patterns and score targets
- **Leaderboards** — Compete with friends for the top spot
- **Lizard bestiary** — Collect and catalog every species you encounter
- **Sound design** — Satisfying shoot/hit/miss audio and ambient effects
- **Themes** — Jungle, desert, urban, and more environments

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Expo SDK 54](https://docs.expo.dev/) + [Expo Router](https://docs.expo.dev/router/introduction/) |
| Language | TypeScript |
| UI | React Native + [NativeWind](https://www.nativewind.dev/) (Tailwind CSS) |
| Camera | [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/) |
| Haptics | [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) |
| Animations | [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) |
| Package manager | [Bun](https://bun.sh/) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS) or [Bun](https://bun.sh/)
- [Expo Go](https://expo.dev/go) on your phone, or Xcode / Android Studio for simulators
- A physical device with a camera is recommended — the game needs a real camera feed

### Install

```bash
bun install
```

### Run

```bash
bun start
```

Then scan the QR code with Expo Go (Android) or the Camera app (iOS).

Platform-specific shortcuts:

```bash
bun run ios       # iOS simulator
bun run android   # Android emulator
bun run web       # Web browser (limited — no camera on most setups)
```

### Camera Permission

Lizzy requires camera access to render the game view. On first launch, grant permission when prompted. If you denied it earlier, enable it in your device Settings → Lizzy → Camera.

---

## Project Structure

```
lizzy/
├── app/                  # Expo Router screens
│   ├── _layout.tsx       # Root layout
│   └── index.tsx         # Main game screen
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── constants/            # Theme and config
├── assets/               # Images, icons, sounds
├── global.css            # Tailwind / NativeWind styles
└── app.json              # Expo config
```

---

## Development Status

Lizzy is in early development. The camera permission flow and project scaffolding are in place. Game mechanics, lizard spawning, shooting, and scoring are actively being built.

---

## License

Private project — all rights reserved.
