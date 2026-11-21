import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mic, MicOff, Wind, ArrowRight } from "lucide-react";
import Section from "./decor/Section.jsx";
import useBlowDetection from "../hooks/useBlowDetection.js";
import { useConfetti } from "../hooks/useConfetti.js";
import { birthday as cfg } from "../config/birthday.config.js";
import { sfx } from "../lib/sfx.js";

const W = 420;
const H = 340;

function Flame({ x, y, out, delay = 0 }) {
  return (
    <g>
      <ellipse cx={x} cy={y - 6} rx="9" ry="12" fill="#FFE9B8" opacity={out ? 0 : 0.35} className="anim-twinkle" style={{ animationDelay: `${delay}s` }} />
      <AnimatePresence>
        {!out && (
          <motion.g
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.3 }}
            style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
          >
            <g className="anim-flicker" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${delay}s` }}>
              <path d={`M${x} ${y - 20} c5 6 6 9 6 12 a6 6 0 0 1 -12 0 c0 -3 1 -6 6 -12z`} fill="#FFB84D" />
              <path d={`M${x} ${y - 12} c3 4 3.6 6 3.6 8 a3.6 3.6 0 0 1 -7.2 0 c0 -2 0.6 -4 3.6 -8z`} fill="#FFF3C4" />
            </g>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {out && (
          <motion.g initial={{ opacity: 0.7 }} animate={{ opacity: 0, y: -46 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, ease: "easeOut" }}>
            <circle cx={x - 2} cy={y - 18} r="5" fill="#E8EEF2" opacity="0.75" />
            <circle cx={x + 4} cy={y - 30} r="7" fill="#E8EEF2" opacity="0.5" />
            <circle cx={x - 1} cy={y - 44} r="9" fill="#E8EEF2" opacity="0.3" />
          </motion.g>
        )}
      </AnimatePresence>
    </g>
  );
}

/**
 * SECTION 03 — Blow the candles.
 * Microphone blow detection (Web Audio API) with a manual fallback button.
 */
export default function CandleCake({ onComplete }) {
  const total = cfg.candles.count;
  const [out, setOut] = useState(() => Array.from({ length: total }, () => false));
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();
  const confetti = useConfetti();
  const outCount = out.filter(Boolean).length;
  const finishing = useRef(false);

  const extinguish = useCallback(
    (howMany = 1) => {
      setOut((prev) => {
        const next = [...prev];
        let n = howMany;
        for (let i = 0; i < next.length && n > 0; i += 1) {
          if (!next[i]) {
            next[i] = true;
            n -= 1;
            sfx.candleOut();
          }
        }
        const remaining = next.filter((v) => !v).length;
        if (remaining === 0 && !finishing.current) {
          finishing.current = true;
          setTimeout(() => {
            confetti.burst({ x: 0.5, y: 0.55 }, { count: 120, spread: 100 });
            sfx.chime();
            setDone(true);
            onComplete?.();
          }, 450);
        }
        return next;
      });
    },
    [confetti, onComplete]
  );

  const blow = useBlowDetection({ onBlow: () => extinguish(2), enabled: true });

  const manualBlow = () => {
    sfx.puff();
    let i = 0;
    const remaining = out.filter((v) => !v).length;
    const step = () => {
      if (i >= remaining) return;
      extinguish(1);
      i += 1;
      setTimeout(step, 260);
    };
    step();
  };

  useEffect(() => () => blow.stop(), [blow.stop]);

  const candleXs = Array.from({ length: total }, (_, i) => 150 + i * (120 / Math.max(1, total - 1)));
  const micLabel = { idle: "Tap to enable the microphone", requesting: "Asking for permission…", listening: "Listening… blow now!", denied: "Microphone declined", unsupported: "Microphone unavailable", error: "Microphone error" };

  return (
    <Section id="candles" number={1} title={cfg.candles.heading} kicker="the first little ceremony" palette="#E48BB0">
      <div className="flex flex-col items-center gap-6">
        <p className="max-w-xl text-center font-body text-blue-ink/85">{cfg.candles.hint}</p>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md drop-shadow-sm" role="img" aria-label="A pastel birthday cake with candles">
          <defs>
            <linearGradient id="tier1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF7EC" />
              <stop offset="100%" stopColor="#F6E3D2" />
            </linearGradient>
            <linearGradient id="tier2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE9B8" />
              <stop offset="100%" stopColor="#F7DCA5" />
            </linearGradient>
          </defs>

          <ellipse cx="210" cy="306" rx="150" ry="22" fill="#DCD4F2" opacity="0.55" />
          <ellipse cx="210" cy="300" rx="140" ry="20" fill="#fff" />

          {/* bottom tier */}
          <rect x="86" y="212" width="248" height="86" rx="16" fill="url(#tier2)" />
          <rect x="86" y="206" width="248" height="24" rx="12" fill="#F9C8D9" />
          <path d="M86 218c14 12 26 0 40 10s26-2 40 8 26-4 40 6 26-6 40 4 28-4 42 6v-14H86z" fill="#F9C8D9" opacity="0.95" />
          {[120, 170, 220, 270, 310].map((x, i) => (
            <circle key={x} cx={x} cy={250 + (i % 2) * 16} r="4" fill={["#E48BB0", "#6FA8D6", "#DCD4F2", "#FFE9B8", "#C9EBDD"][i % 5]} />
          ))}

          {/* top tier */}
          <rect x="128" y="146" width="164" height="72" rx="14" fill="url(#tier1)" />
          <rect x="128" y="140" width="164" height="22" rx="11" fill="#BBDFF5" />
          <path d="M128 150c12 10 22 0 34 8s22-2 34 6 22-4 34 4 22-4 28 2v-12h-164z" fill="#BBDFF5" opacity="0.9" />

          {/* candles */}
          {candleXs.map((x, i) => (
            <g key={i}>
              <rect x={x - 4} y={out[i] ? 108 : 106} width="8" height="38" rx="4" fill={["#F9C8D9", "#BBDFF5", "#DCD4F2", "#FFE9B8", "#C9EBDD"][i % 5]} />
              <rect x={x - 4} y={108} width="8" height="6" fill="#fff" opacity="0.5" />
              <line x1={x} y1={106} x2={x} y2={100} stroke="#4A5A6A" strokeWidth="2" strokeLinecap="round" />
              <Flame x={x} y={102} out={out[i]} delay={i * 0.14} />
            </g>
          ))}
        </svg>

        <div className="flex w-full max-w-md flex-col items-center gap-3">
          <div className="flex w-full items-center gap-2" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="h-2 flex-1 rounded-full transition-all duration-150"
                style={{
                  backgroundColor: blow.level * 12 > i ? "#E48BB0" : "#BBDFF5",
                  transform: `scaleY(${0.6 + (blow.level * 12 > i ? 1 : 0.4)})`,
                }}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => (blow.listening ? blow.stop() : blow.start())}
              disabled={done}
              className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full border-[3px] border-white px-3.5 sm:px-5 py-2 sm:py-3 font-cute text-sm sm:text-lg shadow-scrap transition disabled:opacity-50 ${
                blow.listening ? "bg-pink-deep text-white" : "bg-white text-blue-ink hover:bg-pink-soft"
              }`}
            >
              {blow.listening ? <Mic size={16} /> : <MicOff size={16} />}
              {micLabel[blow.status]}
            </button>

            <button
              type="button"
              onClick={manualBlow}
              disabled={done}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border-[3px] border-white bg-blue-deep px-4 sm:px-5 py-2 sm:py-3 font-cute text-sm sm:text-lg text-white shadow-scrap transition hover:scale-105 disabled:opacity-50"
            >
              <Wind size={16} /> Blow for me
            </button>
          </div>

          {blow.error && <p className="text-center font-body text-sm text-pink-deep">{blow.error} {cfg.candles.micDenied}</p>}
          <p className="font-cute text-sm text-blue-deep/80">
            {done ? cfg.candles.afterBlow : `${outCount} of ${total} candles out`}
          </p>
        </div>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="paper flex flex-col items-center gap-3 p-5 text-center"
            >
              <p className="font-hand text-2xl text-blue-ink">{cfg.candles.wishPrompt}</p>
              <button
                type="button"
                onClick={() => onComplete?.({ scrolled: true })}
                className="inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-pink-deep px-6 py-3 font-cute text-lg font-bold text-white shadow-scrap-lg transition hover:scale-105"
              >
                On to celebration <ArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
