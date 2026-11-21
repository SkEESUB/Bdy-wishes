import fs from "fs";
import path from "path";

const targetDirs = [
  path.resolve("public/assets/images"),
  path.resolve("src/assets/images"),
];

targetDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function writeSvg(filename, svgContent) {
  for (const dir of targetDirs) {
    fs.writeFileSync(path.join(dir, filename), svgContent.trim(), "utf8");
  }
}

// 1. surprise-01: The First Hello
writeSvg("surprise-01.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E8F4FD"/>
      <stop offset="100%" stop-color="#CFE6F8"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#g1)"/>
  <rect x="30" y="30" width="540" height="390" rx="16" fill="#FFFFFF" opacity="0.9"/>
  <!-- Cafe table & cups -->
  <ellipse cx="300" cy="340" rx="200" ry="70" fill="#E8D5C4"/>
  <ellipse cx="230" cy="270" rx="45" ry="30" fill="#6FA8D6"/>
  <ellipse cx="230" cy="265" rx="38" ry="22" fill="#FFFFFF"/>
  <ellipse cx="230" cy="265" rx="32" ry="18" fill="#8C6541"/>
  <!-- Cup 2 -->
  <ellipse cx="370" cy="270" rx="45" ry="30" fill="#E48BB0"/>
  <ellipse cx="370" cy="265" rx="38" ry="22" fill="#FFFFFF"/>
  <ellipse cx="370" cy="265" rx="32" ry="18" fill="#8C6541"/>
  <!-- Steam -->
  <path d="M 230 230 Q 220 200 235 170" stroke="#BBDFF5" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 370 230 Q 380 200 365 170" stroke="#F9C8D9" stroke-width="4" fill="none" stroke-linecap="round"/>
  <!-- Small flower vase -->
  <rect x="290" y="210" width="20" height="40" rx="6" fill="#DCD4F2"/>
  <circle cx="300" cy="195" r="14" fill="#FFE9B8"/>
  <circle cx="300" cy="195" r="6" fill="#E48BB0"/>
  <text x="300" y="90" font-family="sans-serif" font-weight="bold" font-size="24" fill="#4A5A6A" text-anchor="middle">THE FIRST HELLO</text>
  <text x="300" y="125" font-family="serif" font-size="16" font-style="italic" fill="#6FA8D6" text-anchor="middle">Where three hours felt like three minutes</text>
</svg>
`);

// 2. surprise-02: A Pocket Full of Reasons
writeSvg("surprise-02.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDE8F0"/>
      <stop offset="100%" stop-color="#F9CADB"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#g2)"/>
  <rect x="30" y="30" width="540" height="390" rx="16" fill="#FFFFFF" opacity="0.9"/>
  <!-- Envelope -->
  <g transform="translate(120, 110)">
    <rect x="0" y="40" width="360" height="230" rx="12" fill="#FFFBF7" stroke="#E48BB0" stroke-width="2"/>
    <path d="M 0 40 L 180 180 L 360 40" fill="#FCECEF" stroke="#E48BB0" stroke-width="2"/>
    <!-- Wax seal -->
    <circle cx="180" cy="180" r="30" fill="#E48BB0"/>
    <circle cx="180" cy="180" r="24" fill="#D4739B"/>
    <path d="M 172 174 C 176 168, 184 168, 188 174 C 192 180, 180 190, 180 190 C 180 190, 168 180, 172 174 Z" fill="#FFFFFF"/>
  </g>
  <text x="300" y="80" font-family="sans-serif" font-weight="bold" font-size="24" fill="#4A5A6A" text-anchor="middle">A POCKET FULL OF REASONS</text>
  <text x="300" y="390" font-family="serif" font-size="16" font-style="italic" fill="#E48BB0" text-anchor="middle">"Six reasons here, six hundred in my heart"</text>
</svg>
`);

// 3. surprise-03: A Tiny Treasure
writeSvg("surprise-03.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F2EEFC"/>
      <stop offset="100%" stop-color="#DDD3F7"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#g3)"/>
  <rect x="30" y="30" width="540" height="390" rx="16" fill="#FFFFFF" opacity="0.9"/>
  <!-- Gift box with little duck -->
  <rect x="200" y="210" width="200" height="150" rx="12" fill="#FFE9B8" stroke="#E6C987" stroke-width="2"/>
  <rect x="180" y="180" width="240" height="40" rx="10" fill="#F9C8D9" stroke="#E48BB0" stroke-width="2"/>
  <rect x="285" y="180" width="30" height="180" fill="#E48BB0"/>
  <!-- Little cute yellow duck peaking -->
  <circle cx="300" cy="140" r="32" fill="#FFDA66"/>
  <circle cx="310" cy="132" r="4" fill="#333333"/>
  <polygon points="325,140 345,145 325,150" fill="#FF8D4D"/>
  <text x="300" y="80" font-family="sans-serif" font-weight="bold" font-size="24" fill="#4A5A6A" text-anchor="middle">A TINY TREASURE</text>
  <text x="300" y="400" font-family="serif" font-size="16" font-style="italic" fill="#7C68A6" text-anchor="middle">Something quirky, handmade, and completely yours</text>
</svg>
`);

// 4. surprise-04: The Song You Always Hum
writeSvg("surprise-04.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="g4" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF8E8"/>
      <stop offset="100%" stop-color="#FFEBB8"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#g4)"/>
  <rect x="30" y="30" width="540" height="390" rx="16" fill="#FFFFFF" opacity="0.9"/>
  <!-- Vinyl Record -->
  <g transform="translate(300, 240)">
    <circle cx="0" cy="0" r="110" fill="#2E3846"/>
    <circle cx="0" cy="0" r="95" fill="none" stroke="#414D5E" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="75" fill="none" stroke="#414D5E" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="55" fill="none" stroke="#414D5E" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="42" fill="#F9C8D9"/>
    <circle cx="0" cy="0" r="10" fill="#2E3846"/>
  </g>
  <text x="440" y="180" font-size="28" fill="#E48BB0">♪</text>
  <text x="160" y="220" font-size="34" fill="#6FA8D6">♫</text>
  <text x="300" y="80" font-family="sans-serif" font-weight="bold" font-size="24" fill="#4A5A6A" text-anchor="middle">THE SONG YOU ALWAYS HUM</text>
  <text x="300" y="395" font-family="serif" font-size="16" font-style="italic" fill="#B38029" text-anchor="middle">Now playing in my head on repeat</text>
</svg>
`);

// 5. surprise-05: Our Rainy Day Rule
writeSvg("surprise-05.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="g5" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#EBF4FA"/>
      <stop offset="100%" stop-color="#D0E3F0"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#g5)"/>
  <rect x="30" y="30" width="540" height="390" rx="16" fill="#FFFFFF" opacity="0.9"/>
  <!-- Cozy window with raindrops -->
  <rect x="150" y="110" width="300" height="230" rx="10" fill="#CDE2F0" stroke="#7E9EB8" stroke-width="6"/>
  <line x1="300" y1="110" x2="300" y2="340" stroke="#7E9EB8" stroke-width="4"/>
  <line x1="150" y1="220" x2="450" y2="220" stroke="#7E9EB8" stroke-width="4"/>
  <!-- Raindrops on glass -->
  <ellipse cx="200" cy="160" rx="4" ry="8" fill="#FFFFFF" opacity="0.8"/>
  <ellipse cx="250" cy="280" rx="3" ry="7" fill="#FFFFFF" opacity="0.8"/>
  <ellipse cx="380" cy="180" rx="4" ry="9" fill="#FFFFFF" opacity="0.8"/>
  <ellipse cx="410" cy="270" rx="3" ry="6" fill="#FFFFFF" opacity="0.8"/>
  <text x="300" y="80" font-family="sans-serif" font-weight="bold" font-size="24" fill="#4A5A6A" text-anchor="middle">OUR RAINY DAY RULE</text>
  <text x="300" y="390" font-family="serif" font-size="16" font-style="italic" fill="#587A96" text-anchor="middle">Blankets, hot cocoa, and no alarms</text>
</svg>
`);

// 6. surprise-06: One Wish Ticket
writeSvg("surprise-06.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="g6" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF6F8"/>
      <stop offset="100%" stop-color="#FCE0E7"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#g6)"/>
  <rect x="30" y="30" width="540" height="390" rx="16" fill="#FFFFFF" opacity="0.9"/>
  <!-- Vintage ticket -->
  <g transform="translate(100, 150) rotate(-2)">
    <rect x="0" y="0" width="400" height="150" rx="12" fill="#FFE9B8" stroke="#D9A94B" stroke-width="3"/>
    <line x1="280" y1="0" x2="280" y2="150" stroke="#D9A94B" stroke-width="2" stroke-dasharray="6,6"/>
    <text x="140" y="50" font-family="sans-serif" font-weight="900" font-size="18" fill="#8C6528" text-anchor="middle">GOLDEN WISH TICKET</text>
    <text x="140" y="90" font-family="serif" font-size="24" font-weight="bold" fill="#5E4317" text-anchor="middle">Admit One Dream</text>
    <text x="140" y="125" font-family="monospace" font-size="12" fill="#8C6528" text-anchor="middle">NO EXPIRY • INFINITE USES</text>
    <text x="340" y="80" font-family="sans-serif" font-weight="bold" font-size="28" fill="#E48BB0" text-anchor="middle">★</text>
  </g>
  <text x="300" y="90" font-family="sans-serif" font-weight="bold" font-size="24" fill="#4A5A6A" text-anchor="middle">ONE WISH TICKET</text>
  <text x="300" y="380" font-family="serif" font-size="16" font-style="italic" fill="#8C6528" text-anchor="middle">Redeemable whenever you wish</text>
</svg>
`);

// 7. surprise-07: Golden Hour Glow
writeSvg("surprise-07.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="g7" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFE8D6"/>
      <stop offset="50%" stop-color="#FFD1B3"/>
      <stop offset="100%" stop-color="#C9EBDD"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#g7)"/>
  <rect x="30" y="30" width="540" height="390" rx="16" fill="#FFFFFF" opacity="0.88"/>
  <!-- Sunset hill -->
  <circle cx="300" cy="180" r="60" fill="#FFA366" opacity="0.8"/>
  <ellipse cx="300" cy="360" rx="280" ry="120" fill="#C9EBDD"/>
  <ellipse cx="180" cy="380" rx="200" ry="100" fill="#B3DFC9"/>
  <!-- Little picnic blanket -->
  <polygon points="260,300 340,300 370,330 230,330" fill="#F9C8D9"/>
  <text x="300" y="80" font-family="sans-serif" font-weight="bold" font-size="24" fill="#4A5A6A" text-anchor="middle">GOLDEN HOUR GLOW</text>
  <text x="300" y="390" font-family="serif" font-size="16" font-style="italic" fill="#B36633" text-anchor="middle">When the sky turned peach just for you</text>
</svg>
`);

// 8. surprise-08: The Quiz Nobody Wins
writeSvg("surprise-08.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="g8" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E8F8F2"/>
      <stop offset="100%" stop-color="#CEF0E2"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#g8)"/>
  <rect x="30" y="30" width="540" height="390" rx="16" fill="#FFFFFF" opacity="0.9"/>
  <!-- Trophy / Award ribbon -->
  <circle cx="300" cy="210" r="50" fill="#FFE9B8" stroke="#D9A94B" stroke-width="3"/>
  <text x="300" y="225" font-size="44" text-anchor="middle">🏆</text>
  <path d="M 270 250 L 250 320 L 280 300 L 300 320 Z" fill="#E48BB0"/>
  <path d="M 330 250 L 350 320 L 320 300 L 300 320 Z" fill="#6FA8D6"/>
  <text x="300" y="80" font-family="sans-serif" font-weight="bold" font-size="24" fill="#4A5A6A" text-anchor="middle">THE QUIZ NOBODY WINS</text>
  <text x="300" y="390" font-family="serif" font-size="16" font-style="italic" fill="#2E7558" text-anchor="middle">Result: You win every single category ★★★★★</text>
</svg>
`);

// 9. surprise-09: Seashell Souvenir
writeSvg("surprise-09.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="g9" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E6F2F8"/>
      <stop offset="100%" stop-color="#C2DFEE"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#g9)"/>
  <rect x="30" y="30" width="540" height="390" rx="16" fill="#FFFFFF" opacity="0.9"/>
  <!-- Seashell illustration -->
  <g transform="translate(300, 220)">
    <path d="M -70 40 Q 0 -90 70 40 Q 0 80 -70 40 Z" fill="#FCE8EE" stroke="#E48BB0" stroke-width="3"/>
    <line x1="0" y1="65" x2="-50" y2="20" stroke="#E48BB0" stroke-width="2"/>
    <line x1="0" y1="65" x2="-25" y2="-20" stroke="#E48BB0" stroke-width="2"/>
    <line x1="0" y1="65" x2="0" y2="-40" stroke="#E48BB0" stroke-width="2"/>
    <line x1="0" y1="65" x2="25" y2="-20" stroke="#E48BB0" stroke-width="2"/>
    <line x1="0" y1="65" x2="50" y2="20" stroke="#E48BB0" stroke-width="2"/>
  </g>
  <text x="300" y="80" font-family="sans-serif" font-weight="bold" font-size="24" fill="#4A5A6A" text-anchor="middle">SEASHELL SOUVENIR</text>
  <text x="300" y="390" font-family="serif" font-size="16" font-style="italic" fill="#4A758C" text-anchor="middle">Forty-one counted, one kept forever</text>
</svg>
`);

// 10. surprise-10: Midnight Confession
writeSvg("surprise-10.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="g10" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1B2238"/>
      <stop offset="60%" stop-color="#2D3A5C"/>
      <stop offset="100%" stop-color="#4B5678"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#g10)"/>
  <rect x="30" y="30" width="540" height="390" rx="16" fill="#14192B" opacity="0.75" stroke="#FFE9B8" stroke-width="1"/>
  <!-- Crescent Moon -->
  <circle cx="300" cy="180" r="55" fill="#FFE9B8"/>
  <circle cx="280" cy="170" r="50" fill="#14192B"/>
  <!-- Stars -->
  <circle cx="160" cy="120" r="3" fill="#FFF"/>
  <circle cx="440" cy="140" r="3" fill="#FFF"/>
  <circle cx="200" cy="280" r="3" fill="#FFF"/>
  <circle cx="410" cy="260" r="3" fill="#FFF"/>
  <text x="300" y="80" font-family="sans-serif" font-weight="bold" font-size="24" fill="#FFF" text-anchor="middle">MIDNIGHT CONFESSION</text>
  <text x="300" y="380" font-family="serif" font-size="16" font-style="italic" fill="#E4D3F5" text-anchor="middle">"You are far more important than you know"</text>
</svg>
`);

// 11. surprise-11: A Little Doodle
writeSvg("surprise-11.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="g11" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF5F0"/>
      <stop offset="100%" stop-color="#FFE6DA"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#g11)"/>
  <rect x="30" y="30" width="540" height="390" rx="16" fill="#FFFFFF" opacity="0.9"/>
  <!-- Big pink doodle heart -->
  <path d="M 300 230 C 260 160, 200 190, 230 250 C 250 290, 300 320, 300 320 C 300 320, 350 290, 370 250 C 400 190, 340 160, 300 230 Z" fill="#F9C8D9" stroke="#E48BB0" stroke-width="5"/>
  <circle cx="210" cy="150" r="20" fill="#FFE9B8"/>
  <text x="300" y="80" font-family="sans-serif" font-weight="bold" font-size="24" fill="#4A5A6A" text-anchor="middle">A LITTLE DOODLE</text>
  <text x="300" y="390" font-family="serif" font-size="16" font-style="italic" fill="#D4739B" text-anchor="middle">Hand-drawn with love and zero artistic restraint</text>
</svg>
`);

// 12. surprise-12: The Last Piece of Cake
writeSvg("surprise-12.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="g12" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#EAF8F1"/>
      <stop offset="100%" stop-color="#CBEFE0"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#g12)"/>
  <rect x="30" y="30" width="540" height="390" rx="16" fill="#FFFFFF" opacity="0.9"/>
  <!-- Cake slice -->
  <g transform="translate(300, 240)">
    <polygon points="-80,40 60,-20 90,40" fill="#FFE9B8" stroke="#E6C87C" stroke-width="2"/>
    <polygon points="-80,40 90,40 90,80 -80,80" fill="#F9C8D9"/>
    <!-- Candle -->
    <rect x="-10" y="-70" width="12" height="50" rx="3" fill="#BBDFF5"/>
    <ellipse cx="-4" cy="-80" rx="6" ry="10" fill="#FFB84D"/>
    <ellipse cx="-4" cy="-80" rx="3" ry="6" fill="#FFF3C4"/>
  </g>
  <text x="300" y="80" font-family="sans-serif" font-weight="bold" font-size="24" fill="#4A5A6A" text-anchor="middle">THE LAST PIECE OF CAKE</text>
  <text x="300" y="390" font-family="serif" font-size="16" font-style="italic" fill="#2E7558" text-anchor="middle">Saved 100% for you • Happy Birthday!</text>
</svg>
`);

// Also copy or symlink files to surprise-01.jpg .. surprise-12.jpg if needed
for (let i = 1; i <= 12; i++) {
  const num = String(i).padStart(2, "0");
  for (const dir of targetDirs) {
    const svgPath = path.join(dir, `surprise-${num}.svg`);
    const jpgPath = path.join(dir, `surprise-${num}.jpg`);
    if (fs.existsSync(svgPath) && !fs.existsSync(jpgPath)) {
      // copy svg content into jpg file extension so both paths resolve
      fs.copyFileSync(svgPath, jpgPath);
    }
  }
}

console.log("Generated 12 distinct surprise assets (surprise-01 to surprise-12) successfully!");
