import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import Section from "./decor/Section.jsx";
import Lightbox from "./decor/Lightbox.jsx";
import { birthday as cfg } from "../config/birthday.config.js";
import { sfx } from "../lib/sfx.js";
import { Butterfly, Cloud, Flower, Heart, Leaf, Sparkle, Sun } from "./decor/Stickers.jsx";

/**
 * A smooth winding dotted path extending vertically through all 10 personal story stages.
 * Starts at (50, 70), gently snakes between left (27%) and right (73%) stops,
 * and arrives at (438, 1290).
 */
const PATH = `
  M 50 70
  C 80 85, 120 110, 162 140
  C 280 200, 360 190, 438 260
  C 340 320, 240 310, 162 380
  C 260 440, 360 430, 438 500
  C 340 560, 240 550, 162 620
  C 260 680, 360 670, 438 740
  C 340 800, 240 790, 162 860
  C 260 920, 360 910, 438 980
  C 340 1040, 240 1030, 162 1100
  C 260 1160, 360 1150, 438 1220
  C 438 1250, 438 1270, 438 1290
`;

/**
 * SECTION 09 — Illustrated memory map with 10 personal story stages
 * and emotional final message.
 */
export default function MemoryMap({ onComplete }) {
  const [active, setActive] = useState(null);
  const reduce = useReducedMotion();

  const memories = cfg.memoryMap || [];
  const finalMessage = cfg.memoryMapFinalMessage || {
    title: "OUR STORY IS JUST BEGINNING ❤️",
    message:
      "One first message, one first call, one first meeting... and a thousand reasons to smile. Happy Birthday, My Special Person! 🎂",
  };

  const open = (loc, index) => {
    setActive({ ...loc, index });
    sfx.chime();
    onComplete?.();
  };

  return (
    <Section id="map" number={9} title="Our Memory Map" kicker="follow the dotted line" palette="#A48FD0">
      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[28px] border-2 border-white bg-gradient-to-b from-blue-soft via-mint/40 to-cream shadow-scrap-lg">
        <div className="relative w-full aspect-[600/1350]">
          <svg viewBox="0 0 600 1350" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DDF3E8" />
                <stop offset="100%" stopColor="#C9EBDD" />
              </linearGradient>
              <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EFEAFF" />
                <stop offset="100%" stopColor="#DCD4F2" />
              </linearGradient>
              <linearGradient id="hill3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF2D6" />
                <stop offset="100%" stopColor="#F9E2B3" />
              </linearGradient>
            </defs>

            {/* Background rolling hills down the journey */}
            <ellipse cx="120" cy="180" rx="220" ry="90" fill="url(#hill1)" />
            <ellipse cx="500" cy="240" rx="230" ry="110" fill="url(#hill2)" />

            <ellipse cx="100" cy="540" rx="240" ry="100" fill="url(#hill1)" opacity="0.8" />
            <ellipse cx="520" cy="680" rx="250" ry="120" fill="url(#hill2)" opacity="0.8" />

            <ellipse cx="110" cy="920" rx="240" ry="100" fill="url(#hill1)" opacity="0.8" />
            <ellipse cx="500" cy="1060" rx="250" ry="120" fill="url(#hill2)" opacity="0.8" />

            <ellipse cx="300" cy="1320" rx="330" ry="100" fill="#DDF3E8" opacity="0.85" />

            {/* Meandering river streams */}
            <path
              d="M10 280 C150 250 220 310 320 290 C420 270 520 310 590 280"
              fill="none"
              stroke="#BBDFF5"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.75"
            />
            <path
              d="M10 280 C150 250 220 310 320 290 C420 270 520 310 590 280"
              fill="none"
              stroke="#fff"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.6"
            />

            <path
              d="M10 820 C140 790 240 840 340 810 C440 790 530 830 590 810"
              fill="none"
              stroke="#BBDFF5"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.75"
            />
            <path
              d="M10 820 C140 790 240 840 340 810 C440 790 530 830 590 810"
              fill="none"
              stroke="#fff"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Little decorative trees along the hills */}
            {[
              [60, 110], [530, 150], [70, 320], [520, 390],
              [80, 560], [530, 610], [60, 780], [540, 850],
              [80, 1020], [520, 1070], [220, 1280], [380, 1270]
            ].map(([x, y], i) => (
              <g key={`tree-${i}`}>
                <rect x={x - 2} y={y} width="4" height="14" fill="#B98A62" />
                <circle cx={x} cy={y - 6} r="11" fill="#A9DFC8" />
                <circle cx={x - 5} cy={y - 2} r="7" fill="#C9EBDD" />
              </g>
            ))}

            {/* Pastel flowers near path curves */}
            {[
              [90, 100], [490, 200], [100, 340], [500, 440],
              [90, 580], [490, 670], [100, 810], [500, 910],
              [90, 1050], [490, 1150], [280, 1260]
            ].map(([x, y], i) => (
              <g key={`flower-${i}`}>
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse
                    key={a}
                    cx={x}
                    cy={y - 4}
                    rx="3"
                    ry="4.5"
                    fill={i % 2 === 0 ? "#F9C8D9" : "#FFF7EC"}
                    transform={`rotate(${a} ${x} ${y})`}
                  />
                ))}
                <circle cx={x} cy={y} r="2.5" fill="#FFE9B8" />
              </g>
            ))}

            {/* Solid white outline for path */}
            <path d={PATH} fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" opacity="0.8" />

            {/* Animated dotted purple trail */}
            <motion.path
              d={PATH}
              fill="none"
              stroke="#A48FD0"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="2 16"
              initial={{ strokeDashoffset: 0 }}
              animate={reduce ? {} : { strokeDashoffset: -200 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* Start marker: The Beginning */}
            <g>
              <circle cx="50" cy="70" r="9" fill="#6FA8D6" />
              <text x="50" y="45" textAnchor="middle" fontSize="14" className="font-cute" fill="#4A5A6A">
                the beginning
              </text>
            </g>

            {/* Finish marker: To Be Continued */}
            <g>
              <circle cx="438" cy="1290" r="9" fill="#E48BB0" />
              <text x="438" y="1318" textAnchor="middle" fontSize="14" className="font-cute" fill="#4A5A6A">
                to be continued
              </text>
            </g>
          </svg>

          {/* Floating stickers distributed along map */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <Cloud className="anim-float absolute left-[10%] top-[4%]" size={56} />
            <Sun className="anim-twinkle absolute right-[10%] top-[3%]" size={36} />
            <Butterfly className="anim-sway absolute left-[48%] top-[12%]" size={24} color="#DCD4F2" />
            <Cloud className="anim-float absolute right-[8%] top-[25%]" size={50} style={{ animationDelay: "1.2s" }} />
            <Leaf className="anim-sway absolute left-[65%] top-[38%]" size={20} />
            <Cloud className="anim-float absolute left-[8%] top-[52%]" size={52} style={{ animationDelay: "2s" }} />
            <Butterfly className="anim-sway absolute right-[45%] top-[65%]" size={24} color="#F9C8D9" />
            <Cloud className="anim-float absolute right-[12%] top-[78%]" size={48} style={{ animationDelay: "1.6s" }} />
            <Leaf className="anim-sway absolute left-[30%] top-[88%]" size={20} />
          </div>

          {/* Location markers for all 10 memories */}
          {memories.map((loc, i) => (
            <motion.button
              key={loc.id}
              type="button"
              onClick={() => open(loc, i)}
              initial={reduce ? false : { opacity: 0, scale: 0.5, y: -10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.05, type: "spring", stiffness: 220, damping: 15 }}
              whileHover={{ scale: 1.15, rotate: i % 2 === 0 ? -3 : 3 }}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              aria-label={`open memory: ${loc.name}`}
            >
              <span className="relative grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full border-[3px] border-white bg-white text-lg sm:text-2xl shadow-scrap transition hover:shadow-scrap-lg">
                <span aria-hidden="true">{loc.emoji}</span>
                <span
                  className="absolute -bottom-1 -right-1 grid h-4 w-4 sm:h-5 sm:w-5 place-items-center rounded-full bg-pink-deep text-white shadow-xs"
                  aria-hidden="true"
                >
                  <MapPin size={10} className="sm:size-[11px]" />
                </span>
              </span>
              <span className="mt-1 block max-w-[110px] sm:max-w-[150px] truncate rounded-full bg-white/95 px-2 py-0.5 font-cute text-[10px] sm:text-xs font-bold text-blue-ink shadow-sm text-center">
                {loc.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <p className="mt-5 flex flex-wrap items-center justify-center gap-2 font-cute text-sm text-blue-deep/80">
        <Navigation size={14} /> tap a marker to open that memory · {memories.length} stops in our story
      </p>

      {/* Final Emotional Message at the end of the map */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="mx-auto mt-8 w-full max-w-2xl px-2 sm:px-4"
      >
        <div className="paper paper-dashed relative overflow-hidden rounded-3xl border-2 border-[#F9C8D9] bg-[#FFFDFC]/95 p-6 sm:p-9 text-center shadow-scrap-lg">
          <div className="mb-3 flex items-center justify-center gap-2.5" aria-hidden="true">
            <Heart size={20} className="text-pink-deep anim-float" />
            <Sparkle size={18} className="text-[#D9A94B] anim-twinkle" />
            <Heart size={20} className="text-pink-deep anim-float" style={{ animationDelay: "0.5s" }} />
          </div>

          <h3 className="font-hand text-2xl sm:text-4xl font-bold tracking-wide text-blue-ink">
            {finalMessage.title}
          </h3>

          <p className="mx-auto mt-3 max-w-lg font-body text-base sm:text-lg leading-relaxed text-blue-ink/90">
            "{finalMessage.message}"
          </p>

          <div className="mt-5 flex items-center justify-center gap-3 font-cute text-xs text-pink-deep" aria-hidden="true">
            <Flower size={18} petal="#F9C8D9" center="#FFE9B8" />
            <span>with all my love, forever & always</span>
            <Flower size={18} petal="#DCD4F2" center="#FFF7EC" />
          </div>
        </div>
      </motion.div>

      <Lightbox
        open={!!active}
        onClose={() => setActive(null)}
        src={active?.image}
        emoji={active?.emoji}
        title={active?.name}
        caption={active?.caption}
        alt={active?.name}
        note={active?.description || active?.message}
      />

      <div className="mt-8 flex items-center justify-center gap-3" aria-hidden="true">
        <Flower size={22} petal="#F9C8D9" center="#FFE9B8" />
        <Heart size={18} color="#E48BB0" />
        <Sparkle className="anim-twinkle" size={16} color="#A48FD0" />
        <Flower size={22} petal="#DCD4F2" center="#FFF7EC" />
      </div>
    </Section>
  );
}
