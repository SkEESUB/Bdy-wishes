import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Exact countdown to the configured birthday target in Indian Standard Time (IST).
 * Exact target: 2026-11-24T00:00:00+05:30 (Asia/Kolkata).
 * Updates every second, stops at zero, and never shows negative numbers.
 */
export function useCountdown(dateConfig) {
  const target = useMemo(() => {
    // If exact ISO string is passed
    if (typeof dateConfig === "string") {
      return new Date(dateConfig);
    }
    if (dateConfig?.targetDate) {
      return new Date(dateConfig.targetDate);
    }
    if (dateConfig?.iso) {
      return new Date(dateConfig.iso);
    }
    // Default exact IST target: 24 November 2026, 00:00:00 IST (+05:30)
    return new Date("2026-11-24T00:00:00+05:30");
  }, [dateConfig]);

  const compute = useCallback(() => {
    const now = Date.now();
    const targetMs = target.getTime();
    const diff = targetMs - now;
    const isBirthday = diff <= 0 && diff > -24 * 60 * 60 * 1000;
    const done = diff <= 0;
    const clamped = Math.max(0, diff);
    const totalSeconds = Math.floor(clamped / 1000);

    return {
      diff,
      isBirthday,
      done,
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
      target,
    };
  }, [target]);

  const [state, setState] = useState(compute);

  useEffect(() => {
    setState(compute());
    const id = setInterval(() => setState(compute()), 1000);
    return () => clearInterval(id);
  }, [compute]);

  const targetLabel = useMemo(() => {
    try {
      return target.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Tuesday, 24 November 2026";
    }
  }, [target]);

  return { ...state, targetLabel };
}

export default useCountdown;
