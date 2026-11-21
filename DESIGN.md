# DESIGN SYSTEM — Pastel Scrapbook

## Palette
| Token | Hex | Use |
|---|---|---|
| `blue.pastel` | `#BBDFF5` | gingham base, card washes |
| `blue.deep`   | `#6FA8D6` | headings, borders, buttons |
| `blue.ink`    | `#4A5A6A` | body text |
| `pink.pastel` | `#F9C8D9` | hearts, stickers, coupons |
| `pink.deep`   | `#E48BB0` | accents, ribbon |
| `cream`       | `#FFF7EC` | paper cards, parchment |
| `lavender`    | `#DCD4F2` | secondary paper, night sky |
| `mint`        | `#C9EBDD` | leaves, tree |
| `butter`      | `#FFE9B8` | candles, stars |

## Typography
- `font-hand` → **Caveat** — headings, letter body (handwritten).
- `font-cute` → **Gaegu** — playful sub-headings, captions.
- `font-body` → **Patrick Hand** — paragraph text.
- `font-ui` → **Quicksand** — numbers, keypad, small caps labels.
All fonts are loaded from Google Fonts with a `cursive`/`system-ui` fallback stack.

## Surfaces
- **Gingham**: two overlapping `repeating-linear-gradient` white bands over `blue.pastel`.
- **Paper card**: cream fill, 1.5px dashed/deep border, `border-radius 24px`,
  layered soft shadow `0 10px 30px rgba(111,168,214,.22)`.
- **Polaroid**: white frame, 14px padding, `pb-14`, `rotate(-3deg … 3deg)`, washi tape strip.
- **Parchment**: cream gradient + inner shadow + deckle border (dashed outline).
- **Sticker**: white 4px outline + drop shadow, slight rotation, `hover:scale-110`.

## Motion rules
- Section reveals: fade + 28px rise, `duration .7`, `easeOut`, once.
- Floating hearts/balloons: 6–14s loops, small amplitude, staggered delays.
- Flips: `rotateY 180deg`, `spring(stiffness 260, damping 22)`, `transform-style: preserve-3d`.
- Confetti: pastel palette only (`#F9C8D9 #BBDFF5 #DCD4F2 #FFE9B8 #C9EBDD #FFF7EC`).
- `prefers-reduced-motion`: infinite loops and float animations are disabled, transitions
  shortened to 120ms, confetti counts reduced.

## Accessibility
- Every interactive element is a real `<button>` with `aria-label`.
- Modal traps Esc-to-close, `role="dialog"`, `aria-modal`.
- Minimum text contrast uses `blue.ink` on cream/paper (≈7:1).
- Touch targets ≥ 44px; keypad keys are 64px squares.
- Decorative SVGs are `aria-hidden`.
