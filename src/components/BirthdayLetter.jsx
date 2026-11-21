import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail, MailOpen, X } from "lucide-react";
import Section from "./decor/Section.jsx";
import { birthday as cfg } from "../config/birthday.config.js";
import { useConfetti } from "../hooks/useConfetti.js";
import { sfx } from "../lib/sfx.js";
import { Flower, Heart, Sparkle, Leaf, Bow } from "./decor/Stickers.jsx";

function Parchment({ onClose }) {
  const reduce = useReducedMotion();
  const L = cfg.letter;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 60, scale: 0.9, rotateX: -18 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: 30, scale: 0.94 }}
      transition={{ type: "spring", stiffness: 130, damping: 18 }}
      style={{ transformPerspective: 1200 }}
      className="parchment relative mx-auto w-full max-w-3xl rounded-[22px] border-[3px] border-[#E4D3B8] p-4 sm:p-10"
    >
      {/* folded-paper creases */}
      <span className="pointer-events-none absolute inset-x-6 top-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#C4A87A]/25 to-transparent" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-x-6 top-2/3 h-[2px] bg-gradient-to-r from-transparent via-[#C4A87A]/20 to-transparent" aria-hidden="true" />
      {/* floral borders */}
      <span className="pointer-events-none absolute inset-3 rounded-[16px] border border-dashed border-[#C4A87A]/45" aria-hidden="true" />
      <Flower className="absolute -left-4 -top-4" size={34} petal="#F9C8D9" center="#FFE9B8" />
      <Flower className="absolute -right-3 -top-3" size={28} petal="#DCD4F2" center="#FFF7EC" />
      <Leaf className="absolute -bottom-3 -left-3 rotate-12" size={26} />
      <Leaf className="absolute -bottom-3 -right-3 -rotate-12" size={22} color="#F9C8D9" />

      <button
        type="button"
        onClick={onClose}
        aria-label="Fold the letter back up"
        className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border-2 border-[#C4A87A]/50 bg-white/70 text-blue-ink transition hover:bg-pink-pastel"
      >
        <X size={16} />
      </button>

      <p className="text-center font-cute text-sm uppercase tracking-[0.3em] text-[#A4834F]">
        a letter from {cfg.recipient.from}
      </p>
      <h3 className="mt-2 text-center font-hand text-4xl font-bold text-[#5A4632] sm:text-5xl">{L.title}</h3>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
        className="mt-6 space-y-4"
      >
        <motion.p variants={itemVariants} className="font-hand text-3xl text-[#5A4632]">
          {L.greeting}
        </motion.p>
        {L.paragraphs.map((para, i) => (
          <motion.p key={i} variants={itemVariants} className="font-hand text-xl leading-relaxed text-[#5A4632]/90 sm:text-2xl">
            {para}
          </motion.p>
        ))}
        <motion.div variants={itemVariants} className="pt-2 text-right">
          <p className="font-hand text-2xl text-[#5A4632]/80">{L.signoff}</p>
          <p className="font-hand text-3xl font-bold text-[#A4645F]">{L.signature}</p>
          <p className="mt-3 text-left font-cute text-base text-[#8A6E4C]">{L.postscript}</p>
        </motion.div>
      </motion.div>

      <div className="mt-6 flex items-center justify-center gap-3" aria-hidden="true">
        <Heart size={16} color="#E48BB0" />
        <Sparkle className="anim-twinkle" size={14} color="#D9A94B" />
        <Heart size={16} color="#6FA8D6" />
      </div>
    </motion.div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function Envelope({ opening, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, y: -20 }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      className="relative mx-auto w-full max-w-md"
      style={{ transformPerspective: 1000 }}
    >
      <div className="relative rounded-2xl border-[3px] border-white bg-gradient-to-b from-[#F7E6D4] to-[#EFD3BB] p-4 shadow-scrap-lg">
        {/* envelope body */}
        <div className="relative h-52 overflow-hidden rounded-xl bg-[#F3DCBF]">
          <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M0 0h400v200H0z" fill="#F3DCBF" />
            <path d="M0 8l200 118L400 8" fill="none" stroke="#D9B98F" strokeWidth="2" />
            <path d="M0 0l200 126L400 0z" fill="#EBD0AC" />
            <path d="M0 200l150-92M400 200L250 108" stroke="#D9B98F" strokeWidth="2" />
          </svg>
          {/* flap */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[62%] origin-top"
            style={{ transformPerspective: 900 }}
            animate={opening ? { rotateX: -168, zIndex: 1 } : { rotateX: 0, zIndex: 3 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 400 124" className="h-full w-full" aria-hidden="true">
              <path d="M0 0h400v124L200 124 0 0z" fill="#E9CBA3" />
              <path d="M0 0l200 124L400 0" fill="none" stroke="#D9B98F" strokeWidth="2" />
            </svg>
          </motion.div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-hand text-2xl text-[#7A5E3C]">
            for {cfg.recipient.name}
          </p>
          <Bow className="absolute left-1/2 top-[46%] -translate-x-1/2" size={54} color="#E48BB0" />
        </div>

        {/* wax seal */}
        <motion.button
          type="button"
          onClick={onOpen}
          disabled={opening}
          whileHover={{ scale: 1.12, rotate: -6 }}
          whileTap={{ scale: 0.9 }}
          animate={opening ? { scale: 0, opacity: 0, rotate: 160 } : { scale: 1, opacity: 1 }}
          className="absolute -bottom-6 left-1/2 z-10 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full border-4 border-white bg-pink-deep text-white shadow-scrap-lg"
          aria-label={cfg.letter.openLabel}
        >
          <Heart size={22} color="#fff" />
        </motion.button>
      </div>

      <p className="mt-10 text-center font-cute text-base text-blue-deep">{cfg.letter.openLabel} 💌</p>
    </motion.div>
  );
}

/**
 * SECTION 05 — Personal birthday letter (fold-open parchment).
 */
export default function BirthdayLetter({ onComplete }) {
  const [stage, setStage] = useState("sealed"); // sealed | opening | open
  const confetti = useConfetti();

  const open = () => {
    setStage("opening");
    sfx.chime();
    setTimeout(() => {
      setStage("open");
      confetti.burst({ x: 0.5, y: 0.45 }, { count: 60, spread: 70 });
      onComplete?.();
    }, 780);
  };

  return (
    <Section id="letter" number={5} title="A Letter For You" kicker="sealed, folded and a little smudged" palette="#D9A94B">
      <div className="flex min-h-[320px] items-center justify-center py-4">
        <AnimatePresence mode="wait">
          {stage === "open" ? (
            <motion.div key="letter" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Parchment
                onClose={() => {
                  sfx.flip();
                  setStage("sealed");
                }}
              />
            </motion.div>
          ) : (
            <Envelope key="envelope" opening={stage === "opening"} onOpen={open} />
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 font-cute text-sm text-blue-deep/70">
        {stage === "open" ? <MailOpen size={15} /> : <Mail size={15} />}
        {stage === "open" ? "you can fold it back up and read it again later" : "the wax seal is decorative, the feelings are not"}
      </div>
    </Section>
  );
}
