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

// 1. surprise-reasons.svg - A Pocket Full of Reasons
writeSvg("surprise-reasons.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5F7"/>
      <stop offset="50%" stop-color="#FCE7ED"/>
      <stop offset="100%" stop-color="#F9D4DF"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="6" stdDeviation="8" flood-color="#4A5A6A" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <!-- Envelope & notes -->
  <g transform="translate(150, 80)" filter="url(#shadow)">
    <rect x="0" y="40" width="500" height="360" rx="16" fill="#FFFFFF"/>
    <!-- Fold lines -->
    <path d="M 0 40 L 250 240 L 500 40" fill="#FFF9FA" stroke="#F4BAC9" stroke-width="3"/>
    <path d="M 0 400 L 200 210" stroke="#F4BAC9" stroke-width="2.5" stroke-dasharray="6,6"/>
    <path d="M 500 400 L 300 210" stroke="#F4BAC9" stroke-width="2.5" stroke-dasharray="6,6"/>
    <!-- Wax Seal -->
    <circle cx="250" cy="240" r="38" fill="#E48BB0"/>
    <circle cx="250" cy="240" r="32" fill="#D6759D"/>
    <path d="M 238 232 C 244 224, 256 224, 262 232 C 268 240, 250 256, 250 256 C 250 256, 232 240, 238 232 Z" fill="#FFFFFF"/>
  </g>
  <!-- Floating Heart and Paper Tags -->
  <g transform="translate(190, 150) rotate(-6)">
    <rect x="0" y="0" width="180" height="110" rx="10" fill="#FFE9B8" filter="url(#shadow)"/>
    <text x="20" y="40" font-family="sans-serif" font-weight="bold" font-size="16" fill="#7A5620">REASON #14</text>
    <text x="20" y="70" font-family="sans-serif" font-size="14" fill="#91692E">Your radiant smile</text>
    <circle cx="90" cy="12" r="5" fill="#FFFFFF"/>
  </g>
  <g transform="translate(450, 180) rotate(8)">
    <rect x="0" y="0" width="180" height="110" rx="10" fill="#DCD4F2" filter="url(#shadow)"/>
    <text x="20" y="40" font-family="sans-serif" font-weight="bold" font-size="16" fill="#584878">REASON #89</text>
    <text x="20" y="70" font-family="sans-serif" font-size="14" fill="#69598A">How kind you are</text>
    <circle cx="90" cy="12" r="5" fill="#FFFFFF"/>
  </g>
  <!-- Decorative stamps -->
  <text x="400" y="520" font-family="serif" font-size="28" font-style="italic" fill="#E48BB0" text-anchor="middle">"A million little reasons why..."</text>
</svg>
`);

// 2. surprise-song.svg - The Song You Always Hum
writeSvg("surprise-song.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="vbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF7"/>
      <stop offset="100%" stop-color="#FFECC2"/>
    </linearGradient>
    <filter id="vshadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="3" dy="8" stdDeviation="10" flood-color="#4A5A6A" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#vbg)"/>
  <!-- Vinyl Record -->
  <g transform="translate(340, 280)" filter="url(#vshadow)">
    <circle cx="0" cy="0" r="190" fill="#2D3748"/>
    <circle cx="0" cy="0" r="170" fill="none" stroke="#3A4659" stroke-width="2"/>
    <circle cx="0" cy="0" r="150" fill="none" stroke="#3A4659" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="130" fill="none" stroke="#3A4659" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="110" fill="none" stroke="#3A4659" stroke-width="2"/>
    <circle cx="0" cy="0" r="90" fill="none" stroke="#3A4659" stroke-width="1.5"/>
    <!-- Label -->
    <circle cx="0" cy="0" r="68" fill="#F9C8D9"/>
    <circle cx="0" cy="0" r="62" fill="#E48BB0"/>
    <circle cx="0" cy="0" r="14" fill="#2D3748"/>
    <!-- Musical notes and sparkles -->
    <text x="0" y="-24" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle">YOUR FAVORITE</text>
    <text x="0" y="32" font-family="sans-serif" font-size="11" fill="#FFFFFF" text-anchor="middle">SIDE A • FOREVER</text>
  </g>
  <!-- Floating musical notes -->
  <g fill="#E48BB0">
    <path d="M 580 180 q 20 -40 50 -20 t 20 60 l -10 10 q -20 0 -25 -20 z" opacity="0.8"/>
    <circle cx="580" cy="220" r="12"/>
    <circle cx="640" cy="200" r="12"/>
    <rect x="588" y="150" width="6" height="70"/>
    <rect x="648" y="130" width="6" height="70"/>
    <polygon points="588,150 654,130 654,142 588,162"/>
  </g>
  <text x="400" y="530" font-family="serif" font-size="26" font-style="italic" fill="#584878" text-anchor="middle">"The melody that lives in my head"</text>
</svg>
`);

// 3. surprise-wish.svg - One Wish Ticket
writeSvg("surprise-wish.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="tbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3F0FF"/>
      <stop offset="100%" stop-color="#E1D7FA"/>
    </linearGradient>
    <linearGradient id="ticketG" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFF9EA"/>
      <stop offset="100%" stop-color="#FFE4A0"/>
    </linearGradient>
    <filter id="tshadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="3" dy="8" stdDeviation="12" flood-color="#4A5A6A" flood-opacity="0.16"/>
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#tbg)"/>
  <!-- Ticket Body -->
  <g transform="translate(130, 160) rotate(-4)" filter="url(#tshadow)">
    <path d="M 0 0 L 560 0 C 560 40, 520 40, 520 80 C 520 120, 560 120, 560 160 C 560 200, 520 200, 520 240 L 0 240 C 0 200, 40 200, 40 160 C 40 120, 0 120, 0 80 C 0 40, 40 40, 40 0 Z" fill="url(#ticketG)" stroke="#D4A746" stroke-width="3"/>
    <!-- Perforation line -->
    <line x1="390" y1="10" x2="390" y2="230" stroke="#B88A28" stroke-width="3" stroke-dasharray="8,8"/>
    <!-- Stamp details -->
    <text x="70" y="65" font-family="sans-serif" font-weight="900" font-size="20" letter-spacing="4" fill="#91692E">GOLDEN ADMIT ONE</text>
    <text x="70" y="125" font-family="serif" font-size="38" font-weight="bold" fill="#694C1B">ONE UNREASONABLE WISH</text>
    <text x="70" y="165" font-family="sans-serif" font-size="16" fill="#8A652C">Valid anywhere • Never expires • Infinite uses</text>
    <text x="70" y="205" font-family="monospace" font-size="14" fill="#A8803D">№ 0001-BDAY-SPECIAL</text>
    <!-- Stub side -->
    <text x="475" y="80" font-family="sans-serif" font-weight="bold" font-size="16" fill="#8A652C" text-anchor="middle">KEEP THIS</text>
    <text x="475" y="130" font-family="sans-serif" font-weight="900" font-size="32" fill="#E48BB0" text-anchor="middle">★</text>
    <text x="475" y="180" font-family="monospace" font-size="12" fill="#8A652C" text-anchor="middle">CLAIM TODAY</text>
  </g>
</svg>
`);

// 4. surprise-quiz.svg - The Quiz Nobody Wins
writeSvg("surprise-quiz.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="qbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EAF9F2"/>
      <stop offset="100%" stop-color="#CDEFE0"/>
    </linearGradient>
    <filter id="qshadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="8" stdDeviation="10" flood-color="#4A5A6A" flood-opacity="0.14"/>
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#qbg)"/>
  <!-- Clipboard / Badge Card -->
  <g transform="translate(180, 70)" filter="url(#qshadow)">
    <rect x="0" y="30" width="440" height="420" rx="20" fill="#FFFFFF"/>
    <!-- Clip -->
    <rect x="150" y="10" width="140" height="40" rx="8" fill="#B98A62"/>
    <circle cx="220" cy="30" r="10" fill="#E8EEF2"/>
    <!-- Trophy Icon -->
    <circle cx="220" cy="140" r="50" fill="#FFE9B8"/>
    <text x="220" y="156" font-size="46" text-anchor="middle">🏆</text>
    <!-- Content -->
    <text x="220" y="225" font-family="sans-serif" font-weight="900" font-size="22" fill="#2E7558" text-anchor="middle">POP QUIZ WINNER</text>
    <text x="220" y="260" font-family="sans-serif" font-size="16" fill="#4A5A6A" text-anchor="middle">"What's the best thing about you?"</text>
    <!-- Ribbon Box -->
    <rect x="40" y="290" width="360" height="90" rx="14" fill="#F2FCF7" stroke="#6FBFA0" stroke-width="2"/>
    <text x="220" y="330" font-family="sans-serif" font-weight="bold" font-size="18" fill="#2E7558" text-anchor="middle">Answer: Everything. It's a tie!</text>
    <text x="220" y="358" font-family="sans-serif" font-size="14" fill="#5A756A" text-anchor="middle">Grade: 100% ★★★★★</text>
  </g>
</svg>
`);

// 5. surprise-midnight.svg - Midnight Confession
writeSvg("surprise-midnight.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="mbg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E2640"/>
      <stop offset="60%" stop-color="#2D3A5C"/>
      <stop offset="100%" stop-color="#4A587E"/>
    </linearGradient>
    <filter id="mshadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="0" stdDeviation="16" flood-color="#FFE9B8" flood-opacity="0.4"/>
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#mbg)"/>
  <!-- Moon -->
  <circle cx="560" cy="170" r="80" fill="#FFF4D0" filter="url(#mshadow)"/>
  <circle cx="530" cy="150" r="74" fill="#2D3A5C"/>
  <!-- Stars -->
  <g fill="#FFE9B8">
    <circle cx="160" cy="120" r="3"/>
    <circle cx="280" cy="90" r="2.5"/>
    <circle cx="420" cy="130" r="4"/>
    <circle cx="680" cy="100" r="3"/>
    <circle cx="200" cy="240" r="3"/>
    <circle cx="340" cy="210" r="2"/>
    <circle cx="640" cy="280" r="3.5"/>
    <polygon points="120,180 125,195 140,195 128,204 132,218 120,210 108,218 112,204 100,195 115,195" fill="#FFF"/>
    <polygon points="460,70 464,82 476,82 466,89 470,101 460,94 450,101 454,89 444,82 456,82" fill="#FFF"/>
  </g>
  <!-- Window Silhouette -->
  <g transform="translate(180, 260)">
    <rect x="0" y="0" width="440" height="240" rx="16" fill="#141A2D" opacity="0.85"/>
    <rect x="20" y="20" width="190" height="200" rx="10" fill="#25314D" stroke="#5A6D99" stroke-width="4"/>
    <rect x="230" y="20" width="190" height="200" rx="10" fill="#25314D" stroke="#5A6D99" stroke-width="4"/>
    <!-- Warm lamp glow inside -->
    <circle cx="320" cy="120" r="50" fill="#FFE9B8" opacity="0.25"/>
  </g>
  <text x="400" y="550" font-family="serif" font-size="26" font-style="italic" fill="#E4D3F5" text-anchor="middle">"You are far more important than you know"</text>
</svg>
`);

// 6. surprise-doodle.svg - A Little Doodle
writeSvg("surprise-doodle.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="dbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF8F4"/>
      <stop offset="100%" stop-color="#FFEADE"/>
    </linearGradient>
    <filter id="dshadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="6" stdDeviation="8" flood-color="#4A5A6A" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#dbg)"/>
  <!-- Doodle Paper -->
  <g transform="translate(120, 80) rotate(1.5)" filter="url(#dshadow)">
    <rect x="0" y="0" width="560" height="440" rx="18" fill="#FFFFFF"/>
    <!-- Grid lines -->
    <line x1="40" y1="80" x2="520" y2="80" stroke="#F0E0E0" stroke-width="1.5"/>
    <line x1="40" y1="140" x2="520" y2="140" stroke="#F0E0E0" stroke-width="1.5"/>
    <line x1="40" y1="200" x2="520" y2="200" stroke="#F0E0E0" stroke-width="1.5"/>
    <line x1="40" y1="260" x2="520" y2="260" stroke="#F0E0E0" stroke-width="1.5"/>
    <line x1="40" y1="320" x2="520" y2="320" stroke="#F0E0E0" stroke-width="1.5"/>
    <line x1="40" y1="380" x2="520" y2="380" stroke="#F0E0E0" stroke-width="1.5"/>
    
    <!-- Big cute doodle heart -->
    <path d="M 280 230 C 220 130, 140 180, 180 270 C 210 330, 280 370, 280 370 C 280 370, 350 330, 380 270 C 420 180, 340 130, 280 230 Z" fill="#F9C8D9" stroke="#E48BB0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    
    <!-- Stick figures holding hands -->
    <!-- Person 1 -->
    <circle cx="160" cy="180" r="18" fill="none" stroke="#4A5A6A" stroke-width="4"/>
    <line x1="160" y1="198" x2="160" y2="250" stroke="#4A5A6A" stroke-width="4"/>
    <line x1="160" y1="215" x2="125" y2="235" stroke="#4A5A6A" stroke-width="4"/>
    <line x1="160" y1="215" x2="195" y2="225" stroke="#4A5A6A" stroke-width="4"/>
    <line x1="160" y1="250" x2="140" y2="290" stroke="#4A5A6A" stroke-width="4"/>
    <line x1="160" y1="250" x2="180" y2="290" stroke="#4A5A6A" stroke-width="4"/>
    <!-- Person 2 with bow -->
    <circle cx="400" cy="175" r="18" fill="none" stroke="#4A5A6A" stroke-width="4"/>
    <line x1="400" y1="193" x2="400" y2="245" stroke="#4A5A6A" stroke-width="4"/>
    <line x1="400" y1="210" x2="365" y2="220" stroke="#4A5A6A" stroke-width="4"/>
    <line x1="400" y1="210" x2="435" y2="230" stroke="#4A5A6A" stroke-width="4"/>
    <line x1="400" y1="245" x2="380" y2="285" stroke="#4A5A6A" stroke-width="4"/>
    <line x1="400" y1="245" x2="420" y2="285" stroke="#4A5A6A" stroke-width="4"/>
    <!-- Smiling sunshine -->
    <circle cx="470" cy="80" r="30" fill="#FFE9B8" stroke="#F7DCA5" stroke-width="3"/>
    <text x="280" y="70" font-family="cursive, sans-serif" font-size="28" fill="#E48BB0" font-weight="bold" text-anchor="middle">Made with love by me ✎</text>
  </g>
</svg>
`);

// 7. memory-7.svg - Stargazing on the Roof
writeSvg("memory-7.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="starry" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#14182B"/>
      <stop offset="60%" stop-color="#283256"/>
      <stop offset="100%" stop-color="#4B4F73"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#starry)"/>
  <!-- Stars & Constellations -->
  <g fill="#FFE9B8">
    <circle cx="120" cy="90" r="3"/>
    <circle cx="180" cy="140" r="2"/>
    <circle cx="260" cy="80" r="3"/>
    <circle cx="340" cy="160" r="2.5"/>
    <circle cx="480" cy="90" r="3"/>
    <circle cx="620" cy="110" r="4"/>
    <circle cx="700" cy="180" r="2"/>
    <line x1="120" y1="90" x2="180" y2="140" stroke="#FFE9B8" stroke-width="0.8" opacity="0.6"/>
    <line x1="180" y1="140" x2="260" y2="80" stroke="#FFE9B8" stroke-width="0.8" opacity="0.6"/>
    <line x1="480" y1="90" x2="620" y2="110" stroke="#FFE9B8" stroke-width="0.8" opacity="0.6"/>
  </g>
  <!-- Shooting Star -->
  <path d="M 520 80 L 380 160" stroke="#FFF7EC" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="380" cy="160" r="4" fill="#FFFFFF"/>
  <!-- Roof Silhouette with Two Figures -->
  <polygon points="0,520 400,430 800,520 800,600 0,600" fill="#0C101D"/>
  <!-- Two cozy silhouettes with a blanket -->
  <ellipse cx="400" cy="455" rx="45" ry="32" fill="#E48BB0" opacity="0.9"/>
  <circle cx="385" cy="430" r="14" fill="#FFE9B8"/>
  <circle cx="415" cy="432" r="13" fill="#FFE9B8"/>
  <text x="400" y="570" font-family="serif" font-size="24" font-style="italic" fill="#DCD4F2" text-anchor="middle">"Counting satellites and laughing at midnight"</text>
</svg>
`);

// 8. memory-8.svg - Baking Sunday
writeSvg("memory-8.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bakery" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFBF5"/>
      <stop offset="100%" stop-color="#FEEED9"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bakery)"/>
  <!-- Kitchen table surface -->
  <rect x="0" y="380" width="800" height="220" fill="#F0DAC1"/>
  <line x1="0" y1="380" x2="800" y2="380" stroke="#DEC0A2" stroke-width="4"/>
  <!-- Flour dust puffs -->
  <circle cx="280" cy="440" r="30" fill="#FFFFFF" opacity="0.6"/>
  <circle cx="360" cy="460" r="40" fill="#FFFFFF" opacity="0.5"/>
  <circle cx="520" cy="430" r="25" fill="#FFFFFF" opacity="0.6"/>
  <!-- Mixing Bowl with whisk -->
  <g transform="translate(300, 280)">
    <ellipse cx="100" cy="110" rx="90" ry="70" fill="#BBDFF5"/>
    <ellipse cx="100" cy="70" rx="90" ry="25" fill="#F9C8D9"/>
    <ellipse cx="100" cy="70" rx="80" ry="20" fill="#FFF7EC"/>
    <!-- Whisk handle sticking out -->
    <line x1="120" y1="65" x2="170" y2="-20" stroke="#7A8B9E" stroke-width="8" stroke-linecap="round"/>
  </g>
  <!-- Cupcakes -->
  <g transform="translate(540, 360)">
    <polygon points="10,50 50,50 44,80 16,80" fill="#E8B896"/>
    <ellipse cx="30" cy="45" rx="22" ry="18" fill="#F9C8D9"/>
    <circle cx="30" cy="30" r="6" fill="#E48BB0"/>
  </g>
  <g transform="translate(180, 370)">
    <polygon points="10,50 50,50 44,80 16,80" fill="#E8B896"/>
    <ellipse cx="30" cy="45" rx="22" ry="18" fill="#FFE9B8"/>
    <circle cx="30" cy="30" r="6" fill="#FF8D6D"/>
  </g>
  <!-- Rolling Pin -->
  <rect x="220" y="490" width="360" height="24" rx="8" fill="#DEB887"/>
  <rect x="180" y="496" width="40" height="12" rx="4" fill="#C49B68"/>
  <rect x="580" y="496" width="40" height="12" rx="4" fill="#C49B68"/>
  <text x="400" y="160" font-family="serif" font-size="28" font-style="italic" fill="#755238" text-anchor="middle">"Flour on your nose, too much frosting everywhere"</text>
</svg>
`);

// 9. video posters
writeSvg("video-1-poster.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="vp1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCE7ED"/>
      <stop offset="50%" stop-color="#DCD4F2"/>
      <stop offset="100%" stop-color="#BBDFF5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#vp1)"/>
  <!-- Decorative film frames -->
  <g fill="#FFFFFF" opacity="0.35">
    <rect x="60" y="40" width="1080" height="40" rx="6"/>
    <rect x="60" y="595" width="1080" height="40" rx="6"/>
    ${Array.from({length: 15}).map((_, i) => `<rect x="${90 + i * 70}" y="48" width="40" height="24" rx="4" fill="#4A5A6A" opacity="0.4"/>`).join("")}
    ${Array.from({length: 15}).map((_, i) => `<rect x="${90 + i * 70}" y="603" width="40" height="24" rx="4" fill="#4A5A6A" opacity="0.4"/>`).join("")}
  </g>
  <!-- Center art: Birthday Cake and Balloons -->
  <circle cx="600" cy="337" r="160" fill="#FFFFFF" opacity="0.85"/>
  <text x="600" y="320" font-size="90" text-anchor="middle">🎉</text>
  <text x="600" y="410" font-family="sans-serif" font-weight="900" font-size="32" fill="#4A5A6A" text-anchor="middle">THE SURPRISE REVEAL</text>
  <text x="600" y="450" font-family="serif" font-size="22" font-style="italic" fill="#E48BB0" text-anchor="middle">Memory Film • Chapter 1</text>
</svg>
`);

writeSvg("video-2-poster.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="vp2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE9B8"/>
      <stop offset="50%" stop-color="#F9C8D9"/>
      <stop offset="100%" stop-color="#DCD4F2"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#vp2)"/>
  <!-- Decorative film frames -->
  <g fill="#FFFFFF" opacity="0.35">
    <rect x="60" y="40" width="1080" height="40" rx="6"/>
    <rect x="60" y="595" width="1080" height="40" rx="6"/>
    ${Array.from({length: 15}).map((_, i) => `<rect x="${90 + i * 70}" y="48" width="40" height="24" rx="4" fill="#4A5A6A" opacity="0.4"/>`).join("")}
    ${Array.from({length: 15}).map((_, i) => `<rect x="${90 + i * 70}" y="603" width="40" height="24" rx="4" fill="#4A5A6A" opacity="0.4"/>`).join("")}
  </g>
  <!-- Center art -->
  <circle cx="600" cy="337" r="160" fill="#FFFFFF" opacity="0.85"/>
  <text x="600" y="320" font-size="90" text-anchor="middle">✨</text>
  <text x="600" y="410" font-family="sans-serif" font-weight="900" font-size="32" fill="#4A5A6A" text-anchor="middle">LAUGHTER &amp; BALLOONS</text>
  <text x="600" y="450" font-family="serif" font-size="22" font-style="italic" fill="#6FA8D6" text-anchor="middle">Memory Film • Chapter 2</text>
</svg>
`);

console.log("All custom scrapbook assets generated successfully!");
