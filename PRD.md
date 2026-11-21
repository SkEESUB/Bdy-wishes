# PRD — Interactive Birthday Surprise Website

## 1. Vision
A single continuous, scrollable "birthday scrapbook" website that feels like a hand-made
gift. Cute pastel-blue gingham aesthetic, handwritten type, polaroids, stickers and 14
connected interactive chapters that flow from a countdown to a memory map.

## 2. Audience & Tone
- One special recipient (default name: "Aanya", configurable).
- Tone: warm, playful, sentimental, never corporate.
- Mobile-first (the recipient will most likely open this on a phone).

## 3. Journey (one page, 14 ordered sections)
| # | Section | Core interaction |
|---|---------|------------------|
| 01 | Birthday Countdown | Live d/h/m/s countdown, celebration mode on the day |
| 02 | Secret Password | Custom keypad, password `delulu`, shake-on-wrong, unlock animation |
| 03 | Blow The Candles | Microphone blow detection (Web Audio) + manual button, smoke, confetti, SFX |
| 04 | Cake Cutting | Real geometric rectangular cake, progressive cuts, slice lifted onto a plate |
| 05 | Celebration | "HAPPY BIRTHDAY" kinetic type, confetti, balloons, hearts, flowers |
| 06 | Photo Collage | Tilted polaroids, stickers, captions, click-to-expand lightbox |
| 07 | 12 Special Surprises | Exactly 12 unique cards, individual reveal, progress persisted |
| 08 | Birthday Letter | Vintage parchment, fold-open animation, close/reopen |
| 09 | Love Coupons | Flip cards, redeem stamps, persisted |
| 10 | Surprise Gift | Animated gift box, lid opens, ribbon, confetti, hidden message |
| 11 | Music Player | Vinyl turntable, spin, play/pause, volume, progress, no autoplay |
| 12 | Wish Tree | Illustrated tree, hanging notes, reveal wishes, custom wishes via LocalStorage |
| 13 | Videos Gallery | Framed video cards, modal player, lazy load, no autoplay |
| 14 | Memory Map | Illustrated landscape, dotted path, clickable locations → photo + caption |

## 4. Functional requirements
- All content editable from `src/config/birthday.config.js`.
- Works with zero missing assets (graceful fallbacks, documented asset slots).
- Progress (surprises opened, wishes, redeemed coupons, gift opened, candles blown)
  persisted in LocalStorage.
- Audio is **never** autoplayed; every sound is triggered by a user gesture.
- Microphone permission failure must not block the journey (manual button fallback).
- No horizontal overflow at 320px–1920px widths.
- Respects `prefers-reduced-motion`.

## 5. Non-functional
- React + Vite + Tailwind CSS v4, Framer Motion, GSAP (used for the celebration type),
  Lucide React icons, canvas-confetti.
- No backend, no auth, no tracking. Client-side only.
- Production build must succeed with `npm run build`.

## 6. Out of scope
- Real authentication (the password gate is playful, not security).
- Uploading photos from inside the site (assets are added by editing the config).
