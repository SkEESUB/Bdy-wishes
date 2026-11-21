import { motion, useReducedMotion } from "framer-motion";
import { Flourish } from "./Stickers.jsx";

/**
 * Consistent scrapbook section wrapper: numbered sticker badge, handwritten
 * title, flourish and an on-scroll entrance.
 */
export default function Section({ id, number, title, kicker, palette = "#6FA8D6", children, className = "", bare = false }) {
  const reduce = useReducedMotion();
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 ${className}`}
      data-section={id}
    >
      <motion.header
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 text-center sm:mb-12"
      >
        {number && (
          <span
            className="sticker mb-3 inline-flex h-11 w-11 rotate-[-6deg] items-center justify-center rounded-full border-[3px] border-white font-ui text-sm font-bold text-blue-ink shadow-sm"
            style={{ backgroundColor: palette }}
          >
            {String(number).padStart(2, "0")}
          </span>
        )}
        {kicker && (
          <p className="font-cute text-base tracking-wide text-blue-deep/80 sm:text-lg">{kicker}</p>
        )}
        <h2 className="font-hand text-4xl leading-tight font-bold text-blue-ink sm:text-5xl md:text-6xl">
          {title}
        </h2>
        <Flourish className="mx-auto mt-3 w-56 max-w-full" color={palette} />
      </motion.header>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
      >
        {bare ? children : <div className="paper paper-dashed p-4 sm:p-8">{children}</div>}
      </motion.div>
    </section>
  );
}
