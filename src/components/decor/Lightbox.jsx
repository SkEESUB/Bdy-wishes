import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import Modal from "./Modal.jsx";

/**
 * Enhanced scrapbook Lightbox:
 * Full photo modal with preserved aspect ratio, previous/next photo navigation,
 * date tags, captions, and individual memory notes.
 */
export default function Lightbox({
  open,
  onClose,
  src,
  title,
  caption,
  note,
  date,
  alt = "",
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && hasPrev) onPrev?.();
      if (e.key === "ArrowRight" && hasNext) onNext?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, hasPrev, hasNext, onPrev, onNext]);

  return (
    <Modal open={open} onClose={onClose} label={title || "photo memory"} maxWidth="max-w-2xl">
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={src || title}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="polaroid mx-auto max-w-lg rotate-[-0.5deg]"
          >
            {src ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] bg-blue-soft">
                <img
                  src={src}
                  alt={alt || caption || title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = "grid";
                    }
                  }}
                />
                <div
                  className="hidden absolute inset-0 place-items-center bg-blue-soft font-cute text-blue-deep"
                  aria-hidden="true"
                >
                  <ImageOff size={32} className="opacity-60" />
                  <p className="mt-2 text-sm">memory photograph slot</p>
                </div>
              </div>
            ) : (
              <div className="grid h-56 place-items-center rounded-2xl bg-blue-soft font-cute text-blue-deep">
                no image yet — add one in the config
              </div>
            )}

            <div className="mt-4 px-1">
              {date && (
                <span className="font-cute text-xs uppercase tracking-wider text-pink-deep">
                  {date}
                </span>
              )}
              <h4 className="font-hand text-3xl leading-tight font-bold text-blue-ink">
                {caption || title}
              </h4>
              {note && <p className="mt-2 font-body text-base text-blue-ink/85">{note}</p>}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous / Next buttons */}
        {hasPrev && (
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous photograph"
            className="absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-5 z-20 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border-2 border-white bg-white/95 text-blue-ink shadow-scrap transition hover:scale-110 hover:bg-pink-soft"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        {hasNext && (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next photograph"
            className="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-5 z-20 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border-2 border-white bg-white/95 text-blue-ink shadow-scrap transition hover:scale-110 hover:bg-pink-soft"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </Modal>
  );
}
