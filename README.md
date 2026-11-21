# 🎂 A Little Birthday Surprise — Interactive Scrapbook Website

A complete, single-page interactive birthday scrapbook: countdown → secret password →
blow the candles → cut & serve a real geometric cake → celebration → polaroids →
12 unique surprises → hand-written letter → love coupons → surprise gift → vinyl
music player → wish tree → video gallery → illustrated memory map.

Built with **React + Vite + Tailwind CSS v4 + Framer Motion + GSAP + Lucide +
canvas-confetti**, using the **Web Audio API** for blow detection, sound effects and a
synthesised music-box song, and **LocalStorage** to remember progress.

---

## 1. Run it locally

```bash
npm install
npm run dev        # → http://localhost:5173
```

Production build + preview:

```bash
npm run build      # → dist/index.html (single self-contained file)
npm run preview
```

Optional verification suites used during development:

```bash
npx vite build --config vite.ssrcheck.config.js   # build the SSR test bundle
node scripts/render-check.mjs                     # render every section, catch runtime errors
node scripts/content-check.mjs                    # assert structure (12 surprises, 8 wishes, …)
```

> The microphone "blow the candles" feature requires HTTPS or `localhost`.

---

## 2. Customise the content (one file)

Everything personal lives in **`src/config/birthday.config.js`**:

| Field | What it changes |
|---|---|
| `recipient` | name, nickname, tagline, who it's from |
| `date` | birthday (`month` 1–12, `day`, optional `year`) |
| `password`, `passwordHint` | the secret knock (default `delulu`) |
| `countdown` | kicker / heading / message / early-peek label |
| `candles`, `cake` | candle count, hints, frosting colours |
| `celebration` | the big headline + personalised message |
| `letter` | greeting, every paragraph, sign-off, postscript |
| `gallery` | the 6 polaroids + captions |
| `surprises` | **exactly 12** unique cards (photo / message / gift / song / wish / quiz / doodle / finale) |
| `coupons` | love coupons (title, icon, code, message) |
| `gift` | the hidden gift message |
| `music` | song title + optional local file |
| `wishTree.wishes` | the hanging wishes |
| `videos` | video titles, captions and file paths |
| `memoryMap` | map locations (`x`/`y` %), captions and messages |

---

## 3. Where to put your own assets

```
public/assets/
  images/          ← photographs (gallery, surprises, memory map)
  videos/          ← personal clips (mp4)
  music/           ← a song (mp3 / m4a / ogg)
  illustrations/   ← stickers, doodles, scans
  fonts/           ← optional self-hosted handwriting fonts
```

Each folder has a `README.md` with the exact config fields to set.

- **Photos** — the bundled defaults are *original decorative illustrations*
  (`src/assets/images/*.jpg`), clearly labelled as illustrated placeholders in the UI.
  Replace them with real photos by importing new files from `src/assets/images/`
  (bundled + inlined, works offline) or by pointing a config `src` at
  `/assets/images/your-file.jpg`.
- **Videos** — set `videos[i].src` to `/assets/videos/clip.mp4`. Until the file exists
  the player falls back to a documented demo clip and labels it as a demo.
- **Music** — set `music.src`. While it is `null`, the vinyl player plays a built-in
  Web Audio music-box rendition of "Happy Birthday", so the section always works.
- Nothing ever autoplays; audio and video start only on a tap.

---

## 4. Project structure

```
src/
  App.jsx                     journey orchestrator (countdown → password → scrapbook)
  main.jsx                    React root
  index.css                   design system: tokens, gingham, paper, keyframes
  config/birthday.config.js   ALL personal content
  hooks/                      useCountdown, useLocalStorage, useBlowDetection, useConfetti
  lib/                        sfx.js (Web Audio SFX), melody.js (music-box player)
  components/
    decor/                    ScrapbookBackground, Stickers, Section, Modal, Lightbox
    Countdown.jsx  PasswordScreen.jsx  CandleCake.jsx  CakeCutting.jsx
    BirthdayCelebration.jsx  PhotoCollage.jsx  SurpriseGrid.jsx
    BirthdayLetter.jsx  LoveCoupons.jsx  GiftBox.jsx  VinylPlayer.jsx
    WishTree.jsx  VideoGallery.jsx  MemoryMap.jsx  JourneyNav.jsx
  assets/images/*.jpg         bundled illustration set
scripts/                      render + content verification suites
PRD.md ARCHITECTURE.md DESIGN.md MEMORY.md RULES.md TRACKER.md
```

---

## 5. Deploy to Vercel

1. Push the repo to GitHub/GitLab.
2. In Vercel → **New Project** → import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`,
   Output directory `dist`.
4. Deploy. Add your own domain if you like.

Notes
- `vite-plugin-singlefile` inlines JS/CSS/images into `dist/index.html`, so the
  deployment is a single portable file plus the optional `public/` asset slots.
- Large videos/music: keep each file under 100 MB (Vercel static limit). For big
  clips consider hosting them elsewhere and putting the absolute URL in the config.
- Microphone features need HTTPS (Vercel provides it automatically).

---

## 6. Resetting the surprise

Progress (opened surprises, wishes, coupons, the gift, the stage) is stored in
LocalStorage under `bs:*`. The footer's **"start the whole surprise over"** button
clears it; you can also run `localStorage.clear()` in the console.
