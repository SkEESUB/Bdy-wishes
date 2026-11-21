import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import Section from "./decor/Section.jsx";
import Lightbox from "./decor/Lightbox.jsx";
import { birthday as cfg } from "../config/birthday.config.js";
import { sfx } from "../lib/sfx.js";
import { Butterfly, Cloud, Flower, Heart, Leaf, Sparkle, Sun } from "./decor/Stickers.jsx";

/** A winding dotted path across the illustrated landscape. */
const PATH =
  "M40 300 C110 250 150 210 210 226 C270 242 290 268 350 258 C420 246 440 200 500 210 C540 216 560 250 585 262";

/**
 * SECTION 09 — Illustrated memory map.
 */
export default function MemoryMap({ onComplete }) {
  const [active, setActive] = useState(null);
  const reduce = useReducedMotion();

  const open = (loc, index) => {
    setActive({ ...loc, index });
    sfx.chime();
    onComplete?.();
  };

  return (
    <Section id="map" number={9} title="Our Memory Map" kicker="follow the dotted line" palette="#A48FD0">
      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[28px] border-2 border-white bg-gradient-to-b from-blue-soft via-mint/50 to-cream shadow-scrap-lg">
        <div className="relative aspect-[10/7] w-full">
          <svg viewBox="0 0 600 420" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DDF3E8" />
                <stop offset="100%" stopColor="#C9EBDD" />
              </linearGradient>
              <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EFEAFF" />
                <stop offset="100%" stopColor="#DCD4F2" />
              </linearGradient>
            </defs>

            {/* landscape */}
            <ellipse cx="120" cy="330" rx="220" ry="90" fill="url(#hill1)" />
            <ellipse cx="500" cy="300" rx="230" ry="110" fill="url(#hill2)" />
            <ellipse cx="300" cy="410" rx="330" ry="80" fill="#DDF3E8" opacity="0.75" />
            <path d="M0 250 C120 210 180 260 260 236 C360 208 460 250 600 220 L600 420 L0 420z" fill="#C9EBDD" opacity="0.5" />

            {/* river */}
            <path d="M20 380 C120 356 190 372 260 352 C340 330 430 356 590 336" fill="none" stroke="#BBDFF5" strokeWidth="16" strokeLinecap="round" opacity="0.85" />
            <path d="M20 380 C120 356 190 372 260 352 C340 330 430 356 590 336" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />

            {/* little trees */}
            {[[70, 210], [110, 232], [470, 150], [520, 176], [560, 196], [250, 180]].map(([x, y], i) => (
              <g key={i}>
                <rect x={x - 2} y={y} width="4" height="14" fill="#B98A62" />
                <circle cx={x} cy={y - 6} r="11" fill="#A9DFC8" />
                <circle cx={x - 6} cy={y - 2} r="7" fill="#C9EBDD" />
              </g>
            ))}

            {/* flowers on the path */}
            {[[170, 262], [268, 268], [376, 292], [452, 246], [92, 292], [540, 286]].map(([x, y], i) => (
              <g key={`f${i}`}>
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse key={a} cx={x} cy={y - 4.5} rx="3" ry="4.5" fill={i % 2 ? "#F9C8D9" : "#FFF7EC"} transform={`rotate(${a} ${x} ${y})`} />
                ))}
                <circle cx={x} cy={y} r="2.6" fill="#FFE9B8" />
              </g>
            ))}

            {/* winding dotted path */}
            <path d={PATH} fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" opacity="0.75" />
            <motion.path
              d={PATH}
              fill="none"
              stroke="#A48FD0"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="2 16"
              initial={{ strokeDashoffset: 0 }}
              animate={reduce ? {} : { strokeDashoffset: -180 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            />

            {/* start / finish labels */}
            <g>
              <circle cx="40" cy="300" r="9" fill="#6FA8D6" />
              <text x="40" y="330" textAnchor="middle" fontSize="15" className="font-cute" fill="#4A5A6A">
                the beginning
              </text>
            </g>
            <g>
              <circle cx="585" cy="262" r="9" fill="#E48BB0" />
              <text x="560" y="240" textAnchor="middle" fontSize="15" className="font-cute" fill="#4A5A6A">
                to be continued
              </text>
            </g>
          </svg>

          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <Cloud className="anim-float absolute left-[12%] top-[8%]" size={62} />
            <Cloud className="anim-float absolute right-[14%] top-[14%]" size={48} style={{ animationDelay: "1.4s" }} />
            <Sun className="anim-twinkle absolute right-[6%] top-[6%]" size={40} />
            <Butterfly className="anim-sway absolute left-[46%] top-[18%]" size={26} color="#DCD4F2" />
            <Leaf className="anim-sway absolute left-[70%] top-[30%]" size={20} />
          </div>

          {/* location markers */}
          {cfg.memoryMap.map((loc, i) => (
            <motion.button
              key={loc.id}
              type="button"
              onClick={() => open(loc, i)}
              initial={reduce ? false : { opacity: 0, scale: 0.5, y: -10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 220, damping: 15 }}
              whileHover={{ scale: 1.16, rotate: -3 }}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              aria-label={`open memory: ${loc.name}`}
            >
              <span className="relative grid h-11 w-11 place-items-center rounded-full border-[3px] border-white bg-white text-xl shadow-scrap">
                <span aria-hidden="true">{loc.emoji}</span>
                <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-pink-deep text-white" aria-hidden="true">
                  <MapPin size={11} />
                </span>
              </span>
              <span className="mt-1 block whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 font-cute text-[11px] text-blue-ink shadow-sm">
                {loc.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <p className="mt-5 flex flex-wrap items-center justify-center gap-2 font-cute text-sm text-blue-deep/80">
        <Navigation size={14} /> tap a marker to open that memory · {cfg.memoryMap.length} stops so far
      </p>

      <Lightbox
        open={!!active}
        onClose={() => setActive(null)}
        src={active?.image}
        title={active?.name}
        caption={active?.caption}
        alt={active?.caption}
        note={active?.message}
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
