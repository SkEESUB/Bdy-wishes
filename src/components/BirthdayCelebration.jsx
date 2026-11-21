import { useEffect, useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { PartyPopper, RotateCw } from "lucide-react";
import Section from "./decor/Section.jsx";
import { birthday as cfg } from "../config/birthday.config.js";
import { useConfetti } from "../hooks/useConfetti.js";
import { sfx } from "../lib/sfx.js";
import { Balloon, Flower, Heart, Sparkle, Star } from "./decor/Stickers.jsx";

const LETTER_COLORS = ["#E48BB0", "#6FA8D6", "#A48FD0", "#D9A94B", "#6FBFA0"];

/**
 * SECTION 05 — Birthday celebration.
 * GSAP kinetic typography + confetti, balloons, hearts and flowers.
 */
export default function BirthdayCelebration({ onComplete }) {
  const scope = useRef(null);
  const headRef = useRef(null);
  const inView = useInView(scope, { once: true, amount: 0.35 });
  const confetti = useConfetti();
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const words = cfg.celebration.headline.split(" ");

  useEffect(() => {
    if (inView) {
      onComplete?.();
    }
  }, [inView, onComplete]);

  useEffect(() => {
    if (!inView || !headRef.current) return undefined;

    const happyLetters = headRef.current.querySelectorAll("[data-section='happy']");
    const birthdayLetters = headRef.current.querySelectorAll("[data-section='birthday']");
    const nameLetters = headRef.current.querySelectorAll("[data-section='name']");
    const heartEl = headRef.current.querySelector("[data-section='heart']");

    if (reduce) {
      gsap.set([happyLetters, birthdayLetters, nameLetters], {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        scale: 1,
      });
      if (heartEl) gsap.set(heartEl, { opacity: 1, scale: 1 });
      return undefined;
    }

    // Set initial handwriting state: hidden by left-to-right clip-path
    gsap.set([happyLetters, birthdayLetters, nameLetters], {
      opacity: 0,
      clipPath: "inset(0% 100% 0% 0%)",
      y: 8,
    });
    if (heartEl) {
      gsap.set(heartEl, { opacity: 0, scale: 0, rotate: -20 });
    }

    const tl = gsap.timeline();

    // 1. HAPPY appears first with handwriting reveal
    tl.to(happyLetters, {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      y: 0,
      duration: 0.18,
      stagger: 0.08,
      ease: "power2.out",
    })
      // 2. BIRTHDAY follows
      .to(
        birthdayLetters,
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 0.18,
          stagger: 0.07,
          ease: "power2.out",
        },
        "+=0.08"
      )
      // 3. Sri Lakshmi appears underneath
      .to(
        nameLetters,
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 0.16,
          stagger: 0.06,
          ease: "power2.out",
        },
        "+=0.12"
      )
      // 4. Heart appears last with a gentle pop animation
      .to(
        heartEl,
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.55,
          ease: "back.out(2.2)",
        },
        "+=0.1"
      );

    return () => tl.kill();
  }, [inView, reduce]);

  useEffect(() => {
    if (!inView) return;
    confetti.bigBang();
    sfx.party();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Section
      id="celebration"
      number={2}
      title="the big moment"
      kicker="confetti, balloons and a very loud cheer"
      palette="#E48BB0"
      bare
    >
      <div ref={scope} className="relative overflow-hidden rounded-[28px] border-2 border-white bg-gradient-to-b from-blue-soft/80 via-cream to-pink-soft/70 p-4 sm:p-10 text-center shadow-scrap-lg">
        {/* decorations */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {[
            { l: "6%", t: "18%", c: "#F9C8D9", s: 34, d: 0 },
            { l: "88%", t: "12%", c: "#BBDFF5", s: 28, d: 0.9 },
            { l: "78%", t: "62%", c: "#DCD4F2", s: 40, d: 1.8 },
            { l: "16%", t: "66%", c: "#C9EBDD", s: 30, d: 2.6 },
          ].map((b, i) => (
            <Balloon key={i} className="anim-float absolute" size={b.s} color={b.c} style={{ left: b.l, top: b.t, animationDelay: `${b.d}s` }} />
          ))}
          <Flower className="anim-sway absolute left-[10%] top-[42%]" size={26} petal="#FFE9B8" center="#F9C8D9" />
          <Flower className="anim-sway absolute right-[8%] top-[46%]" size={30} petal="#F9C8D9" center="#FFF7EC" style={{ animationDelay: "1.4s" }} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Sparkle
              key={`s${i}`}
              className="anim-twinkle absolute"
              size={14}
              color="#fff"
              style={{ left: `${8 + i * 11}%`, top: `${12 + (i % 3) * 26}%`, animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border-2 border-white bg-white/80 px-4 py-1.5 font-cute text-sm text-pink-deep shadow-sm"
          >
            <PartyPopper size={15} /> hooray, it's official
          </motion.div>

          <div
            ref={headRef}
            className="text-stroke-white mx-auto flex flex-col items-center justify-center font-hand font-bold"
            aria-label="Happy Birthday Sri Lakshmi"
          >
            {/* Line 1: HAPPY BIRTHDAY */}
            <h3 className="flex flex-wrap items-baseline justify-center gap-x-3 text-[12vw] sm:text-[8vw] md:text-[76px] leading-[0.95]">
              {words.map((word, wi) => {
                const sectionName = wi === 0 ? "happy" : "birthday";
                return (
                  <span key={wi} className="inline-flex">
                    {word.split("").map((ch, ci) => (
                      <span
                        key={`hb-${wi}-${ci}`}
                        data-letter
                        data-section={sectionName}
                        className="inline-block"
                        style={{ color: LETTER_COLORS[(wi * 3 + ci) % LETTER_COLORS.length] }}
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                );
              })}
            </h3>

            {/* Line 2: Sri Lakshmi ❤️ directly underneath */}
            <div className="mt-2 sm:mt-3 flex flex-wrap items-center justify-center gap-x-2 text-[10vw] sm:text-[6.5vw] md:text-[62px] leading-tight">
              {"Sri Lakshmi".split(" ").map((word, wi) => (
                <span key={wi} className="inline-flex">
                  {word.split("").map((ch, ci) => (
                    <span
                      key={`sl-${wi}-${ci}`}
                      data-letter
                      data-section="name"
                      className="inline-block"
                      style={{ color: LETTER_COLORS[(wi * 2 + ci + 1) % LETTER_COLORS.length] }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
              <span
                data-letter
                data-section="heart"
                className="inline-block text-[8vw] sm:text-[5.5vw] md:text-[50px] ml-1 select-none"
                style={{ color: "#E48BB0" }}
                aria-hidden="true"
              >
                ❤️
              </span>
            </div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="paper paper-dashed mx-auto mt-6 max-w-2xl p-4 sm:p-8"
          >
            <div className="mb-3 flex justify-center gap-1" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Heart key={i} className="anim-float" size={20} color={LETTER_COLORS[i]} style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
            <p className="font-hand text-2xl leading-snug text-blue-ink sm:text-3xl">
              {cfg.celebration.message}
            </p>
            <p className="mt-4 font-cute text-lg text-blue-deep">{cfg.celebration.subline}</p>
            <p className="mt-1 font-body text-sm text-blue-ink/70">
              {cfg.celebration.signature} {cfg.recipient.from}
            </p>
          </motion.div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Star key={i} className="anim-twinkle" size={16} color={["#FFE9B8", "#F9C8D9", "#DCD4F2", "#C9EBDD"][i % 4]} style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              confetti.bigBang();
              sfx.party();
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-pink-deep px-6 py-3 font-cute text-lg font-bold text-white shadow-scrap-lg transition hover:scale-105"
          >
            <RotateCw size={17} /> more confetti, please
          </button>
        </div>
      </div>
      <span id={uid} className="sr-only">
        birthday celebration for {cfg.recipient.name}
      </span>
    </Section>
  );
}
