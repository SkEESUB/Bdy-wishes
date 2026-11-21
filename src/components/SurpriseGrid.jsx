import { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Gift, Heart, ImageOff, RotateCw, Sparkles } from "lucide-react";
import Section from "./decor/Section.jsx";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { useConfetti } from "../hooks/useConfetti.js";
import { birthday as cfg } from "../config/birthday.config.js";
import { sfx } from "../lib/sfx.js";
import { PALETTES } from "./decor/Stickers.jsx";

/**
 * SECTION 04 — Twelve Personalized Surprise Gifts with 3D Flip Animation.
 * FRONT: Item name, gift image, small gift icon, cute scrapbook styling.
 * ON CLICK: Smooth 3D Y-axis flip (180 deg) revealing back side.
 * TEXT ANIMATION: Subtle fade-in combined with slight upward movement after flip completes.
 * BACK: Gift name, complete Telugu-English message, decorative icon, close/flip-back interaction.
 */
export default function SurpriseGrid({ onComplete }) {
  const [opened, setOpened] = useLocalStorage("bs:surprises-opened", []);
  const [lovedCards, setLovedCards] = useState(new Set());
  const [flippedCards, setFlippedCards] = useState(new Set());
  const confetti = useConfetti();
  const reduce = useReducedMotion();

  const cards = cfg.surprises;
  const openSet = useMemo(() => new Set(opened), [opened]);

  const toggleFlip = useCallback(
    (card, index) => {
      sfx.pop();
      setFlippedCards((prev) => {
        const next = new Set(prev);
        if (next.has(card.id)) next.delete(card.id);
        else next.add(card.id);
        return next;
      });

      if (!openSet.has(card.id)) {
        const nextOpened = [...opened, card.id];
        setOpened(nextOpened);
        confetti.pop(0.2 + (index % 4) * 0.2, 0.55);
        if (nextOpened.length >= 3) {
          onComplete?.();
        }
      }
    },
    [confetti, openSet, opened, onComplete, setOpened]
  );

  const toggleHeart = useCallback(
    (card, index) => {
      sfx.pop();
      setLovedCards((prev) => {
        const next = new Set(prev);
        if (next.has(card.id)) next.delete(card.id);
        else next.add(card.id);
        return next;
      });

      if (!openSet.has(card.id)) {
        const nextOpened = [...opened, card.id];
        setOpened(nextOpened);
        confetti.pop(0.2 + (index % 4) * 0.2, 0.55);
        if (nextOpened.length >= 3) {
          onComplete?.();
        }
      }
    },
    [confetti, openSet, opened, onComplete, setOpened]
  );

  return (
    <Section
      id="surprises"
      number={4}
      title="Twelve Little Surprises"
      kicker="handmade, personal & chosen with love"
      palette="#6FBFA0"
    >
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          {cards.map((c) => (
            <span
              key={c.id}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                openSet.has(c.id) ? "bg-pink-deep scale-110" : "bg-blue-deep/25"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="font-cute text-base text-blue-deep">
          {openSet.size} of {cards.length} surprises opened {openSet.size === cards.length ? "— you've seen every special gift! 🎉" : openSet.size >= 3 ? "— next chapter unlocked below!" : "— open any 3 to unlock next chapter"}
        </p>
      </div>

      {/* Balanced, perfectly aligned grid: 4 cols on desktop, 3 on tablet, 2 on mobile, 1 on small screens */}
      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 items-stretch">
        {cards.map((card, index) => {
          const p = PALETTES[card.palette] ?? PALETTES.pink;
          const isLoved = lovedCards.has(card.id);
          const isFlipped = flippedCards.has(card.id);
          const tilt = [-1.2, 1.2, -0.8, 1.4, -1, 0.8, -1.4, 1, -0.8, 1.2, -1.2, 0.9][index % 12];

          return (
            <div
              key={card.id}
              className="relative flex flex-col h-full min-h-[460px] sm:min-h-[510px] [perspective:1200px] cursor-pointer select-none"
              onClick={() => toggleFlip(card, index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleFlip(card, index);
                }
              }}
              aria-label={`Gift ${card.number}: ${card.itemName}. ${isFlipped ? "Showing message, click to flip back" : "Click to flip and read message"}`}
            >
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={reduce ? { duration: 0.15 } : { duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                className="relative w-full h-full flex flex-col flex-1"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* ==================== FRONT FACE ==================== */}
                <div
                  className="absolute inset-0 flex flex-col h-full rounded-2xl border-2 border-white p-3 sm:p-5 shadow-scrap transition-shadow hover:shadow-scrap-lg"
                  style={{
                    backgroundColor: p.bg,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* Tape sticker at top */}
                  <span
                    className="tape absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-1 rounded-[2px]"
                    aria-hidden="true"
                  />

                  {/* 1. FRONT HEADER: Sticker Number, Item Name, Small Decorative Gift Icon */}
                  <div
                    className="mb-2.5 sm:mb-3 flex items-center justify-between border-b border-dashed pb-2 sm:pb-2.5 gap-1"
                    style={{ borderColor: `${p.edge}44` }}
                  >
                    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                      <span
                        className="sticker grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full border-2 border-white font-ui text-[11px] sm:text-xs font-bold text-blue-ink shadow-xs"
                        style={{ backgroundColor: p.accent }}
                      >
                        {card.number}
                      </span>
                      <Gift size={14} className="text-pink-deep hidden min-[380px]:inline-block" />
                    </div>

                    <h3 className="font-hand text-lg sm:text-2xl font-bold tracking-wide text-blue-ink truncate">
                      {card.itemName}
                    </h3>

                    <span className="font-cute text-[11px] sm:text-xs text-blue-deep/60 hidden min-[420px]:inline shrink-0">
                      GIFT {String(card.number).padStart(2, "0")}
                    </span>
                  </div>

                  {/* 2. BEAUTIFUL IMAGE REPRESENTING THAT EXACT GIFT */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 border-white bg-white shadow-xs">
                    <img
                      src={card.image}
                      alt={card.itemName}
                      loading="lazy"
                      className="h-full w-full object-contain p-2 transition duration-500 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        if (e.currentTarget.nextElementSibling) {
                          e.currentTarget.nextElementSibling.style.display = "flex";
                        }
                      }}
                    />
                    <div
                      className="hidden h-full w-full flex-col items-center justify-center bg-blue-soft p-3 text-center font-cute text-xs text-blue-deep"
                      aria-hidden="true"
                    >
                      <ImageOff size={24} className="mb-1 opacity-60" />
                      <span>{card.itemName}</span>
                    </div>
                  </div>

                  {/* 3. FRONT SUBTITLE & FLIP HINT */}
                  <div className="mt-2.5 sm:mt-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-hand text-lg sm:text-2xl font-bold leading-tight text-blue-ink line-clamp-2">
                        {card.subtitle}
                      </h4>
                      <p className="mt-1 sm:mt-1.5 font-cute text-[11px] sm:text-xs text-blue-deep/75 flex items-center gap-1">
                        <Sparkles size={11} className="text-pink-deep shrink-0" />
                        Tap card to flip & reveal note 💌
                      </p>
                    </div>

                    {/* FRONT BOTTOM ACTION */}
                    <div
                      className="mt-3 sm:mt-4 flex items-center justify-between border-t border-dashed pt-2.5 sm:pt-3 gap-1"
                      style={{ borderColor: `${p.edge}44` }}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(card, index);
                        }}
                        className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-white bg-white/95 px-2.5 sm:px-3 py-1 font-cute text-[11px] sm:text-xs font-bold text-pink-deep shadow-xs transition hover:bg-pink-pastel active:scale-95 cursor-pointer"
                        aria-label={`Flip gift ${card.number}: ${card.itemName}`}
                      >
                        <Gift size={12} className="text-pink-deep" />
                        <span>Open gift ↺</span>
                      </button>

                      <span className="font-cute text-[10px] sm:text-xs text-pink-deep hidden min-[380px]:inline-flex items-center gap-1">
                        <Sparkles size={10} /> For Sri Lakshmi
                      </span>
                    </div>
                  </div>
                </div>

                {/* ==================== BACK FACE (180deg) ==================== */}
                <div
                  className="absolute inset-0 flex flex-col h-full rounded-2xl border-2 border-white p-3 sm:p-5 shadow-scrap transition-shadow hover:shadow-scrap-lg"
                  style={{
                    backgroundColor: p.bg,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {/* Tape sticker at top */}
                  <span
                    className="tape absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-1 rounded-[2px]"
                    aria-hidden="true"
                  />

                  {/* 1. BACK HEADER */}
                  <div
                    className="mb-2.5 sm:mb-3 flex items-center justify-between border-b border-dashed pb-2 sm:pb-2.5 gap-1"
                    style={{ borderColor: `${p.edge}44` }}
                  >
                    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                      <span
                        className="sticker grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full border-2 border-white font-ui text-[11px] sm:text-xs font-bold text-blue-ink shadow-xs"
                        style={{ backgroundColor: p.accent }}
                      >
                        {card.number}
                      </span>
                      <Gift size={14} className="text-pink-deep hidden min-[380px]:inline-block" />
                    </div>

                    <h3 className="font-hand text-lg sm:text-2xl font-bold tracking-wide text-blue-ink truncate">
                      {card.itemName}
                    </h3>

                    <span className="sticker rounded-full bg-white/80 px-2 py-0.5 font-cute text-[10px] sm:text-[11px] text-pink-deep shrink-0">
                      Note 💌
                    </span>
                  </div>

                  {/* 2. BACK BODY: Subtitle and SEPARATELY ANIMATED DESCRIPTION */}
                  <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-0.5 sm:pr-1">
                    <div>
                      <div className="flex items-center gap-1 sm:gap-1.5 text-blue-deep font-hand text-lg sm:text-2xl font-bold leading-tight">
                        <Sparkles size={14} className="text-pink-deep shrink-0" />
                        <h4>{card.subtitle}</h4>
                      </div>

                      {/* TEXT ANIMATION: Subtle fade-in combined with slight upward movement after flip */}
                      <motion.div
                        initial={false}
                        animate={isFlipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                        transition={{
                          duration: 0.45,
                          delay: isFlipped ? 0.35 : 0,
                          ease: "easeOut",
                        }}
                        className="paper paper-dashed mt-2 sm:mt-3 p-2.5 sm:p-4 bg-white/95 border border-white"
                      >
                        <p className="font-body text-xs sm:text-[15px] leading-relaxed text-blue-ink/90 whitespace-pre-line">
                          "{card.description}"
                        </p>
                      </motion.div>
                    </div>

                    {/* BACK BOTTOM ACTION: Flip Back button + Cherished heart */}
                    <div
                      className="mt-3 sm:mt-4 flex items-center justify-between border-t border-dashed pt-2.5 sm:pt-3 gap-1"
                      style={{ borderColor: `${p.edge}44` }}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(card, index);
                        }}
                        className="inline-flex items-center gap-1 rounded-full border border-white bg-white/95 px-2 sm:px-3 py-1 font-cute text-[10px] sm:text-xs font-bold text-blue-ink shadow-xs transition hover:bg-blue-soft active:scale-95 cursor-pointer"
                        aria-label={`Flip back gift ${card.number}`}
                      >
                        <RotateCw size={11} className="text-blue-deep" />
                        <span>Flip back ↺</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleHeart(card, index);
                        }}
                        className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 sm:px-3 py-1 font-cute text-[10px] sm:text-xs font-bold text-pink-deep border border-white transition hover:bg-pink-pastel active:scale-95 cursor-pointer"
                        aria-label="Cherish this gift"
                      >
                        <Heart
                          size={11}
                          className={isLoved ? "fill-pink-deep text-pink-deep" : "text-pink-deep"}
                        />
                        <span>{isLoved ? "Cherished 🤍" : "Love this"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
