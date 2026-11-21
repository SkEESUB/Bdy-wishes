import { motion } from "framer-motion";
import { ArrowDown, Lock, Sparkles } from "lucide-react";

/**
 * Locked chapter preview card — subtle, charming scrapbook teaser
 * showing recipient what little ceremony will unlock it.
 */
export function LockedChapterCard({ number, label, hint, palette = "#6FA8D6" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto my-12 max-w-md px-4 text-center"
    >
      <div className="paper paper-dashed relative overflow-hidden p-6 sm:p-8 shadow-sm">
        <span
          className="sticker mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border-2 border-white font-ui text-xs font-bold text-blue-ink shadow-xs"
          style={{ backgroundColor: palette }}
        >
          {String(number).padStart(2, "0")}
        </span>

        <div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full bg-blue-soft text-blue-deep/70 anim-float">
          <Lock size={20} />
        </div>

        <h3 className="font-hand text-2xl font-bold text-blue-ink sm:text-3xl">
          Chapter {number}: {label}
        </h3>

        <p className="mt-2 font-cute text-base text-blue-deep/80">
          {hint || "Complete the chapter above to reveal this surprise 🤍"}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-blue-deep/20 bg-white/70 px-3 py-1 font-cute text-xs text-blue-ink/70">
          ✨ locked secret
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Animated downward scroll invitation when the next chapter is unlocked.
 */
export function ScrollInvitation({ targetId, targetLabel, chapterNumber, onScrollClick }) {
  const handleScroll = () => {
    if (onScrollClick) {
      onScrollClick();
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="my-10 flex flex-col items-center justify-center gap-2 text-center"
    >
      <span className="sticker inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-white/95 px-4 py-1.5 font-cute text-sm font-bold text-pink-deep shadow-sm">
        <Sparkles size={15} /> Chapter {chapterNumber} Unlocked!
      </span>

      <button
        type="button"
        onClick={handleScroll}
        className="group inline-flex items-center gap-2.5 rounded-full border-[3px] border-white bg-blue-deep px-6 py-3 font-cute text-base font-bold text-white shadow-scrap transition hover:scale-105 hover:bg-blue-ink active:scale-95"
      >
        Scroll down to {targetLabel}
        <ArrowDown size={16} className="transition group-hover:translate-y-1" />
      </button>
    </motion.div>
  );
}
