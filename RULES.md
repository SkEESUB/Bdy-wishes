# RULES — How to edit & extend

## 1. Content rules (the only files you should need)
- **`src/config/birthday.config.js`** — name, date, password, letter, 12 surprises,
  photos, coupons, gift message, music, wishes, videos, memory map.
- **`public/assets/…`** — your own photos, videos and music.
Never edit a component to change a name, a date or a caption.

## 2. Where to put assets
| Asset | Folder | Config field |
|---|---|---|
| Photos | `public/assets/images/` | `gallery[].src`, `surprises[].image`, `memoryMap[].image` |
| Videos | `public/assets/videos/` | `videos[].src` |
| Music | `public/assets/music/` | `music.src` |
| Illustrations | `public/assets/illustrations/` | any `src` field |
| Fonts | `public/assets/fonts/` | `src/index.css` `@font-face` |

For guaranteed-offline assets, import from `src/assets/images` instead (bundled + inlined).

## 3. Code rules
- Components are **JSX**, one interactive chapter per file, no global state library.
- All animations must be transform/opacity (no layout-thrashing properties).
- Any new infinite animation must be wrapped in a reduced-motion check.
- Every button must do something; no dead UI, no placeholder handlers.
- Never remove a graceful fallback (`onError`, `try/catch`, permission failure).
- Keep copy personal and specific — generic filler text is a bug.

## 4. Testing rules (run before every delivery)
- `npm run build` must succeed.
- Walk the full journey: countdown → password → candles → cut cake → serve slice →
  celebration → collage → all 12 surprises → letter → coupons → gift → music → wish tree
  → videos → memory map.
- Confirm no console errors, no horizontal scroll at 320px, all sections reachable.
- Confirm audio never autoplays and the mic failure path still unlocks the next section.

## 5. Deployment
- Vercel: framework **Vite**, build `npm run build`, output `dist`.
- Videos/music in `public/` must be ≤ 100 MB each (Vercel static limit) — use MP4/AAC.
