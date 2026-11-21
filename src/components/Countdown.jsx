import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cake, Lock, PartyPopper, Sparkles } from "lucide-react";
import useCountdown from "../hooks/useCountdown.js";
import { birthday as cfg } from "../config/birthday.config.js";
import { Balloon, Flower, Heart as HeartSticker, Sparkle, Star } from "./decor/Stickers.jsx";
import heroImg from "../assets/images/birthday-hero.jpg";
import { sfx } from "../lib/sfx.js";

function Unit({ value, label, palette }) {
  const shown = String(value).padStart(2, "0");
  return (
    <div className="paper relative flex min-w-[62px] flex-col items-center px-2.5 py-2 sm:min-w-[84px] sm:px-4 sm:py-3.5 shadow-xs">
      <div className="relative h-[34px] w-full overflow-hidden sm:h-[48px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={shown}
            initial={{ y: 16, opacity: 0, rotate: -2 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center font-ui text-2xl font-bold tabular-nums sm:text-4xl"
            style={{ color: palette }}
          >
            {shown}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-cute text-[11px] uppercase tracking-[0.16em] text-blue-deep/80 sm:text-xs">
        {label}
      </span>
      <span className="absolute -right-1 -top-1 h-3 w-3 rotate-45" style={{ backgroundColor: `${palette}55` }} />
    </div>
  );
}

/**
 * SECTION 01 — Birthday Countdown (compact, viewport-fitting opener).
 * Reduced illustration size (max 420x230px), compact vertical spacing,
 * and a visible Continue button below the countdown.
 */
export default function Countdown({ onOpen, onSkip }) {
  const { days, hours, minutes, seconds, isBirthday, done, targetLabel } = useCountdown(cfg.date);
  const reduce = useReducedMotion();
  const [testUnlocked, setTestUnlocked] = useState(false);

  const palettes = ["#6FA8D6", "#E48BB0", "#A48FD0", "#D9A94B"];
  const isUnlocked = isBirthday || done || testUnlocked;

  const handleContinue = () => {
    sfx.pop();
    onOpen?.();
  };

  const handleSkip = () => {
    try {
      localStorage.setItem("bs:countdown-bypassed", "true");
    } catch {}
    sfx.pop();
    if (onSkip) {
      onSkip();
    } else {
      onOpen?.();
    }
  };

  return (
    <div className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-x-hidden px-4 py-4 sm:py-6 text-center">
      {/* Decorative floating stickers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Balloon className="anim-float absolute left-[5%] top-[8%]" size={30} color="#F9C8D9" />
        <Balloon className="anim-float absolute right-[7%] top-[8%]" size={26} color="#BBDFF5" style={{ animationDelay: "1.2s" }} />
        <Balloon className="anim-float absolute right-[12%] bottom-[12%]" size={34} color="#DCD4F2" style={{ animationDelay: "2.4s" }} />
        <Flower className="anim-sway absolute left-[8%] bottom-[10%]" size={26} petal="#FFE9B8" center="#F9C8D9" />
        <Star className="anim-twinkle absolute left-[20%] top-[6%]" size={16} color="#FFE9B8" />
        <Sparkle className="anim-twinkle absolute right-[22%] top-[18%]" size={14} color="#fff" style={{ animationDelay: "0.8s" }} />
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-2xl flex-col items-center"
      >
        {/* Main scrapbook card */}
        <div className="paper paper-dashed relative mb-3 w-full overflow-hidden p-4 sm:p-5 shadow-scrap">
          <HeartSticker className="absolute -left-2 -top-2 rotate-[-12deg]" size={24} color="#F9C8D9" />
          <HeartSticker className="absolute -right-2 bottom-3 rotate-[12deg]" size={22} color="#BBDFF5" />

          <p className="font-cute text-xs uppercase tracking-[0.2em] text-blue-deep/80 sm:text-sm">
            {cfg.countdown.kicker}
          </p>

          <h1 className="mt-1 font-hand text-2xl leading-tight font-bold text-blue-ink sm:text-4xl">
            {isUnlocked ? cfg.countdown.birthdayTodayHeading : cfg.countdown.heading}
          </h1>

          <p className="mx-auto mt-1.5 max-w-lg font-body text-xs text-blue-ink/80 sm:text-sm">
            {isUnlocked ? cfg.countdown.birthdayTodayMessage : cfg.countdown.message}
          </p>

          {/* Compact birthday illustration — Max 420px wide, max 220px high, never distorted */}
          <div className="relative mx-auto my-3 flex h-[160px] w-full max-w-[380px] items-center justify-center overflow-hidden rounded-2xl border-[3px] border-white bg-cream/40 shadow-scrap sm:h-[200px] sm:max-w-[420px]">
            <img
              src={heroImg}
              alt="Birthday cake illustration with balloons"
              className="h-full w-full object-contain p-1"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-white/85 px-3 py-1 font-cute text-[11px] text-blue-ink backdrop-blur-xs">
              <span>hand-drawn with love</span>
              <Cake size={13} className="text-pink-deep" />
            </div>
          </div>
        </div>

        {/* Countdown units */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <Unit value={days} label={cfg.countdown.unitLabels.days} palette={palettes[0]} />
          <Unit value={hours} label={cfg.countdown.unitLabels.hours} palette={palettes[1]} />
          <Unit value={minutes} label={cfg.countdown.unitLabels.minutes} palette={palettes[2]} />
          <Unit value={seconds} label={cfg.countdown.unitLabels.seconds} palette={palettes[3]} />
        </div>

        <p className="mt-2.5 font-hand text-base text-blue-ink/80 sm:text-lg">
          until {targetLabel} (IST)
        </p>

        {/* ACTION BUTTONS DIRECTLY BELOW COUNTDOWN */}
        <div className="mt-4 flex w-full max-w-xs flex-col items-center gap-2.5">
          {/* Continue button */}
          {isUnlocked ? (
            <motion.button
              type="button"
              onClick={handleContinue}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border-[3px] border-white bg-pink-deep px-8 py-3 font-cute text-lg font-bold text-white shadow-scrap-lg transition hover:bg-pink-deep/90 sm:text-xl cursor-pointer"
              aria-label="Continue to the birthday surprise"
            >
              <PartyPopper size={20} className="transition group-hover:rotate-12" />
              Continue
              <Sparkles size={18} />
            </motion.button>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border-[3px] border-white/80 bg-pink-pastel/70 px-8 py-3 font-cute text-lg font-bold text-blue-deep/50 shadow-sm opacity-80 cursor-not-allowed sm:text-xl"
              aria-disabled="true"
              aria-label="Continue button disabled until birthday"
            >
              <Lock size={18} className="opacity-60" />
              Continue
              <Sparkles size={16} className="opacity-40" />
            </button>
          )}

          {/* Skip Countdown button directly below Continue button */}
          <motion.button
            type="button"
            onClick={handleSkip}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-dashed border-pink-deep/60 bg-white/95 px-7 py-2.5 font-cute text-base font-bold text-pink-deep shadow-xs transition hover:border-pink-deep hover:bg-pink-pastel/60 active:scale-95 cursor-pointer"
            aria-label="Skip Countdown and enter password"
          >
            <span>Skip Countdown →</span>
          </motion.button>

          {/* Subtitle status message */}
          {!isUnlocked && (
            <p className="mt-0.5 font-cute text-xs text-blue-deep/75">
              The surprise unlocks at midnight on 24 November 2026 IST 🤍
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
