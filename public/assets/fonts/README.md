# public/assets/fonts — OPTIONAL HANDWRITING SLOTS

The site already loads **Caveat**, **Gaegu**, **Patrick Hand** and **Quicksand**
from Google Fonts (see `index.html`). To use your own — or the recipient's real
handwriting — drop the files here and self-host them instead:

```css
/* src/index.css — add above the @theme block */
@font-face {
  font-family: "Her Handwriting";
  src: url("/assets/fonts/handwriting.woff2") format("woff2");
  font-display: swap;
}
```

```js
// src/index.css → @theme
--font-hand: "Her Handwriting", "Caveat", cursive;
```

Then update the Google Fonts `<link>` in `index.html` if you want to drop the
network dependency entirely (keeps the site fully offline).
