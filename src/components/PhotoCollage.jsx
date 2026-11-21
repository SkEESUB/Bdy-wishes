import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Expand, ImageOff } from "lucide-react";
import Section from "./decor/Section.jsx";
import Lightbox from "./decor/Lightbox.jsx";
import { birthday as cfg } from "../config/birthday.config.js";
import { sfx } from "../lib/sfx.js";
import { Flower, Heart, Sparkle, Star, Butterfly } from "./decor/Stickers.jsx";

/**
 * SECTION 03 — Polaroid & Paper Photo Collage.
 * Exactly 4 personal photographs with captions, individual memory descriptions,
 * aspect-ratio preservation, and click-to-expand lightbox.
 */
export default function PhotoCollage({ onComplete }) {
  const [openIdx, setOpenIdx] = useState(null);
  const bottomRef = useRef(null);
  const isBottomInView = useInView(bottomRef, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  // Exactly 4 photographs
  const photos = cfg.gallery.slice(0, 4);
  const active = openIdx !== null ? photos[openIdx] : null;

  // Trigger completion when bottom is reached or photo explored
  useEffect(() => {
    if (isBottomInView) {
      onComplete?.();
    }
  }, [isBottomInView, onComplete]);

  const decorations = [
    { C: Flower, props: { size: 26, petal: "#F9C8D9", center: "#FFE9B8" }, style: { top: -14, left: -14 } },
    { C: Heart, props: { size: 22, color: "#E48BB0" }, style: { top: -12, right: -12 } },
    { C: Star, props: { size: 18, color: "#FFE9B8" }, style: { bottom: -10, left: -10 } },
    { C: Butterfly, props: { size: 24, color: "#DCD4F2" }, style: { top: -16, right: -16 } },
  ];

  return (
    <Section id="collage" number={3} title="Polaroids & Paper" kicker="a wall of tiny happy moments" palette="#A48FD0">
      <p className="mx-auto mb-8 max-w-xl text-center font-body text-blue-ink/80">
        Tap any photograph to open it up. Exactly {photos.length} personal memories captured in time —
        tap or use arrow keys to browse through them.
      </p>

      {/* Balanced 4-photo grid: 1 col on small screens, 2 cols on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
        {photos.map((p, i) => {
          const deco = decorations[i % decorations.length];
          const Deco = deco.C;
          const tilt = p.rotate ?? (i % 2 === 0 ? -2 : 2);

          return (
            <motion.button
              type="button"
              key={p.id}
              onClick={() => {
                setOpenIdx(i);
                sfx.flip();
                onComplete?.();
              }}
              initial={reduce ? false : { opacity: 0, y: 30, rotate: tilt * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: tilt }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.05, rotate: tilt * -0.5, zIndex: 10 }}
              className="group relative block cursor-pointer text-left focus:outline-none"
              aria-label={`open photo: ${p.caption}`}
            >
              <div className="polaroid relative p-2.5 pb-8 sm:p-3 sm:pb-11 shadow-scrap transition hover:shadow-scrap-lg">
                <span
                  className="tape absolute -top-3 left-1/2 z-10 h-6 sm:h-7 w-16 sm:w-20 -translate-x-1/2 -rotate-2 rounded-[2px]"
                  aria-hidden="true"
                />
                <div className="relative aspect-square w-full overflow-hidden rounded-[3px] bg-blue-soft">
                  <img
                    src={p.src}
                    alt={p.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.nextElementSibling) {
                        e.currentTarget.nextElementSibling.style.display = "grid";
                      }
                    }}
                  />
                  <div className="hidden absolute inset-0 place-items-center bg-blue-soft p-2 text-center font-cute text-xs text-blue-deep">
                    <ImageOff size={20} className="mb-1 opacity-60" />
                    photo slot
                  </div>
                  <span
                    className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100"
                    style={{ backgroundColor: "rgba(74,90,106,.28)" }}
                  >
                    <Expand className="text-white" size={22} />
                  </span>
                </div>
                <p className="mt-2.5 sm:mt-3 font-hand text-base sm:text-lg leading-tight font-bold text-blue-ink">{p.caption}</p>
                {p.date && <p className="font-cute text-[11px] sm:text-xs text-blue-deep/70">{p.date}</p>}
                <Deco className="sticker absolute" {...deco.props} style={deco.style} />
              </div>
            </motion.button>
          );
        })}
      </div>

      <div ref={bottomRef} className="mt-8 flex items-center justify-center gap-3 text-blue-deep/70" aria-hidden="true">
        <Sparkle size={16} className="anim-twinkle text-pink-deep" />
        <span className="font-cute text-sm">
          four memories configurable in <code className="rounded bg-white px-1.5 py-0.5">birthday.config.js</code>
        </span>
      </div>

      <Lightbox
        open={openIdx !== null}
        onClose={() => setOpenIdx(null)}
        src={active?.src}
        title={active?.caption}
        caption={active?.caption}
        note={active?.note}
        date={active?.date}
        alt={active?.caption}
        hasPrev={openIdx !== null && openIdx > 0}
        hasNext={openIdx !== null && openIdx < photos.length - 1}
        onPrev={() => setOpenIdx((idx) => (idx > 0 ? idx - 1 : idx))}
        onNext={() => setOpenIdx((idx) => (idx < photos.length - 1 ? idx + 1 : idx))}
      />
    </Section>
  );
}
