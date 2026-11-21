import { useCallback } from "react";
import confetti from "canvas-confetti";

const PALETTE = ["#F9C8D9", "#BBDFF5", "#DCD4F2", "#FFE9B8", "#C9EBDD", "#FFF7EC", "#E48BB0", "#6FA8D6"];

function reduced() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
}

/** Confetti presets — all colours stay inside the pastel scrapbook palette. */
export function useConfetti() {
  const burst = useCallback((origin = { x: 0.5, y: 0.6 }, opts = {}) => {
    if (reduced()) return;
    confetti({
      particleCount: opts.count ?? 90,
      spread: opts.spread ?? 78,
      startVelocity: opts.velocity ?? 42,
      scalar: opts.scalar ?? 1,
      ticks: opts.ticks ?? 220,
      origin,
      colors: PALETTE,
      disableForReducedMotion: true,
    });
  }, []);

  const rain = useCallback((duration = 2600) => {
    if (reduced()) return;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 4,
        startVelocity: 26,
        spread: 360,
        ticks: 260,
        gravity: 0.7,
        scalar: 0.9,
        origin: { x: Math.random(), y: -0.1 },
        colors: PALETTE,
        disableForReducedMotion: true,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const bigBang = useCallback(() => {
    if (reduced()) return;
    const shots = [
      { o: { x: 0.15, y: 0.75 }, a: 60 },
      { o: { x: 0.85, y: 0.75 }, a: 120 },
      { o: { x: 0.5, y: 0.35 }, a: 360 },
    ];
    shots.forEach((s, i) =>
      setTimeout(
        () =>
          confetti({
            particleCount: 130,
            angle: s.a,
            spread: 100,
            startVelocity: 52,
            ticks: 260,
            origin: s.o,
            colors: PALETTE,
            disableForReducedMotion: true,
          }),
        i * 160
      )
    );
    setTimeout(
      () =>
        confetti({
          particleCount: 60,
          spread: 140,
          startVelocity: 34,
          scalar: 1.6,
          shapes: ["circle"],
          origin: { x: 0.5, y: 0.5 },
          colors: PALETTE,
          disableForReducedMotion: true,
        }),
      520
    );
  }, []);

  const pop = useCallback((x = 0.5, y = 0.5) => {
    if (reduced()) return;
    confetti({
      particleCount: 34,
      spread: 60,
      startVelocity: 30,
      scalar: 0.85,
      origin: { x, y },
      colors: PALETTE,
      disableForReducedMotion: true,
    });
  }, []);

  return { burst, rain, bigBang, pop };
}

export default useConfetti;
