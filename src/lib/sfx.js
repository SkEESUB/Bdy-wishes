/**
 * sfx.js — tiny Web Audio sound-effect kit.
 * Every sound is synthesised, so no audio files are needed and nothing can 404.
 * AudioContext is created lazily on the first user gesture (browser-safe).
 */

let ctx = null;
let master = null;
let muted = false;

function ensure() {
  if (typeof window === "undefined") return null;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  } catch {
    return null;
  }
}

export function setSfxVolume(v) {
  if (master) master.gain.value = Math.max(0, Math.min(1, v));
}

export function setSfxMuted(m) {
  muted = m;
  if (master) master.gain.value = m ? 0 : 0.5;
}

function tone({ freq = 440, dur = 0.25, type = "sine", gain = 0.3, delay = 0, slide = 0 }) {
  const c = ensure();
  if (!c || muted) return;
  try {
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  } catch {
    /* audio is a nice-to-have */
  }
}

function noise({ dur = 0.4, gain = 0.18, delay = 0, filterFreq = 900 }) {
  const c = ensure();
  if (!c || muted) return;
  try {
    const t0 = c.currentTime + delay;
    const frames = Math.floor(c.sampleRate * dur);
    const buffer = c.createBuffer(1, frames, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
    }
    const src = c.createBufferSource();
    src.buffer = buffer;
    const bp = c.createBiquadFilter();
    bp.type = "lowpass";
    bp.frequency.value = filterFreq;
    const g = c.createGain();
    g.gain.value = gain;
    src.connect(bp).connect(g).connect(master);
    src.start(t0);
  } catch {
    /* ignore */
  }
}

export const sfx = {
  unlockKeys: () => [0, 4, 7, 12, 16].forEach((s, i) => tone({ freq: 523.25 * Math.pow(2, s / 12), dur: 0.5, gain: 0.22, delay: i * 0.09 })),
  wrong: () => {
    tone({ freq: 220, dur: 0.18, type: "square", gain: 0.14 });
    tone({ freq: 165, dur: 0.26, type: "square", gain: 0.12, delay: 0.14 });
  },
  key: () => tone({ freq: 880, dur: 0.07, type: "triangle", gain: 0.16 }),
  puff: () => noise({ dur: 0.5, gain: 0.3, filterFreq: 620 }),
  candleOut: () => {
    noise({ dur: 0.35, gain: 0.22, filterFreq: 500 });
    tone({ freq: 320, dur: 0.18, type: "sine", gain: 0.1, slide: -180 });
  },
  pop: () => tone({ freq: 620, dur: 0.14, type: "triangle", gain: 0.24, slide: 260 }),
  cut: () => {
    noise({ dur: 0.22, gain: 0.14, filterFreq: 2400 });
    tone({ freq: 440, dur: 0.12, type: "sine", gain: 0.12 });
  },
  chime: () => [784, 988, 1175].forEach((f, i) => tone({ freq: f, dur: 0.7, gain: 0.16, delay: i * 0.08 })),
  party: () => {
    tone({ freq: 300, dur: 0.5, type: "sawtooth", gain: 0.12, slide: 500 });
    tone({ freq: 900, dur: 0.35, type: "square", gain: 0.08, delay: 0.12 });
  },
  sparkle: () => [1568, 1976, 2637].forEach((f, i) => tone({ freq: f, dur: 0.3, gain: 0.09, delay: i * 0.05 })),
  flip: () => noise({ dur: 0.14, gain: 0.1, filterFreq: 3200 }),
  open: () => [523, 659, 784, 1047].forEach((f, i) => tone({ freq: f, dur: 0.6, gain: 0.14, delay: i * 0.07 })),
};

export default sfx;
