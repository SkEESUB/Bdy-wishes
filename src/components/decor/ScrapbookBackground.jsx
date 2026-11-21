import { useMemo } from "react";
import { Balloon, Cloud, Flower, Heart, Sparkle, Star, Butterfly } from "./Stickers.jsx";

/** Deterministic pseudo-random so positions are stable between renders. */
function rand(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Fixed gingham background + a handful of slowly drifting cute decorations.
 * All layers are `pointer-events-none` and sit behind the content.
 */
export default function ScrapbookBackground({ variant = "blue", floaters = 16 }) {
  const cls =
    variant === "pink" ? "gingham-pink" : variant === "lavender" ? "gingham-lav" : "gingham";

  const items = useMemo(
    () =>
      Array.from({ length: floaters }, (_, i) => {
        const r1 = rand(i + 1);
        const r2 = rand(i + 31);
        const r3 = rand(i + 77);
        const r4 = rand(i + 113);
        const kind = ["heart", "flower", "balloon", "sparkle", "star", "butterfly", "cloud"][
          Math.floor(r4 * 7)
        ];
        return {
          kind,
          left: r1 * 96,
          top: 12 + r2 * 88,
          size: kind === "balloon" ? 26 + r3 * 26 : 16 + r3 * 22,
          delay: r3 * 6,
          duration: 6 + r2 * 7,
          dx: (r1 - 0.5) * 60,
          rot: (r3 - 0.5) * 90,
          color: ["#F9C8D9", "#BBDFF5", "#DCD4F2", "#FFE9B8", "#C9EBDD", "#ffffff"][Math.floor(r2 * 6)],
        };
      }),
    [floaters]
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className={`absolute inset-0 ${cls}`} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,.55), rgba(255,255,255,0) 60%), radial-gradient(90% 70% at 50% 100%, rgba(220,212,242,.45), rgba(255,255,255,0) 60%)",
        }}
      />
      {items.map((it, i) => {
        const style = {
          left: `${it.left}%`,
          top: `${it.top}%`,
          animationDelay: `${it.delay}s`,
          animationDuration: `${it.duration}s`,
          ["--dx"]: `${it.dx}px`,
          ["--rot"]: `${it.rot}deg`,
          opacity: 0.55,
        };
        const wrap = (
          <div key={i} className="anim-float absolute" style={style}>
            {it.kind === "heart" && <Heart size={it.size} color={it.color} />}
            {it.kind === "flower" && <Flower size={it.size} petal={it.color} center="#FFF7EC" />}
            {it.kind === "balloon" && <Balloon size={it.size} color={it.color} />}
            {it.kind === "sparkle" && <Sparkle size={it.size * 0.8} color="#ffffff" />}
            {it.kind === "star" && <Star size={it.size * 0.8} color={it.color} />}
            {it.kind === "butterfly" && <Butterfly size={it.size} color={it.color} />}
            {it.kind === "cloud" && <Cloud size={it.size * 2.4} color="#ffffff" />}
          </div>
        );
        return wrap;
      })}
    </div>
  );
}
