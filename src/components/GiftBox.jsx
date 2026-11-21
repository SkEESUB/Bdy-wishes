import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import Section from "./decor/Section.jsx";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { birthday as cfg } from "../config/birthday.config.js";
import { useConfetti } from "../hooks/useConfetti.js";
import { sfx } from "../lib/sfx.js";
import { Bow, Heart, Sparkle, Star } from "./decor/Stickers.jsx";

const FLY = [
  { x: -120, y: -150, r: -160, d: 0 },
  { x: 110, y: -170, r: 150, d: 0.06 },
  { x: -60, y: -200, r: -80, d: 0.12 },
  { x: 60, y: -140, r: 90, d: 0.18 },
  { x: -150, y: -70, r: -120, d: 0.24 },
  { x: 150, y: -90, r: 130, d: 0.3 },
];

/**
 * SECTION 06 — Surprise gift box: the lid really lifts, the ribbon falls,
 * sparkles fly out and the hidden surprise is revealed.
 */
export default function GiftBox({ onComplete }) {
  const [opened, setOpened] = useLocalStorage("bs:gift-opened", false);
  const confetti = useConfetti();
  const reduce = useReducedMotion();
  const isOpen = !!opened;

  const toggle = () => {
    if (isOpen) {
      sfx.flip();
      setOpened(false);
      return;
    }
    sfx.open();
    setOpened(true);
    setTimeout(() => confetti.burst({ x: 0.5, y: 0.55 }, { count: 110, spread: 95 }), 260);
    setTimeout(() => confetti.pop(0.5, 0.45), 700);
    onComplete?.();
  };

  return (
    <Section id="gift" number={6} title={cfg.gift.heading} kicker={cfg.gift.teaser} palette="#A48FD0">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-full max-w-sm">
          {/* flying sparkles */}
          <AnimatePresence>
            {isOpen && (
              <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
                {FLY.map((f, i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2"
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
                    animate={{ x: f.x, y: f.y, opacity: [0, 1, 1, 0], scale: [0.5, 1.15, 1, 0.8], rotate: f.r }}
                    transition={{ duration: 1.5, delay: f.d, ease: "easeOut" }}
                  >
                    {i % 3 === 0 ? <Heart size={22} color="#E48BB0" /> : i % 3 === 1 ? <Star size={20} color="#FFE9B8" /> : <Sparkle size={18} color="#BBDFF5" />}
                  </motion.span>
                ))}
              </div>
            )}
          </AnimatePresence>

          <motion.div
            animate={isOpen ? { y: 0 } : { y: [0, -3, 0] }}
            transition={isOpen ? { duration: 0.3 } : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <svg viewBox="0 0 320 330" className="w-full" role="img" aria-label="A wrapped gift box">
              <defs>
                <linearGradient id="wrap" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FDE3EC" />
                  <stop offset="100%" stopColor="#F9C8D9" />
                </linearGradient>
                <linearGradient id="lidg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EFEAFF" />
                  <stop offset="100%" stopColor="#DCD4F2" />
                </linearGradient>
              </defs>

              {/* glow when open */}
              <motion.ellipse
                cx="160"
                cy="150"
                rx="120"
                ry="90"
                fill="#FFE9B8"
                initial={false}
                animate={{ opacity: isOpen ? 0.35 : 0 }}
                transition={{ duration: 0.6 }}
              />

              {/* inside surprise peeking out */}
              <motion.g initial={false} animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 12 }}>
                <rect x="108" y="128" width="104" height="72" rx="10" fill="#FFF7EC" />
                <rect x="108" y="128" width="104" height="16" rx="8" fill="#FFE9B8" />
                <circle cx="140" cy="172" r="7" fill="#F9C8D9" />
                <circle cx="180" cy="178" r="6" fill="#BBDFF5" />
              </motion.g>

              {/* box body */}
              <rect x="86" y="192" width="148" height="112" rx="12" fill="url(#wrap)" />
              <rect x="86" y="192" width="148" height="112" rx="12" fill="none" stroke="#E48BB0" strokeWidth="2" opacity="0.5" />
              <rect x="150" y="192" width="20" height="112" fill="#A48FD0" opacity="0.85" />
              <rect x="86" y="238" width="148" height="16" fill="#A48FD0" opacity="0.55" />

              {/* ribbon tails falling out when opened */}
              <motion.g initial={false} animate={isOpen ? { y: 46, rotate: 8, opacity: 1 } : { y: 0, rotate: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 80, damping: 12 }}>
                <path d="M104 176c-14 26-4 44 8 56" stroke="#A48FD0" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M216 176c14 26 4 44-8 56" stroke="#A48FD0" strokeWidth="8" fill="none" strokeLinecap="round" />
              </motion.g>

              {/* lid */}
              <motion.g
                style={{ transformBox: "fill-box", transformOrigin: "left bottom" }}
                initial={false}
                animate={isOpen ? { y: -104, rotate: -22, x: -18 } : { y: 0, rotate: 0, x: 0 }}
                transition={{ type: "spring", stiffness: 110, damping: 13 }}
              >
                <rect x="72" y="168" width="176" height="30" rx="9" fill="url(#lidg)" />
                <rect x="72" y="168" width="176" height="30" rx="9" fill="none" stroke="#A48FD0" strokeWidth="2" opacity="0.5" />
                <rect x="152" y="168" width="20" height="30" fill="#A48FD0" opacity="0.8" />
                <g transform="translate(160 160)">
                  <path d="M0 8C-14-6-30-6-30 4s14 14 30 4z" fill="#E48BB0" />
                  <path d="M0 8C14-6 30-6 30 4S16 18 0 8z" fill="#E48BB0" />
                  <path d="M0 8c-6 8-8 12-9 18M0 8c6 8 8 12 9 18" stroke="#E48BB0" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <circle cx="0" cy="7" r="5" fill="#fff" opacity="0.5" />
                </g>
              </motion.g>
            </svg>
          </motion.div>
        </div>

        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-lav-deep px-6 py-3 font-cute text-lg font-bold text-white shadow-scrap-lg transition hover:scale-105"
        >
          {isOpen ? <><Sparkles size={18} /> {cfg.gift.afterLabel}</> : <><Gift size={18} /> {cfg.gift.tapLabel}</>}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 26, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
              className="paper paper-dashed w-full max-w-xl overflow-hidden p-0"
            >
              <div className="relative">
                <img src={cfg.gift.image} alt="Illustration of an open pastel gift box" className="h-44 w-full object-cover sm:h-56" />
                <span className="tape absolute -top-2 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 rounded-[2px]" aria-hidden="true" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-hand text-3xl font-bold text-blue-ink">{cfg.gift.revealTitle}</h3>
                <p className="mx-auto mt-3 max-w-lg font-body text-blue-ink/85">{cfg.gift.message}</p>
                <p className="mt-4 font-cute text-base text-lav-deep">
                  with love, {cfg.recipient.from} · for {cfg.recipient.name}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && <p className="font-hand text-xl text-blue-ink/70">something small is hiding in there…</p>}
      </div>
    </Section>
  );
}
