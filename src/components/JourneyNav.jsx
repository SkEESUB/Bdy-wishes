import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Lock } from "lucide-react";

export const SECTIONS = [
  { id: "candles", number: 1, label: "Candles" },
  { id: "celebration", number: 2, label: "Celebration" },
  { id: "collage", number: 3, label: "Polaroids" },
  { id: "surprises", number: 4, label: "Surprises" },
  { id: "letter", number: 5, label: "Letter" },
  { id: "gift", number: 6, label: "Gift" },
  { id: "music", number: 7, label: "Music" },
  { id: "videos", number: 8, label: "Films" },
  { id: "map", number: 9, label: "Map" },
];

/**
 * Sticky progress bar + right-hand journey rail for the continuous sequential scrapbook.
 * Reflects unlock state: only unlocked sections can be navigated to.
 */
export default function JourneyNav({ unlockedSections = ["candles"] }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(SECTIONS[0].id);

  const unlockedSet = new Set(unlockedSections);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      if (unlockedSet.has(s.id)) {
        const el = document.getElementById(s.id);
        if (el) observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, [unlockedSections]);

  const scrollTo = (id) => {
    if (!unlockedSet.has(id)) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 h-1.5 bg-white/50 backdrop-blur-xs">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-deep via-lav-deep to-blue-deep"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />
      </div>

      <nav
        aria-label="Journey chapters"
        className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl border-2 border-white/80 bg-white/80 p-2 shadow-scrap backdrop-blur-sm md:flex"
      >
        {SECTIONS.map((s) => {
          const isUnlocked = unlockedSet.has(s.id);
          const isActive = active === s.id;

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              disabled={!isUnlocked}
              aria-label={isUnlocked ? `go to ${s.label}` : `chapter ${s.number} locked`}
              aria-current={isActive ? "true" : undefined}
              className={`group relative grid h-8 w-8 place-items-center rounded-full text-[10px] font-bold transition ${
                !isUnlocked ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
            >
              <span
                className={`absolute inset-0 rounded-full transition ${
                  isActive
                    ? "bg-pink-deep text-white shadow-sm"
                    : isUnlocked
                    ? "bg-blue-soft text-blue-deep group-hover:bg-pink-pastel"
                    : "bg-gray-100 text-gray-400"
                }`}
              />
              <span className={`relative font-ui ${isActive ? "text-white" : isUnlocked ? "text-blue-deep" : "text-gray-400"}`}>
                {isUnlocked ? s.number : <Lock size={11} />}
              </span>
              <span className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-full bg-blue-ink px-2.5 py-0.5 font-cute text-xs text-white opacity-0 transition group-hover:opacity-100 shadow-sm">
                {isUnlocked ? `${s.number}. ${s.label}` : `Locked · Complete earlier chapters`}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="back to top"
          className="mt-1 grid h-8 w-8 place-items-center rounded-full bg-white text-blue-deep transition hover:bg-pink-pastel shadow-xs"
        >
          <ArrowUp size={14} />
        </button>
      </nav>
    </>
  );
}
