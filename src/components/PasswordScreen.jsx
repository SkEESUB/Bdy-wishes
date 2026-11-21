import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Delete, Lock, LockOpen, Sparkles } from "lucide-react";
import { birthday as cfg } from "../config/birthday.config.js";
import { sfx } from "../lib/sfx.js";
import { Flower, Heart, Sparkle, Star } from "./decor/Stickers.jsx";

const ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const MAX = 10;

/**
 * SECTION 02 — Secret password screen (playful client-side gate).
 * Custom on-screen letter keypad, shake-on-wrong, unlock animation.
 */
export default function PasswordScreen({ onUnlock }) {
  const [entry, setEntry] = useState("");
  const [wrong, setWrong] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const reduce = useReducedMotion();

  const submit = useCallback(
    (value) => {
      if (value.toLowerCase() === cfg.password.toLowerCase()) {
        setUnlocked(true);
        sfx.unlockKeys();
        setTimeout(() => onUnlock?.(), 1500);
      } else {
        setWrong(true);
        sfx.wrong();
        setTimeout(() => {
          setWrong(false);
          setEntry("");
        }, 900);
      }
    },
    [onUnlock]
  );

  const press = (ch) => {
    if (unlocked || entry.length >= MAX) return;
    sfx.key();
    const next = entry + ch;
    setEntry(next);
    if (next.length >= cfg.password.length) setTimeout(() => submit(next), 220);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Backspace") {
        setEntry((v) => v.slice(0, -1));
        return;
      }
      if (e.key === "Enter") {
        submit(entry);
        return;
      }
      if (/^[a-zA-Z]$/.test(e.key)) press(e.key.toLowerCase());
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry, submit]);

  return (
    <div className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Heart className="anim-float absolute left-[12%] top-[16%]" size={26} color="#F9C8D9" />
        <Heart className="anim-float absolute right-[14%] top-[24%]" size={20} color="#BBDFF5" style={{ animationDelay: "1.1s" }} />
        <Flower className="anim-sway absolute left-[8%] bottom-[18%]" size={28} petal="#DCD4F2" center="#FFE9B8" />
        <Star className="anim-twinkle absolute right-[10%] bottom-[24%]" size={18} color="#FFE9B8" />
        <Sparkle className="anim-twinkle absolute left-[26%] top-[8%]" size={14} color="#fff" />
      </div>

      <AnimatePresence mode="wait">
        {unlocked ? (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.3, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
            className="paper paper-dashed relative z-10 flex w-full max-w-sm flex-col items-center gap-4 p-10 text-center"
          >
            <LockOpen className="h-12 w-12 text-pink-deep" />
            <h2 className="font-hand text-4xl font-bold text-blue-ink">Unlocked!</h2>
            <p className="font-body text-blue-ink/80">for {cfg.recipient.name}'s eyes only…</p>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Sparkle
                  key={i}
                  className="anim-twinkle"
                  size={16}
                  color={["#E48BB0", "#6FA8D6", "#A48FD0", "#FFE9B8", "#6FBFA0", "#E48BB0"][i]}
                  style={{ animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="locked"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={wrong ? { x: [0, -8, 8, -6, 6, 0] } : { opacity: 1, y: 0, x: 0 }}
            transition={wrong ? { duration: 0.45 } : { duration: 0.6, ease: "easeOut" }}
            className="paper paper-dashed relative z-10 w-full max-w-sm p-6 sm:p-8"
          >
            <div className="mb-5 flex flex-col items-center text-center">
              <span className="mb-3 grid h-14 w-14 place-items-center rounded-full border-[3px] border-white bg-pink-pastel sticker">
                <Lock className="h-6 w-6 text-pink-deep" />
              </span>
              <h2 className="font-hand text-3xl font-bold text-blue-ink sm:text-4xl">Secret knock, please</h2>
              <p className="mt-1 font-cute text-base text-blue-deep/80">{cfg.recipient.name}, this one's just for you.</p>
              <p className="mt-1 font-body text-sm text-blue-ink/70">
                Hint: {cfg.passwordHint}
              </p>
            </div>

            <div
              className={`mb-4 flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-dashed ${
                wrong ? "border-pink-deep bg-pink-soft" : "border-blue-deep/40 bg-white/70"
              }`}
              aria-live="polite"
            >
              {Array.from({ length: Math.max(cfg.password.length, entry.length) }).map((_, i) => (
                <motion.span
                  key={i}
                  animate={wrong ? { y: [0, -6, 0] } : { y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className={`grid h-9 w-7 place-items-center rounded-lg font-ui text-lg font-bold ${
                    entry[i] ? "bg-blue-deep/85 text-white" : "bg-blue-soft/70 text-blue-deep/40"
                  }`}
                >
                  {entry[i] ? "•" : ""}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              {ROWS.map((row, ri) => (
                <div key={ri} className="flex justify-center gap-1.5" style={{ paddingLeft: ri * 8 }}>
                  {row.split("").map((ch) => (
                    <motion.button
                      key={ch}
                      type="button"
                      whileTap={{ scale: 0.88 }}
                      onClick={() => press(ch)}
                      disabled={unlocked}
                      aria-label={`letter ${ch}`}
                      className="h-11 w-9 rounded-xl border-2 border-white bg-white/85 font-ui text-sm font-bold text-blue-ink shadow-sm transition hover:bg-pink-pastel sm:h-12 sm:w-10 sm:text-base"
                    >
                      {ch}
                    </motion.button>
                  ))}
                </div>
              ))}
              <div className="mt-1 flex justify-center gap-2">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    sfx.key();
                    setEntry((v) => v.slice(0, -1));
                  }}
                  className="flex h-11 flex-1 items-center justify-center gap-1 rounded-xl border-2 border-white bg-blue-soft font-cute text-base text-blue-ink transition hover:bg-lavender sm:h-12"
                >
                  <Delete size={16} /> back
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => submit(entry)}
                  className="flex h-11 flex-1 items-center justify-center gap-1 rounded-xl border-2 border-white bg-pink-deep font-cute text-base font-bold text-white transition hover:scale-[1.03] sm:h-12"
                >
                  unlock
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {wrong && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-center font-hand text-xl text-pink-deep"
                >
                  hmm, not quite — try again 💭
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
