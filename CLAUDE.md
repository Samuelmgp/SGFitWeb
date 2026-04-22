# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Vite, http://localhost:5173)
npm run build    # Type-check (tsc) then build to dist/
npm run lint     # ESLint
npm run preview  # Preview production build locally
```

## Tech Stack

- **React 18 + TypeScript** via Vite
- **React Router v6** — URL-based routing (not hash routing)
- **Tailwind CSS v3** — `darkMode: 'class'` with `.dark` toggled on `<html>`
- **Lucide React** — icons (replaces iOS SF Symbols)

## Architecture

### Routing

```
/home                      → Home (today's ring, actions, recent sessions)
/templates                 → Template list + create/edit
/history                   → Year grid + calendar + session list
/profile                   → Settings, goals, body, library links
/profile/exercise-library  → Exercise catalog (24 exercises, 6 muscle groups)
/profile/personal-records  → Gold/silver/bronze PR medals
/workout/active            → Full-screen active workout (no tab bar)
```

`AppShell` (`src/components/layout/`) wraps all routes except `/workout/active` and renders:
- Bottom `TabBar` on mobile (`<768px`)
- Left sidebar on desktop (`≥768px`)

### Data Layer

All data lives in `src/data/mockData.ts` — replace with Firebase calls when ready. Types in `src/types/index.ts` mirror the iOS SwiftData models exactly.

**Critical data rules (same as iOS):**
- All weights stored in **kg**; convert at render using `src/utils/units.ts`
- `weightKg == null` on a set means bodyweight exercise
- Cardio: `reps` = distance (meters), `durationSeconds` = elapsed time
- All ordered arrays have an explicit `order: number` field — always sort before rendering

### Theme

`ThemeContext` (`src/context/ThemeContext.tsx`) manages `'light' | 'dark' | 'system'`, persisted to `localStorage` under key `sgfit-theme`. A blocking inline script in `index.html` applies `.dark` before React mounts to prevent flash.

### Key Types

```ts
MuscleGroup  → 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core'
WorkoutStatus → 'exceeded' | 'targetMet' | 'partial'
PRMedal      → 'gold' | 'silver' | 'bronze'
WeightUnit   → 'kg' | 'lbs'
```

Muscle group colors (used consistently across the app):
| Group | Color |
|---|---|
| chest | `#3b82f6` (blue) |
| back | `#22c55e` (green) |
| legs | `#f97316` (orange) |
| shoulders | `#a855f7` (purple) |
| arms | `#ef4444` (red) |
| core | `#f59e0b` (amber) |

### Shared UI Components (`src/components/ui/`)

| Component | Purpose |
|---|---|
| `MuscleGroupBadge` | Rounded-square icon badge with muscle group color |
| `RingProgress` | SVG circular progress ring (Home page) |
| `WorkoutCard` | Session list item with status dot + muscle group dots |
| `StatCard` | Labeled stat with icon (streak, time, sessions) |
| `Button` | `primary | secondary | ghost | danger` × `sm | md | lg` |

## Planned Backend (Firebase)

When integrating Firebase, replace mock imports in each page with Firestore queries. The type definitions in `src/types/index.ts` are already shaped for direct mapping to Firestore documents.
