# MEMORY — Project Log

## Key decisions
1. **One continuous page, not 14 routes.** A 3-value stage machine (`countdown` →
   `password` → `scrapbook`) keeps the narrative linear; inside the scrapbook every
   section is a `<section>` revealed on scroll with a sticky progress rail.
2. **Config-first.** `src/config/birthday.config.js` exports one `birthday` object that
   contains every string, date, photo reference, wish, coupon, video and map location.
   No component hard-codes personal content.
3. **Music without a music file.** Personal audio was not supplied, so `lib/melody.js`
   synthesises a music-box rendition of "Happy Birthday" with the Web Audio API. If the
   user drops a real file into `public/assets/music/` and sets `config.music.src`, the
   player automatically switches to an HTML `<audio>` element. The player therefore always
   works and never autoplays.
4. **Videos without supplied footage.** `public/assets/videos/` is a documented drop-in
   slot. Config entries carry both a local `src` and a documented demo `remoteSrc`; the
   player tries local first and falls back on error with a visible "demo clip" note.
5. **Real cake geometry.** Section 04 uses true oblique-projection polygons (top face +
   front face + right face per piece, painter's-ordered back-to-front). Cuts animate the
   pieces apart along the correct axes and a selected slice is translated onto the plate —
   no decorative lines, no static picture pretending to be a slice.
6. **Blow detection.** `getUserMedia` + `AnalyserNode`; RMS of the low-frequency bins must
   stay above threshold for ~250ms. Denial/unsupported → friendly note + manual button.
7. **Illustrated placeholders, not fake memories.** The 8 bundled images are original
   watercolour illustrations of *scenes* (café table, picnic, shoreline, fair, rainy window,
   road trip, birthday cake, gift). Captions in the config explicitly describe them as
   illustrated memory placeholders so nothing pretends to be a real personal photograph.
8. **Single-file build.** `vite-plugin-singlefile` inlines JS/CSS/bundled images so
   `dist/index.html` is portable; public assets stay as optional drop-ins.

## Known limitations (documented, non-blocking)
- The password gate is client-side only (intentional — it is a playful surprise).
- Microphone blowing requires HTTPS (or localhost) and a permission grant; a manual
  "blow for me" button always exists.
- Demo video clips are remote stock footage used only until personal videos are added.
- Bundled images are illustrations, not photographs.
