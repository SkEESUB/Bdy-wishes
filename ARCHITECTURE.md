# ARCHITECTURE

## Stack
- **React 19 + Vite 7** (JSX components, `src/main.jsx` entry).
- **Tailwind CSS v4** via `@tailwindcss/vite` (`@theme` design tokens in `src/index.css`).
- **Framer Motion** for section reveals, flips, modal transitions, candle/lid animation.
- **GSAP** for the "HAPPY BIRTHDAY" kinetic letter timeline.
- **canvas-confetti** for celebration bursts.
- **Web Audio API** for microphone blow detection, sound effects and the music-box melody.
- **LocalStorage** for progress persistence.
- `vite-plugin-singlefile` inlines JS/CSS/bundled assets so `dist/index.html` runs standalone.

## Tree
```
src/
  main.jsx              # React root
  App.jsx               # journey orchestrator (countdown → password → continuous page)
  index.css             # design system: tokens, gingham, paper, keyframes
  config/
    birthday.config.js  # ALL personal content (single source of truth)
  hooks/
    useCountdown.js     # 1s ticking countdown + birthday/celebration mode
    useLocalStorage.js  # persisted state
    useBlowDetection.js # getUserMedia + AnalyserNode blow detection
    useConfetti.js      # confetti presets
  lib/
    sfx.js              # Web Audio SFX (pop, chime, puff, party horn, sparkle)
    melody.js           # synthesised music-box "Happy Birthday" (fallback player)
  components/
    decor/ScrapbookBackground.jsx   # gingham + floating hearts/balloons/flowers
    decor/Stickers.jsx              # SVG illustration library (flowers, hearts, bows…)
    decor/Section.jsx               # paper card + section header + number badge
    Countdown.jsx  PasswordScreen.jsx  CandleCake.jsx  CakeCutting.jsx
    BirthdayCelebration.jsx  PhotoCollage.jsx  SurpriseGrid.jsx
    BirthdayLetter.jsx  LoveCoupons.jsx  GiftBox.jsx  VinylPlayer.jsx
    WishTree.jsx  VideoGallery.jsx  MemoryMap.jsx
    Lightbox.jsx  JourneyNav.jsx
  assets/images/*.jpg  # bundled illustration set (inlined at build time)
public/assets/
  images/ videos/ music/ illustrations/ fonts/   # documented drop-in asset slots
```

## Journey state machine (`App.jsx`)
```
stage: 'countdown' | 'password' | 'scrapbook'
```
- `countdown` → full-screen countdown; when the target is reached (or the recipient taps
  "open early") it transitions to `password`.
- `password` → correct password unlocks the scrapbook (unlock animation then swap).
- `scrapbook` → the 13 remaining sections stacked vertically, each revealed on scroll
  (`whileInView`), with a sticky JourneyNav progress rail on the right.

## Data flow
- Config is imported by every section; no section hard-codes personal copy.
- `useLocalStorage('bs:progress', default)` returns `[state, setState]`; sections read
  their own slice (`surprises`, `wishes`, `coupons`, `gift`, `candles`) so progress
  survives reloads.

## Asset strategy
1. **Bundled art** (`src/assets/images`) is imported by the config → guaranteed to work
   offline / in a single-file build. These are *original decorative illustrations*,
   clearly labelled as placeholder art, not real personal photographs.
2. **Drop-in slots** (`public/assets/{images,videos,music,...}`) — copy your own files
   there and point the config at them (`src: "/assets/videos/clip-1.mp4"`).
3. Every media component has an `onError` fallback so a missing file never breaks the page.
4. Music: if `config.music.src` exists it is played with an `<audio>` element; otherwise the
   built-in Web Audio music-box melody is used (so the player always works).
5. Videos: local file is attempted first; on error the documented demo clip is used and a
   small "demo clip" note is shown.

## Performance
- Video `preload="none"` + poster → nothing loads until the recipient presses play.
- Illustrations are ≤185 KB each, inlined once.
- Animations are transform/opacity only; `prefers-reduced-motion` disables loops.
