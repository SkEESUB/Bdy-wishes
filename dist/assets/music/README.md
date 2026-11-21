# public/assets/music — MUSIC SLOT

Drop one song here (MP3, M4A or OGG) and enable it in the config:

```js
// src/config/birthday.config.js
music: {
  src: "/assets/music/our-song.mp3",   // ← set this
  title: "Our Song",
  artist: "The Artist",
  durationLabel: "3:42",
}
```

**While `src` is `null`**, the vinyl player uses a built-in Web Audio music-box
rendition of "Happy Birthday" (`src/lib/melody.js`), so the section always
works and never needs a download. As soon as `src` points at a real file the
player switches to an HTML `<audio>` element with full seek/volume support.

Notes
- Audio never autoplays; playback only starts on the recipient's tap.
- If the file is missing or fails to decode, the player falls back to the
  music-box mode and shows a friendly note instead of breaking.
- Mind licensing: use a song you own or have the rights to share.
