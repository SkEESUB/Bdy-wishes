import fs from "fs";
import path from "path";

const targetDirs = [
  path.resolve("public/assets/images/surprises"),
  path.resolve("src/assets/images/surprises"),
];

targetDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function writeAsset(baseName, svgContent) {
  for (const dir of targetDirs) {
    const svgPath = path.join(dir, `${baseName}.svg`);
    const jpgPath = path.join(dir, `${baseName}.jpg`);
    fs.writeFileSync(svgPath, svgContent.trim(), "utf8");
    fs.writeFileSync(jpgPath, svgContent.trim(), "utf8");
  }
}

// 1. surprise-01-rose: Beautiful red rose with soft lighting & romantic presentation
writeAsset("surprise-01-rose", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <radialGradient id="roseGlow" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#FFF0F3"/>
      <stop offset="60%" stop-color="#FCD5DF"/>
      <stop offset="100%" stop-color="#F7BACB"/>
    </radialGradient>
    <radialGradient id="petalDark" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#E62744"/>
      <stop offset="70%" stop-color="#B8142D"/>
      <stop offset="100%" stop-color="#7A0A1C"/>
    </radialGradient>
    <radialGradient id="petalLight" cx="45%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#FF526B"/>
      <stop offset="75%" stop-color="#DC1E3A"/>
      <stop offset="100%" stop-color="#9E0E22"/>
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#801020" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="600" height="450" fill="url(#roseGlow)"/>
  <circle cx="300" cy="210" r="170" fill="#FFFFFF" opacity="0.6"/>

  <g transform="translate(300, 210)" filter="url(#shadow)">
    <!-- Stem and leaves -->
    <path d="M -10 90 Q 10 160 -15 220" stroke="#4A7545" stroke-width="10" stroke-linecap="round" fill="none"/>
    <path d="M 5 130 Q 70 120 90 145 Q 60 170 0 140 Z" fill="#588B52"/>
    <path d="M -5 170 Q -70 160 -90 190 Q -50 210 -10 180 Z" fill="#467340"/>

    <!-- Outer petals -->
    <path d="M -80 30 C -120 -30, -70 -90, 0 -80 C 70 -90, 120 -30, 80 30 C 50 90, -50 90, -80 30 Z" fill="url(#petalDark)"/>
    <path d="M -90 -10 C -110 -70, -40 -110, 10 -90 C 70 -110, 110 -60, 80 -10 C 60 40, -60 40, -90 -10 Z" fill="url(#petalLight)"/>
    <path d="M -60 -40 C -80 -90, 0 -120, 50 -80 C 90 -40, 60 20, 0 10 C -50 20, -70 -10, -60 -40 Z" fill="url(#petalDark)"/>

    <!-- Inner bud swirls -->
    <ellipse cx="0" cy="-35" rx="46" ry="50" fill="url(#petalLight)"/>
    <path d="M -25 -50 C -10 -75, 25 -70, 20 -45 C 15 -25, -20 -30, -25 -50 Z" fill="#9E0E22"/>
    <path d="M -15 -42 Q 0 -62 18 -40 Q 5 -20 -15 -42 Z" fill="#E62744"/>

    <!-- Dew drops -->
    <circle cx="-35" cy="-20" r="4.5" fill="#FFFFFF" opacity="0.75"/>
    <circle cx="40" cy="10" r="3.5" fill="#FFFFFF" opacity="0.7"/>
    <circle cx="15" cy="-60" r="2.5" fill="#FFFFFF" opacity="0.8"/>
  </g>
</svg>
`);

// 2. surprise-02-chocolates: Premium chocolates with beautiful wrapping
writeAsset("surprise-02-chocolates", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <radialGradient id="chocBg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#FFF5E8"/>
      <stop offset="60%" stop-color="#FDE6CC"/>
      <stop offset="100%" stop-color="#F8D3B0"/>
    </radialGradient>
    <linearGradient id="chocDark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#542B1A"/>
      <stop offset="100%" stop-color="#2D150B"/>
    </linearGradient>
    <linearGradient id="chocMilk" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7C462B"/>
      <stop offset="100%" stop-color="#4B2412"/>
    </linearGradient>
    <linearGradient id="goldWrap" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFE899"/>
      <stop offset="50%" stop-color="#D9A934"/>
      <stop offset="100%" stop-color="#946C15"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#chocBg)"/>
  <ellipse cx="300" cy="235" rx="190" ry="140" fill="#FFFFFF" opacity="0.65"/>

  <!-- Chocolate box platter -->
  <rect x="130" y="110" width="340" height="240" rx="28" fill="#FFF9F2" stroke="#E6C8AA" stroke-width="3"/>
  <rect x="145" y="125" width="310" height="210" rx="20" fill="#F4E3D3"/>

  <!-- Praline 1: Heart Chocolate -->
  <g transform="translate(200, 175)">
    <path d="M 0 10 C -25 -20, -50 5, 0 45 C 50 5, 25 -20, 0 10 Z" fill="url(#chocDark)"/>
    <path d="M -5 10 Q 0 -5 10 5" stroke="#DDA876" stroke-width="3" stroke-linecap="round" fill="none"/>
  </g>

  <!-- Praline 2: Gold Foil Truffle -->
  <g transform="translate(300, 175)">
    <circle cx="0" cy="15" r="30" fill="url(#goldWrap)"/>
    <path d="M -20 5 Q 0 -15 20 5 Q 0 25 -20 5 Z" fill="#FFEAA8" opacity="0.6"/>
  </g>

  <!-- Praline 3: Swirled Milk Truffle -->
  <g transform="translate(400, 175)">
    <rect x="-26" y="-10" width="52" height="52" rx="12" fill="url(#chocMilk)"/>
    <path d="M -18 8 Q 0 -10 18 8 Q 0 26 -18 20" stroke="#FFF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.85"/>
  </g>

  <!-- Praline 4: White & Dark Swirl -->
  <g transform="translate(200, 275)">
    <rect x="-26" y="-10" width="52" height="52" rx="12" fill="url(#chocMilk)"/>
    <circle cx="0" cy="16" r="14" fill="#FFF4E6"/>
  </g>

  <!-- Praline 5: Dusted Cocoa Sphere -->
  <g transform="translate(300, 275)">
    <circle cx="0" cy="16" r="28" fill="url(#chocDark)"/>
    <circle cx="-5" cy="10" r="18" fill="#753F24" opacity="0.6"/>
  </g>

  <!-- Praline 6: Gold Ribbon Box accent -->
  <g transform="translate(400, 275)">
    <path d="M 0 10 C -25 -20, -50 5, 0 45 C 50 5, 25 -20, 0 10 Z" fill="url(#chocDark)"/>
    <circle cx="0" cy="15" r="5" fill="url(#goldWrap)"/>
  </g>
</svg>
`);

// 3. surprise-03-bow-hairpins: Cute decorative pink pastel bow clips
writeAsset("surprise-03-bow-hairpins", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <radialGradient id="bowBg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#FFF0F5"/>
      <stop offset="60%" stop-color="#FCDFEA"/>
      <stop offset="100%" stop-color="#F7C4DA"/>
    </radialGradient>
    <linearGradient id="ribbonPink" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFA8C5"/>
      <stop offset="50%" stop-color="#F47BA2"/>
      <stop offset="100%" stop-color="#D94F7B"/>
    </linearGradient>
    <linearGradient id="goldClip" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#EED596"/>
      <stop offset="100%" stop-color="#C59C43"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#bowBg)"/>
  <circle cx="300" cy="225" r="170" fill="#FFFFFF" opacity="0.6"/>

  <!-- Left hairpin (larger) -->
  <g transform="translate(230, 200) rotate(-14)">
    <!-- Gold metal bobby pin / alligator clip -->
    <rect x="-120" y="8" width="220" height="12" rx="6" fill="url(#goldClip)"/>
    <circle cx="95" cy="14" r="9" fill="url(#goldClip)"/>

    <!-- Fabric Bow Left Loop -->
    <path d="M 0 14 C -60 -45, -100 -20, -75 25 C -55 55, -20 25, 0 14 Z" fill="url(#ribbonPink)"/>
    <path d="M -5 14 C -45 -25, -75 -5, -55 22 Z" fill="#FFC7DB" opacity="0.6"/>

    <!-- Fabric Bow Right Loop -->
    <path d="M 0 14 C 60 -45, 100 -20, 75 25 C 55 55, 20 25, 0 14 Z" fill="url(#ribbonPink)"/>
    <path d="M 5 14 C 45 -25, 75 -5, 55 22 Z" fill="#FFC7DB" opacity="0.6"/>

    <!-- Ribbons hanging -->
    <path d="M -8 18 Q -45 65 -60 100 Q -35 85 -5 30 Z" fill="url(#ribbonPink)"/>
    <path d="M 8 18 Q 45 65 60 100 Q 35 85 5 30 Z" fill="url(#ribbonPink)"/>

    <!-- Center knot with pearl -->
    <ellipse cx="0" cy="14" rx="16" ry="18" fill="#D94F7B"/>
    <circle cx="0" cy="14" r="8" fill="#FFFFFF"/>
    <circle cx="-2" cy="12" r="3" fill="#FFFFFF" opacity="0.8"/>
  </g>

  <!-- Right hairpin (smaller companion) -->
  <g transform="translate(390, 260) rotate(16)">
    <rect x="-80" y="6" width="160" height="10" rx="5" fill="url(#goldClip)"/>
    <path d="M 0 10 C -45 -35, -75 -15, -55 20 C -40 45, -15 20, 0 10 Z" fill="url(#ribbonPink)"/>
    <path d="M 0 10 C 45 -35, 75 -15, 55 20 C 40 45, 15 20, 0 10 Z" fill="url(#ribbonPink)"/>
    <ellipse cx="0" cy="10" rx="12" ry="14" fill="#D94F7B"/>
    <circle cx="0" cy="10" r="6" fill="#FFF"/>
  </g>
</svg>
`);

// 4. surprise-04-coffee-cup: Cute pastel ceramic coffee cup with latte heart
writeAsset("surprise-04-coffee-cup", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <radialGradient id="coffeeBg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#F3F7FA"/>
      <stop offset="60%" stop-color="#DEEBF5"/>
      <stop offset="100%" stop-color="#C2DCED"/>
    </radialGradient>
    <linearGradient id="cupCeramic" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#E2EEF7"/>
      <stop offset="100%" stop-color="#B8D5EB"/>
    </linearGradient>
    <linearGradient id="coffeeBrew" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8F5635"/>
      <stop offset="100%" stop-color="#5E331B"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#coffeeBg)"/>
  <ellipse cx="300" cy="245" rx="190" ry="130" fill="#FFFFFF" opacity="0.6"/>

  <g transform="translate(290, 240)">
    <!-- Saucer -->
    <ellipse cx="0" cy="85" rx="155" ry="40" fill="#FFFFFF" stroke="#CADDEB" stroke-width="3"/>
    <ellipse cx="0" cy="83" rx="120" ry="26" fill="#EBF3F9"/>

    <!-- Cup handle -->
    <path d="M 85 -10 C 150 -10, 150 60, 80 55" fill="none" stroke="url(#cupCeramic)" stroke-width="22" stroke-linecap="round"/>
    <path d="M 85 -10 C 145 -10, 145 60, 80 55" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round"/>

    <!-- Cup Body -->
    <path d="M -95 -20 L 95 -20 C 90 70, 60 90, 0 90 C -60 90, -90 70, -95 -20 Z" fill="url(#cupCeramic)" stroke="#CADDEB" stroke-width="2"/>

    <!-- Cup Rim & Coffee Surface -->
    <ellipse cx="0" cy="-20" rx="95" ry="32" fill="#FFFFFF" stroke="#CADDEB" stroke-width="2"/>
    <ellipse cx="0" cy="-20" rx="84" ry="26" fill="url(#coffeeBrew)"/>

    <!-- Latte Art Heart -->
    <path d="M 0 -16 C -20 -38, -40 -18, 0 0 C 40 -18, 20 -38, 0 -16 Z" fill="#FFF2DF"/>

    <!-- Rising steam -->
    <path d="M -25 -65 Q -40 -95 -20 -125 Q -5 -155 -15 -180" stroke="#FFFFFF" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.75"/>
    <path d="M 15 -65 Q 35 -95 15 -125 Q -5 -155 10 -180" stroke="#FFFFFF" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.75"/>
  </g>
</svg>
`);

// 5. surprise-05-tulip-bracelet: Delicate tulip charm bracelet
writeAsset("surprise-05-tulip-bracelet", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <radialGradient id="tulipBg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#FFF3F6"/>
      <stop offset="60%" stop-color="#FEE0E9"/>
      <stop offset="100%" stop-color="#FCC7D7"/>
    </radialGradient>
    <linearGradient id="roseGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFE3D4"/>
      <stop offset="50%" stop-color="#EAA68A"/>
      <stop offset="100%" stop-color="#C27357"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#tulipBg)"/>
  <circle cx="300" cy="225" r="170" fill="#FFFFFF" opacity="0.6"/>

  <g transform="translate(300, 220)">
    <!-- Bracelet chain loop -->
    <ellipse cx="0" cy="0" rx="140" ry="85" fill="none" stroke="url(#roseGold)" stroke-width="7"/>

    <!-- Small beaded links along bracelet -->
    ${[-130, -90, -45, 0, 45, 90, 130].map((x) => `<circle cx="${x}" cy="${Math.sqrt(Math.max(0, 1 - (x/140)**2)) * 85}" r="5" fill="#FFFFFF" stroke="#EAA68A" stroke-width="2"/>`).join("")}
    ${[-110, -65, -20, 25, 70, 110].map((x) => `<circle cx="${x}" cy="${-Math.sqrt(Math.max(0, 1 - (x/140)**2)) * 85}" r="4" fill="#FFFFFF" stroke="#EAA68A" stroke-width="2"/>`).join("")}

    <!-- Center Tulip Charm -->
    <g transform="translate(0, 85)">
      <circle cx="0" cy="0" r="6" fill="url(#roseGold)"/>
      <line x1="0" y1="0" x2="0" y2="18" stroke="url(#roseGold)" stroke-width="4"/>
      <!-- Tulip petals -->
      <path d="M 0 20 C -22 22, -26 48, -12 60 C 0 70, 0 70, 0 70 C 0 70, 0 70, 12 60 C 26 48, 22 22, 0 20 Z" fill="#FF789E"/>
      <path d="M 0 25 C -12 28, -15 48, 0 65 C 15 48, 12 28, 0 25 Z" fill="#FF4D7E"/>
      <ellipse cx="0" cy="38" rx="6" ry="14" fill="#FFA5C0"/>
      <!-- Tiny stem leaf -->
      <path d="M 0 68 Q -10 74 -16 70" stroke="#68A362" stroke-width="3" fill="none"/>
    </g>

    <!-- Side Little Flower Charms -->
    <g transform="translate(-75, 70)">
      <circle cx="0" cy="18" r="10" fill="#FFF" stroke="#EAA68A" stroke-width="2"/>
      <circle cx="0" cy="18" r="4" fill="#FFB8CE"/>
    </g>
    <g transform="translate(75, 70)">
      <circle cx="0" cy="18" r="10" fill="#FFF" stroke="#EAA68A" stroke-width="2"/>
      <circle cx="0" cy="18" r="4" fill="#FFB8CE"/>
    </g>
  </g>
</svg>
`);

// 6. surprise-06-poka-tree: Beautiful small decorative plant/tree in cute pastel pot
writeAsset("surprise-06-poka-tree", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <radialGradient id="treeBg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#F2FAF5"/>
      <stop offset="60%" stop-color="#DDF2E6"/>
      <stop offset="100%" stop-color="#C0E5CE"/>
    </radialGradient>
    <linearGradient id="potGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFEAD9"/>
      <stop offset="100%" stop-color="#F6CCA9"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#treeBg)"/>
  <circle cx="300" cy="225" r="170" fill="#FFFFFF" opacity="0.6"/>

  <g transform="translate(300, 240)">
    <!-- Table shadow -->
    <ellipse cx="0" cy="130" rx="90" ry="20" fill="#A8D4BC" opacity="0.5"/>

    <!-- Ceramic Pot -->
    <path d="M -55 40 L 55 40 L 42 120 C 40 128, -40 128, -42 120 Z" fill="url(#potGrad)" stroke="#DFB087" stroke-width="3"/>
    <ellipse cx="0" cy="40" rx="55" ry="14" fill="#FFEFE3" stroke="#DFB087" stroke-width="3"/>
    <ellipse cx="0" cy="42" rx="46" ry="10" fill="#6B4E38"/>

    <!-- Tree Trunk / Stem -->
    <path d="M 0 42 Q -8 -20 -4 -70 Q -2 -110 0 -130" stroke="#7A543A" stroke-width="12" stroke-linecap="round" fill="none"/>
    <path d="M -4 -30 Q 30 -50 50 -70" stroke="#7A543A" stroke-width="8" stroke-linecap="round" fill="none"/>
    <path d="M -4 -50 Q -35 -80 -55 -100" stroke="#7A543A" stroke-width="7" stroke-linecap="round" fill="none"/>

    <!-- Lush Green Leaves (Poka tree / Money plant leaves) -->
    <!-- Center Top Leaf -->
    <path d="M 0 -130 C -30 -160, -35 -190, 0 -210 C 35 -190, 30 -160, 0 -130 Z" fill="#489C57"/>
    <path d="M 0 -130 Q 0 -170 0 -205" stroke="#73C782" stroke-width="2" fill="none"/>

    <!-- Left leaves -->
    <path d="M -55 -100 C -95 -110, -115 -140, -85 -160 C -60 -150, -45 -120, -55 -100 Z" fill="#3D8B4B"/>
    <path d="M -20 -10 C -55 -15, -70 -40, -50 -60 C -30 -50, -15 -30, -20 -10 Z" fill="#59AE69"/>

    <!-- Right leaves -->
    <path d="M 50 -70 C 95 -75, 115 -105, 85 -125 C 60 -115, 45 -85, 50 -70 Z" fill="#52A562"/>
    <path d="M 20 10 C 60 5, 75 -20, 55 -40 C 35 -30, 20 -10, 20 10 Z" fill="#67BC77"/>

    <!-- Cute smiling face on the pot -->
    <circle cx="-16" cy="80" r="3.5" fill="#523927"/>
    <circle cx="16" cy="80" r="3.5" fill="#523927"/>
    <path d="M -8 92 Q 0 100 8 92" stroke="#523927" stroke-width="3" stroke-linecap="round" fill="none"/>
    <circle cx="-25" cy="88" r="5" fill="#FF9999" opacity="0.6"/>
    <circle cx="25" cy="88" r="5" fill="#FF9999" opacity="0.6"/>
  </g>
</svg>
`);

// 7. surprise-07-rings: Two elegant endless bond rings with soft sparkle
writeAsset("surprise-07-rings", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <radialGradient id="ringBg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#FAF5FF"/>
      <stop offset="60%" stop-color="#EFE2FC"/>
      <stop offset="100%" stop-color="#DDC4F7"/>
    </radialGradient>
    <linearGradient id="goldRing" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF0B8"/>
      <stop offset="50%" stop-color="#F2BA38"/>
      <stop offset="100%" stop-color="#A87A13"/>
    </linearGradient>
    <linearGradient id="silverRing" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#D8E2EC"/>
      <stop offset="100%" stop-color="#9BAFC1"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#ringBg)"/>
  <ellipse cx="300" cy="245" rx="180" ry="120" fill="#FFFFFF" opacity="0.65"/>

  <!-- Velvet display cushion -->
  <ellipse cx="300" cy="260" rx="140" ry="55" fill="#E6D3F8" stroke="#D3B4F0" stroke-width="3"/>
  <ellipse cx="300" cy="255" rx="120" ry="42" fill="#F4ECFC"/>

  <!-- Ring 1 (Gold, tilted left) -->
  <g transform="translate(265, 220) rotate(-22)">
    <ellipse cx="0" cy="0" rx="55" ry="55" fill="none" stroke="url(#goldRing)" stroke-width="14"/>
    <ellipse cx="0" cy="0" rx="55" ry="55" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.6"/>
  </g>

  <!-- Ring 2 (Silver with Solitaire Diamond, tilted right, linked) -->
  <g transform="translate(335, 215) rotate(22)">
    <ellipse cx="0" cy="0" rx="55" ry="55" fill="none" stroke="url(#silverRing)" stroke-width="14"/>
    <ellipse cx="0" cy="0" rx="55" ry="55" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.8"/>

    <!-- Diamond setting -->
    <g transform="translate(0, -56)">
      <polygon points="0,-18 14,-4 9,10 -9,10 -14,-4" fill="#E8F4FD" stroke="#B8D5EB" stroke-width="2"/>
      <polygon points="0,-18 9,10 -9,10" fill="#FFFFFF"/>
      <!-- Sparkle stars -->
      <path d="M 0 -35 L 3 -24 L 14 -21 L 3 -18 L 0 -7 L -3 -18 L -14 -21 L -3 -24 Z" fill="#FFFFFF"/>
    </g>
  </g>

  <!-- Ambient light glints -->
  <circle cx="240" cy="170" r="3" fill="#FFFFFF"/>
  <circle cx="380" cy="160" r="4" fill="#FFFFFF"/>
</svg>
`);

// 8. surprise-08-pendant: Elegant sparkling memory pendant necklace
writeAsset("surprise-08-pendant", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <radialGradient id="pendantBg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#FFFBF0"/>
      <stop offset="60%" stop-color="#FEEFC7"/>
      <stop offset="100%" stop-color="#F9DE96"/>
    </radialGradient>
    <linearGradient id="goldChain" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF2B8"/>
      <stop offset="50%" stop-color="#E5AF36"/>
      <stop offset="100%" stop-color="#A17210"/>
    </linearGradient>
    <linearGradient id="gemGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="40%" stop-color="#E8F4FD"/>
      <stop offset="100%" stop-color="#9BC8EA"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#pendantBg)"/>
  <circle cx="300" cy="225" r="170" fill="#FFFFFF" opacity="0.6"/>

  <g transform="translate(300, 200)">
    <!-- Fine necklace chain drape -->
    <path d="M -160 -120 Q 0 80 0 90 Q 0 80 160 -120" fill="none" stroke="url(#goldChain)" stroke-width="4" stroke-dasharray="7,3"/>

    <!-- Pendant Bail -->
    <ellipse cx="0" cy="94" rx="7" ry="11" fill="url(#goldChain)"/>
    <circle cx="0" cy="94" r="4" fill="#FFFBF0"/>

    <!-- Main Pendant Frame: Vintage teardrop with sparkling jewel -->
    <g transform="translate(0, 130)">
      <!-- Gold outer halo -->
      <path d="M 0 -22 C -32 5, -35 48, 0 65 C 35 48, 32 5, 0 -22 Z" fill="url(#goldChain)"/>

      <!-- Inner Crystal Teardrop -->
      <path d="M 0 -15 C -24 8, -26 40, 0 54 C 26 40, 24 8, 0 -15 Z" fill="url(#gemGrad)"/>

      <!-- Diamond facets -->
      <polygon points="0,-15 -14,16 0,32 14,16" fill="#FFFFFF" opacity="0.7"/>
      <polygon points="0,32 -18,22 -14,46 0,54" fill="#75A8CC" opacity="0.5"/>
      <polygon points="0,32 18,22 14,46 0,54" fill="#A8D4F2" opacity="0.6"/>

      <!-- Starburst sparkle -->
      <path d="M 0 10 L 4 22 L 16 26 L 4 30 L 0 42 L -4 30 L -16 26 L -4 22 Z" fill="#FFFFFF"/>
    </g>

    <circle cx="-12" cy="115" r="2.5" fill="#FFFFFF"/>
    <circle cx="15" cy="135" r="3" fill="#FFFFFF"/>
  </g>
</svg>
`);

// 9. surprise-09-lighting-panda: Glowing cute panda night lamp
writeAsset("surprise-09-lighting-panda", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <radialGradient id="nightBg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#2D354E"/>
      <stop offset="60%" stop-color="#1E2335"/>
      <stop offset="100%" stop-color="#141724"/>
    </radialGradient>
    <radialGradient id="pandaGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF9D2"/>
      <stop offset="50%" stop-color="#FFE885" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#FFE885" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="lampSilicone" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="70%" stop-color="#FFFEE6"/>
      <stop offset="100%" stop-color="#FFEFA8"/>
    </radialGradient>
  </defs>
  <rect width="600" height="450" fill="url(#nightBg)"/>

  <!-- Warm ambient halo -->
  <circle cx="300" cy="225" r="190" fill="url(#pandaGlow)"/>

  <!-- Stars in background -->
  <circle cx="100" cy="80" r="2.5" fill="#FFEAA8" opacity="0.8"/>
  <circle cx="500" cy="90" r="3" fill="#FFEAA8" opacity="0.7"/>
  <circle cx="480" cy="330" r="2" fill="#FFEAA8" opacity="0.6"/>

  <g transform="translate(300, 240)">
    <!-- Wooden nightstand base -->
    <ellipse cx="0" cy="115" rx="130" ry="25" fill="#42352B"/>
    <ellipse cx="0" cy="110" rx="120" ry="20" fill="#5E4C3E"/>

    <!-- Panda Lamp Body (Plump glowing silicone) -->
    <!-- Black Ears -->
    <ellipse cx="-65" cy="-80" rx="26" ry="24" fill="#2C2E38"/>
    <ellipse cx="65" cy="-80" rx="26" ry="24" fill="#2C2E38"/>

    <!-- Head & Body (soft pear shape) -->
    <ellipse cx="0" cy="40" rx="88" ry="72" fill="url(#lampSilicone)"/>
    <circle cx="0" cy="-25" r="75" fill="url(#lampSilicone)"/>

    <!-- Black Eye Patches -->
    <ellipse cx="-32" cy="-25" rx="20" ry="25" transform="rotate(-15 -32 -25)" fill="#2C2E38"/>
    <ellipse cx="32" cy="-25" rx="20" ry="25" transform="rotate(15 32 -25)" fill="#2C2E38"/>

    <!-- Cute Eyes -->
    <circle cx="-30" cy="-24" r="6" fill="#FFFFFF"/>
    <circle cx="-28" cy="-26" r="2.5" fill="#2C2E38"/>
    <circle cx="30" cy="-24" r="6" fill="#FFFFFF"/>
    <circle cx="32" cy="-26" r="2.5" fill="#2C2E38"/>

    <!-- Nose & Mouth -->
    <ellipse cx="0" cy="-4" rx="8" ry="5" fill="#2C2E38"/>
    <path d="M -7 5 Q 0 12 7 5" stroke="#2C2E38" stroke-width="2.5" stroke-linecap="round" fill="none"/>

    <!-- Rosy Cheek Glows -->
    <circle cx="-50" cy="-4" r="11" fill="#FFAAA6" opacity="0.65"/>
    <circle cx="50" cy="-4" r="11" fill="#FFAAA6" opacity="0.65"/>

    <!-- Little Black Paws -->
    <ellipse cx="-45" cy="55" rx="20" ry="16" fill="#2C2E38"/>
    <ellipse cx="45" cy="55" rx="20" ry="16" fill="#2C2E38"/>
    <!-- Feet -->
    <ellipse cx="-40" cy="100" rx="22" ry="15" fill="#2C2E38"/>
    <ellipse cx="40" cy="100" rx="22" ry="15" fill="#2C2E38"/>
  </g>
</svg>
`);

// 10. surprise-10-solar-system: 3D Solar system model with planets & orbit rings
writeAsset("surprise-10-solar-system", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <radialGradient id="spaceBg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1A1C38"/>
      <stop offset="60%" stop-color="#0E1024"/>
      <stop offset="100%" stop-color="#070814"/>
    </radialGradient>
    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF6D1"/>
      <stop offset="40%" stop-color="#FFBD3B"/>
      <stop offset="100%" stop-color="#FF7518"/>
    </radialGradient>
  </defs>
  <rect width="600" height="450" fill="url(#spaceBg)"/>

  <!-- Stardust & Constellations -->
  ${[
    [70, 60], [140, 100], [220, 50], [480, 70], [530, 120], [80, 360], [160, 400], [490, 380], [540, 340], [300, 30]
  ].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${Math.random() > 0.5 ? 2.5 : 1.5}" fill="#FFF" opacity="0.8"/>`).join("")}

  <g transform="translate(300, 225)">
    <!-- Orbit Rings (Elliptical brass/neon wire paths) -->
    <ellipse cx="0" cy="0" rx="90" ry="40" fill="none" stroke="#7A8CA8" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.6"/>
    <ellipse cx="0" cy="0" rx="150" ry="65" fill="none" stroke="#7A8CA8" stroke-width="1.5" stroke-dasharray="5,5" opacity="0.5"/>
    <ellipse cx="0" cy="0" rx="220" ry="95" fill="none" stroke="#7A8CA8" stroke-width="1.8" stroke-dasharray="6,6" opacity="0.45"/>

    <!-- Center Glowing Sun -->
    <circle cx="0" cy="0" r="48" fill="url(#sunGlow)"/>
    <circle cx="0" cy="0" r="58" fill="#FFBA3B" opacity="0.25"/>

    <!-- Planet 1: Mercury / Warm rocky -->
    <circle cx="-85" cy="-15" r="9" fill="#E0A370"/>

    <!-- Planet 2: Earth (Blue with green continents) -->
    <g transform="translate(135, -28)">
      <circle cx="0" cy="0" r="16" fill="#3D85C6"/>
      <circle cx="-3" cy="-3" r="7" fill="#6AA84F" opacity="0.85"/>
      <circle cx="4" cy="5" r="6" fill="#6AA84F" opacity="0.85"/>
      <!-- Moon orbit -->
      <circle cx="22" cy="-6" r="3.5" fill="#EAEAEA"/>
    </g>

    <!-- Planet 3: Saturn with tilted rings -->
    <g transform="translate(-160, 55)">
      <ellipse cx="0" cy="0" rx="36" ry="12" fill="none" stroke="#DDBE86" stroke-width="7" transform="rotate(-20)"/>
      <circle cx="0" cy="0" r="20" fill="#E8C992"/>
      <ellipse cx="0" cy="0" rx="36" ry="12" fill="none" stroke="#DDBE86" stroke-width="4" stroke-dasharray="20,10" transform="rotate(-20)"/>
    </g>

    <!-- Planet 4: Mars (Red) -->
    <circle cx="70" cy="35" r="11" fill="#D95338"/>

    <!-- Planet 5: Neptune (Deep azure) -->
    <circle cx="215" cy="20" r="15" fill="#4B6CB7"/>
  </g>
</svg>
`);

// 11. surprise-11-love-notes: Handwritten scrapbook with love letters and envelopes
writeAsset("surprise-11-love-notes", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <radialGradient id="notesBg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#FFF6F8"/>
      <stop offset="60%" stop-color="#FDE2EB"/>
      <stop offset="100%" stop-color="#F9CADB"/>
    </radialGradient>
    <linearGradient id="paperGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#FAF1E6"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#notesBg)"/>
  <circle cx="300" cy="225" r="170" fill="#FFFFFF" opacity="0.6"/>

  <g transform="translate(300, 220)">
    <!-- Open scrapbook journal binder -->
    <!-- Left Page -->
    <path d="M -170 -110 L -15 -115 L -10 115 L -165 110 Z" fill="url(#paperGrad)" stroke="#E4D0BA" stroke-width="3"/>
    <!-- Right Page -->
    <path d="M 15 -115 L 170 -110 L 165 110 L 10 115 Z" fill="url(#paperGrad)" stroke="#E4D0BA" stroke-width="3"/>
    <!-- Center spine binding rings -->
    ${[-80, -40, 0, 40, 80].map((y) => `<ellipse cx="0" cy="${y}" rx="12" ry="7" fill="#C59C68"/>`).join("")}

    <!-- Faux handwritten lines & doodle hearts on Left Page -->
    ${[-70, -45, -20, 5, 30, 55, 80].map((y) => `<line x1="-145" y1="${y}" x2="-35" y2="${y}" stroke="#D1B89D" stroke-width="2" stroke-linecap="round"/>`).join("")}
    <path d="M -90 -45 C -105 -60, -120 -40, -90 -20 C -60 -40, -75 -60, -90 -45 Z" fill="#FF789E"/>

    <!-- Right Page: Mini envelope tucked with letter & washi tape -->
    <g transform="translate(85, -10) rotate(8)">
      <rect x="-55" y="-35" width="110" height="70" rx="8" fill="#FFFBF5" stroke="#E6A8BC" stroke-width="2"/>
      <path d="M -55 -35 L 0 5 L 55 -35" fill="#FCE5ED" stroke="#E6A8BC" stroke-width="2"/>
      <circle cx="0" cy="6" r="10" fill="#E45B88"/>

      <!-- Letter sticking out -->
      <rect x="-42" y="-60" width="84" height="40" rx="4" fill="#FFFFFF" stroke="#D4BBA5" stroke-width="1.5"/>
      <line x1="-30" y1="-45" x2="30" y2="-45" stroke="#E6A8BC" stroke-width="2"/>
      <line x1="-30" y1="-32" x2="15" y2="-32" stroke="#E6A8BC" stroke-width="2"/>

      <!-- Pastel Washi tape sticker -->
      <rect x="-30" y="-70" width="60" height="16" fill="#BBDFF5" opacity="0.8" transform="rotate(-4)"/>
    </g>

    <!-- Floating paper hearts -->
    <path d="M 125 70 C 115 55, 95 65, 125 90 C 155 65, 135 55, 125 70 Z" fill="#E45B88"/>
  </g>
</svg>
`);

// 12. surprise-12-birthday-currency: Decorative celebratory birthday banknote artwork
writeAsset("surprise-12-birthday-currency", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <radialGradient id="currBg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#EAF8F1"/>
      <stop offset="60%" stop-color="#CEEFE0"/>
      <stop offset="100%" stop-color="#ACDEC6"/>
    </radialGradient>
    <linearGradient id="noteGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F4FCF7"/>
      <stop offset="50%" stop-color="#E1F7EC"/>
      <stop offset="100%" stop-color="#C5EDD8"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#currBg)"/>
  <circle cx="300" cy="225" r="170" fill="#FFFFFF" opacity="0.6"/>

  <g transform="translate(300, 225) rotate(-3)">
    <!-- Decorative Banknote Frame -->
    <rect x="-210" y="-115" width="420" height="230" rx="16" fill="url(#noteGrad)" stroke="#4EA87A" stroke-width="4"/>
    <rect x="-195" y="-100" width="390" height="200" rx="12" fill="none" stroke="#68C496" stroke-width="2" stroke-dasharray="6,4"/>

    <!-- Corner Guilloche & Denomination Badges -->
    <circle cx="-165" cy="-70" r="18" fill="#4EA87A"/>
    <text x="-165" y="-63" font-family="serif" font-weight="bold" font-size="20" fill="#FFFFFF" text-anchor="middle">★</text>
    <circle cx="165" cy="-70" r="18" fill="#4EA87A"/>
    <text x="165" y="-63" font-family="serif" font-weight="bold" font-size="20" fill="#FFFFFF" text-anchor="middle">★</text>
    <circle cx="-165" cy="70" r="18" fill="#4EA87A"/>
    <text x="-165" y="77" font-family="serif" font-weight="bold" font-size="20" fill="#FFFFFF" text-anchor="middle">★</text>
    <circle cx="165" cy="70" r="18" fill="#4EA87A"/>
    <text x="165" y="77" font-family="serif" font-weight="bold" font-size="20" fill="#FFFFFF" text-anchor="middle">★</text>

    <!-- Center Vignette Medallion -->
    <ellipse cx="0" cy="0" rx="85" ry="85" fill="#FFFFFF" stroke="#4EA87A" stroke-width="3"/>
    <ellipse cx="0" cy="0" rx="75" ry="75" fill="#E8F9F0"/>

    <!-- Calendar Date Icon (November 24) -->
    <rect x="-35" y="-40" width="70" height="75" rx="10" fill="#FFFFFF" stroke="#388E63" stroke-width="3"/>
    <rect x="-35" y="-40" width="70" height="24" rx="6" fill="#E45B88"/>
    <circle cx="-16" cy="-38" r="3" fill="#FFFFFF"/>
    <circle cx="16" cy="-38" r="3" fill="#FFFFFF"/>
    <text x="0" y="-23" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF" text-anchor="middle">NOV</text>
    <text x="0" y="22" font-family="serif" font-weight="900" font-size="34" fill="#388E63" text-anchor="middle">24</text>

    <!-- Decorative ribbons and seals -->
    <path d="M -120 20 Q -70 50 0 50 Q 70 50 120 20" stroke="#4EA87A" stroke-width="3" fill="none"/>
    <circle cx="100" cy="0" r="22" fill="#FFD566" stroke="#D4A017" stroke-width="2"/>
    <text x="100" y="7" font-size="18" text-anchor="middle">🎀</text>
  </g>
</svg>
`);

console.log("Successfully generated all 12 personalized gift assets in SVG & JPG formats!");
