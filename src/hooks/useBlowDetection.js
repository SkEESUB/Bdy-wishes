import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Microphone blow detection.
 * Averages the low-frequency bins of an AnalyserNode; when the level stays
 * above `threshold` for ~250ms it fires `onBlow` (with a cooldown so one long
 * blow extinguishes several candles at a steady pace).
 */
export function useBlowDetection({ onBlow, threshold = 0.22, enabled = true } = {}) {
  const [status, setStatus] = useState("idle"); // idle | requesting | listening | denied | unsupported
  const [level, setLevel] = useState(0);
  const [error, setError] = useState(null);
  const streamRef = useRef(null);
  const ctxRef = useRef(null);
  const rafRef = useRef(null);
  const aboveSince = useRef(0);
  const lastBlow = useRef(0);
  const lastSet = useRef(0);
  const lastLevel = useRef(0);
  const cbRef = useRef(onBlow);
  cbRef.current = onBlow;

  const cleanup = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (ctxRef.current) {
      try {
        ctxRef.current.close();
      } catch {
        /* ignore */
      }
      ctxRef.current = null;
    }
    setLevel(0);
    setStatus((s) => (s === "listening" || s === "requesting" ? "idle" : s));
  }, []);

  const stop = useCallback(() => cleanup(), [cleanup]);

  const start = useCallback(async () => {
    if (!enabled) return false;
    if (!navigator?.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      setError("This browser can't use the microphone.");
      return false;
    }
    if (streamRef.current) return true;
    setStatus("requesting");
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) throw new Error("Web Audio unavailable");
      const ctx = new AC();
      ctxRef.current = ctx;
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.75;
      src.connect(analyser);
      streamRef.current = stream;
      const data = new Uint8Array(analyser.frequencyBinCount);
      setStatus("listening");

      const loop = () => {
        analyser.getByteFrequencyData(data);
        // low bins ≈ breath + low rumble (avoid pure high-frequency noise)
        let sum = 0;
        const n = 24;
        for (let i = 0; i < n; i += 1) sum += data[i];
        const lvl = Math.min(1, sum / n / 190);
        // throttle state updates so the UI doesn't re-render at 60fps
        if (now2() - lastSet.current > 90 || Math.abs(lvl - lastLevel.current) > 0.06) {
          lastSet.current = now2();
          lastLevel.current = lvl;
          setLevel(lvl);
        }
        const now = performance.now();
        if (lvl > threshold) {
          if (!aboveSince.current) aboveSince.current = now;
          if (now - aboveSince.current > 240 && now - lastBlow.current > 700) {
            lastBlow.current = now;
            aboveSince.current = 0;
            cbRef.current?.(lvl);
          }
        } else {
          aboveSince.current = 0;
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
      return true;
    } catch (e) {
      const denied = e?.name === "NotAllowedError" || e?.name === "SecurityError";
      setStatus(denied ? "denied" : "error");
      setError(denied ? "Microphone permission was declined." : e?.message || "Microphone error.");
      cleanup();
      return false;
    }
  }, [cleanup, enabled, threshold]);

  useEffect(() => () => cleanup(), [cleanup]);

  return { status, level, error, start, stop, listening: status === "listening" };
}

export default useBlowDetection;
