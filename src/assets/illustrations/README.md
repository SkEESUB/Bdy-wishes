# public/assets/illustrations — STICKER & DOODLE SLOTS

Optional extras: little SVG/PNG stickers, doodles or scans (hand-drawn hearts,
washi tape, pressed flowers, handwriting samples…).

Use them anywhere a config field accepts an image `src`, e.g. inside a
surprise card, the gift reveal, or the memory map:

```js
surprises: [
  { id: "s11", type: "photo", image: "/assets/illustrations/doodle-heart.svg", … },
]
```

Most of the cute artwork on the site (flowers, hearts, balloons, bows,
butterflies, stars, clouds, suns, leaves, cupcakes, stick figures, vinyl notes)
is drawn inline as SVG in `src/components/decor/Stickers.jsx` — edit that file
if you want to restyle the illustration set itself.
