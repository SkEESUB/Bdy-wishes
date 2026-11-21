# public/assets/images — PHOTO SLOTS

Drop your own photographs here and point a config field at them, e.g.

```js
// src/config/birthday.config.js
gallery: [
  { id: "g1", src: "/assets/images/us-cafe.jpg", caption: "our first coffee", rotate: -3 },
]
```

Suggested files (any name works — just match them in the config):

| file | used by |
|---|---|
| `cafe.jpg` | `surprises[0].image`, `gallery[0].src`, `memoryMap[0].image` |
| `picnic.jpg` | `surprises[6].image`, `gallery[1].src`, `memoryMap[1].image` |
| `shore.jpg` | `surprises[8].image`, `gallery[2].src`, `memoryMap[2].image` |
| `fair.jpg` | `surprises[11].image`, `gallery[3].src`, `memoryMap[3].image` |
| `rainy.jpg` | `surprises[4].image`, `gallery[4].src` |
| `roadtrip.jpg` | `surprises[11].image`, `gallery[5].src`, `memoryMap[4].image` |
| `gift.jpg` | `gift.image`, `surprises[2].image` |

The bundled defaults (`src/assets/images/*.jpg`) are **original decorative
illustrations**, not personal photographs — they are clearly labelled as
illustrated memory placeholders in the UI until you replace them.

Tips: export JPG at ~1200px wide, quality 80 (keeps the page fast). Any image
that fails to load degrades gracefully to a plain pastel panel.
