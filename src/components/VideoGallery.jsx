import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Pause, Film, AlertTriangle, X } from "lucide-react";
import Section from "./decor/Section.jsx";
import Modal from "./decor/Modal.jsx";
import { birthday as cfg } from "../config/birthday.config.js";
import { sfx } from "../lib/sfx.js";
import { Bow, Flower, Heart, Sparkle } from "./decor/Stickers.jsx";

/**
 * SECTION — Video gallery: Exactly TWO personal video memories.
 * Beautiful thumbnails, play buttons, individual captions, matching modal
 * with play/pause/close controls, no autoplay, loads only when required.
 */
export default function VideoGallery({ onComplete }) {
  const [active, setActive] = useState(null);
  const [fallback, setFallback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();

  // Exactly two videos
  const videos = cfg.videos.slice(0, 2);

  const open = (video, index) => {
    setFallback(false);
    setIsPlaying(false);
    setActive({ ...video, index });
    sfx.pop();
    onComplete?.();
  };

  // When modal opens via user click, begin playback smoothly
  useEffect(() => {
    if (active && videoRef.current) {
      const p = videoRef.current.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Playback awaiting manual interaction:", err);
            setIsPlaying(false);
          });
      }
    }
  }, [active]);

  const close = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
    setIsPlaying(false);
    setActive(null);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      const p = videoRef.current.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Video play error:", err);
            setIsPlaying(false);
          });
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Section id="videos" number={8} title="Little Films" kicker="press play, no autoplay, promise" palette="#E48BB0">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {videos.map((v, i) => (
          <motion.button
            type="button"
            key={v.id}
            onClick={() => open(v, i)}
            initial={reduce ? false : { opacity: 0, y: 34, rotate: i % 2 ? 1.5 : -1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1 : -1 }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ scale: 1.03, rotate: 0, zIndex: 4 }}
            transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
            className="group relative text-left focus:outline-none"
            aria-label={`play video: ${v.title}`}
          >
            <div className="paper relative overflow-hidden p-3 shadow-scrap">
              <span className="tape absolute -top-2 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-2 rounded-[2px]" aria-hidden="true" />
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-soft to-pink-soft">
                {v.poster ? (
                  <img src={v.poster} alt={v.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                  <div className="grid h-full place-items-center font-cute text-blue-deep">video thumbnail</div>
                )}
                <span className="absolute inset-0 grid place-items-center" style={{ backgroundColor: "rgba(74,90,106,.22)" }}>
                  <span className="grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-white/85 text-pink-deep transition group-hover:scale-110 shadow-scrap">
                    <Play size={22} className="ml-0.5" />
                  </span>
                </span>
                <span className="absolute bottom-2 right-2 rounded-full bg-white/85 px-2.5 py-0.5 font-ui text-[10px] tracking-wide text-blue-ink shadow-sm">
                  film {i + 1}
                </span>
              </div>
              <div className="mt-3 flex items-start justify-between gap-2 px-1">
                <div className="min-w-0">
                  <h4 className="truncate font-hand text-xl font-bold text-blue-ink">{v.title}</h4>
                  <p className="truncate font-body text-sm text-blue-ink/70">{v.caption}</p>
                </div>
                <Film size={18} className="mt-1 shrink-0 text-blue-deep/70" />
              </div>
              <Bow className="absolute -bottom-3 right-4 rotate-6" size={26} color="#F9C8D9" />
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-blue-deep/70">
        <Sparkle className="anim-twinkle" size={14} color="#D9A94B" />
        <p className="font-cute text-sm">
          exactly two video memories — configurable in <code className="rounded bg-white px-1.5 py-0.5">birthday.config.js</code>
        </p>
        <Heart size={14} color="#E48BB0" />
      </div>

      <Modal open={!!active} onClose={close} label={active?.title || "video"} maxWidth="max-w-3xl">
        {active && (
          <div>
            <div className="relative overflow-hidden rounded-2xl border-2 border-white bg-blue-ink/95 shadow-scrap-lg flex items-center justify-center">
              <video
                ref={videoRef}
                key={`${active.id}-${fallback ? "remote" : "local"}`}
                className="max-h-[65vh] w-full object-contain aspect-video"
                controls
                playsInline
                preload="metadata"
                autoPlay={false}
                poster={active.poster}
                src={fallback ? active.remoteSrc : active.src}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => setFallback(true)}
              >
                <track kind="captions" />
              </video>
            </div>

            <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="font-hand text-2xl font-bold text-blue-ink">{active.title}</h3>
                <p className="font-body text-blue-ink/80">{active.caption}</p>
              </div>

              {/* Direct Play/Pause & Close buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-white bg-blue-deep px-4 py-1.5 font-cute text-xs font-bold text-white shadow-sm transition hover:scale-105"
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex items-center gap-1 rounded-full border-2 border-blue-deep/30 bg-white px-3 py-1.5 font-cute text-xs text-blue-ink transition hover:bg-pink-soft"
                >
                  <X size={13} /> Close
                </button>
              </div>
            </div>

            {fallback && (
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-pink-soft px-3 py-2 font-body text-sm text-pink-deep">
                <AlertTriangle size={15} />
                demo clip playing — drop your video at {active.src} to see your local video.
              </p>
            )}

            <div className="mt-3 flex items-center justify-center gap-2" aria-hidden="true">
              <Flower size={16} petal="#F9C8D9" center="#FFE9B8" />
              <Heart size={14} color="#6FA8D6" />
              <Flower size={16} petal="#DCD4F2" center="#FFF7EC" />
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}
