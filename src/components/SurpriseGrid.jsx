import { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, ImageOff, Sparkles } from "lucide-react";
import Section from "./decor/Section.jsx";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { useConfetti } from "../hooks/useConfetti.js";
import { birthday as cfg } from "../config/birthday.config.js";
import { sfx } from "../lib/sfx.js";
import { PALETTES } from "./decor/Stickers.jsx";

/**
 * SECTION 04 — Twelve Personalized Surprise Gifts.
 * Exact Card Structure:
 * 1. Gift item name as the card heading (e.g. ROSE 🌹)
 * 2. Beautiful image representing that exact gift directly underneath
 * 3. Gift-related heading or subtitle (e.g. First Impression & Smile)
 * 4. The complete personal message underneath the image
 */
export default function SurpriseGrid({ onComplete }) {
  const [opened, setOpened] = useLocalStorage("bs:surprises-opened", []);
  const [lovedCards, setLovedCards] = useState(new Set());
  const confetti = useConfetti();
  const reduce = useReducedMotion();

  const cards = cfg.surprises;
  const openSet = useMemo(() => new Set(opened), [opened]);

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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
        {cards.map((card, index) => {
          const p = PALETTES[card.palette] ?? PALETTES.pink;
          const isLoved = lovedCards.has(card.id) || openSet.has(card.id);
          const tilt = [-1.2, 1.2, -0.8, 1.4, -1, 0.8, -1.4, 1, -0.8, 1.2, -1.2, 0.9][index % 12];

          return (
            <motion.div
              key={card.id}
              initial={reduce ? false : { opacity: 0, y: 24, rotate: tilt * 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: tilt }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
              whileHover={{ scale: 1.025, rotate: 0, zIndex: 10 }}
              className="relative flex flex-col h-full rounded-2xl border-2 border-white bg-white/95 p-4 sm:p-5 shadow-scrap transition-all duration-300 hover:shadow-scrap-lg"
              style={{ backgroundColor: p.bg }}
            >
              {/* Tape sticker at top */}
              <span
                className="tape absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-1 rounded-[2px]"
                aria-hidden="true"
              />

              {/* 1. GIFT ITEM NAME AS THE CARD HEADING */}
              <div
                className="mb-3 flex items-center justify-between border-b border-dashed pb-2.5"
                style={{ borderColor: `${p.edge}44` }}
              >
                <span
                  className="sticker grid h-7 w-7 place-items-center rounded-full border-2 border-white font-ui text-xs font-bold text-blue-ink shadow-xs"
                  style={{ backgroundColor: p.accent }}
                >
                  {card.number}
                </span>

                <h3 className="font-hand text-xl sm:text-2xl font-bold tracking-wide text-blue-ink">
                  {card.itemName}
                </h3>

                <span className="font-cute text-xs text-blue-deep/60">
                  GIFT {String(card.number).padStart(2, "0")}
                </span>
              </div>

              {/* 2. BEAUTIFUL IMAGE REPRESENTING THAT EXACT GIFT DIRECTLY UNDERNEATH */}
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

              {/* 3. GIFT-RELATED HEADING OR SUBTITLE */}
              <h4 className="mt-3.5 font-hand text-2xl font-bold leading-tight text-blue-ink">
                {card.subtitle}
              </h4>

              {/* 4. COMPLETE PERSONAL MESSAGE UNDERNEATH THE IMAGE */}
              <p className="mt-2 flex-1 font-body text-sm sm:text-[15px] leading-relaxed text-blue-ink/90 whitespace-pre-line">
                "{card.description}"
              </p>

              {/* Interactive Sweet Heart action at bottom of card */}
              <div
                className="mt-4 flex items-center justify-between border-t border-dashed pt-3"
                style={{ borderColor: `${p.edge}44` }}
              >
                <button
                  type="button"
                  onClick={() => toggleHeart(card, index)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white bg-white/90 px-3 py-1 font-cute text-xs font-bold text-blue-ink shadow-xs transition hover:bg-pink-pastel active:scale-95 cursor-pointer"
                  aria-label={`Gift ${card.number}: ${card.itemName}`}
                >
                  <Heart
                    size={13}
                    className={isLoved ? "fill-pink-deep text-pink-deep" : "text-blue-deep"}
                  />
                  {isLoved ? "Cherished 🤍" : "Open gift"}
                </button>

                <span className="font-cute text-xs text-pink-deep flex items-center gap-1">
                  <Sparkles size={11} /> For Sri Lakshmi
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
