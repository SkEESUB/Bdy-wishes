# public/assets/videos — VIDEO SLOTS

Drop your clips here (MP4 / H.264 + AAC recommended, keep each file under 100 MB).

Then set the local path in `src/config/birthday.config.js`:

```js
videos: [
  { id: "v1", title: "The Surprise Reveal", caption: "…",
    src: "/assets/videos/reveal.mp4",   // ← your file
    remoteSrc: "…",                     // optional demo fallback
    poster: "/assets/images/reveal-poster.jpg" },
]
```

Default config ships with four slots (`reveal.mp4`, `gifts.mp4`,
`party-horn.mp4`, `glitter.mp4`). Because those files don't exist yet, the
player automatically falls back to the documented demo clip and shows a
"demo clip — add your own" note. The moment your file exists at that path, it
is used instead — no code changes needed.

Videos are `preload="none"` and never autoplay: nothing is downloaded until the
recipient presses play.
