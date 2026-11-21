/**
 * melody.js — a synthesised music-box rendition of "Happy Birthday".
 *
 * Used by the vinyl player when no local music file is configured, so the
 * music section always works (and never needs to download a single byte).
 */

const FREQ = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0,
  Bb4: 466.16, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46,
  G5: 783.99, A5: 880.0, C3: 130.81, F3: 174.61, G3: 196.0, A3: 220.0,
};

const BEAT = 0.42;

/** [beat, note, beats-long, velocity] */
const MELODY = [
  [0, "C4", 0.75, 1], [0.75, "C4", 0.25, 0.8], [1, "D4", 1, 1], [2, "C4", 1, 1],
  [3, "F4", 1, 1], [4, "E4", 2, 0.9],
  [6.2, "C4", 0.75, 1], [6.95, "C4", 0.25, 0.8], [7.2, "D4", 1, 1], [8.2, "C4", 1, 1],
  [9.2, "G4", 1, 1], [10.2, "F4", 2, 0.9],
  [12.4, "C4", 0.75, 1], [13.15, "C4", 0.25, 0.8], [13.4, "C5", 1, 1], [14.4, "A4", 1, 1],
  [15.4, "F4", 1, 1], [16.4, "E4", 1, 1], [17.4, "D4", 2, 0.9],
  [19.6, "Bb4", 0.75, 1], [20.35, "Bb4", 0.25, 0.8], [20.6, "A4", 1, 1], [21.6, "F4", 1, 1],
  [22.6, "G4", 1, 1], [23.6, "F4", 2.5, 0.95],
];

/** gentle arpeggio + bass line, one per bar-ish */
const ACCOMP = [
  [0, "C3"], [3, "F3"], [4, "C3"], [6.2, "C3"], [9.2, "G3"], [10.2, "C3"],
  [12.4, "C3"], [15.4, "F3"], [17.4, "G3"], [19.6, "F3"], [22.6, "Bb4"], [23.6, "F3"],
];

const ARPS = [
  [1, "E4"], [2.2, "G4"], [5, "C4"], [7.6, "E4"], [11, "G4"], [14, "C5"],
  [16, "G4"], [18.4, "C4"], [21.2, "F4"], [24.4, "A4"],
];

export const MELODY_DURATION = 28.5; // one full pass, in seconds

function pluck(ac, dest, freq, t0, dur, vel, sink) {
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.24 * vel, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + Math.max(0.25, dur * BEAT * 1.6));
  g.connect(dest);

  const stopAt = t0 + dur * BEAT * 1.8 + 0.2;

  const o1 = ac.createOscillator();
  o1.type = "sine";
  o1.frequency.value = freq;
  o1.connect(g);
  o1.start(t0);
  o1.stop(stopAt);

  const o2 = ac.createOscillator();
  o2.type = "triangle";
  o2.frequency.value = freq * 2;
  const g2 = ac.createGain();
  g2.gain.value = 0.18;
  o2.connect(g2).connect(g);
  o2.start(t0);
  o2.stop(stopAt);

  if (sink) sink.push(o1, o2);
  return [o1, o2];
}

/**
 * Creates a looping, seekable music-box player.
 * Returns { duration, play, pause, stop, seek, getPosition, setVolume, isPlaying }
 */
export function createMelodyPlayer() {
  let ac = null;
  let master = null;
  let sources = [];
  let playing = false;
  let startedAt = 0;
  let offset = 0;
  let timer = null;
  let volume = 0.6;
  let listeners = [];

  const ensure = () => {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      if (!ac) {
        ac = new AC();
        master = ac.createGain();
        master.gain.value = volume;
        const comp = ac.createDynamicsCompressor();
        master.connect(comp).connect(ac.destination);
      }
      if (ac.state === "suspended") ac.resume().catch(() => {});
      return true;
    } catch {
      return false;
    }
  };

  const stopSources = () => {
    sources.forEach((s) => {
      try {
        s.stop();
      } catch {
        /* already stopped */
      }
    });
    sources = [];
  };

  const scheduleFrom = (pos) => {
    if (!ensure()) return;
    const now = ac.currentTime + 0.08;
    startedAt = now;
    offset = pos;
    const events = [];
    MELODY.forEach(([b, n, d, v]) => {
      const t = b * BEAT;
      if (t >= pos - 0.05) events.push({ t, f: FREQ[n], d, v });
    });
    ACCOMP.forEach(([b, n]) => {
      const t = b * BEAT;
      if (t >= pos - 0.05) events.push({ t, f: FREQ[n], d: 1.6, v: 0.5 });
    });
    ARPS.forEach(([b, n]) => {
      const t = b * BEAT;
      if (t >= pos - 0.05) events.push({ t, f: FREQ[n], d: 0.8, v: 0.45 });
    });
    events.forEach((e) => {
      const t0 = now + (e.t - pos);
      pluck(ac, master, e.f, t0, e.d, e.v, sources);
    });
  };

  const emit = () => listeners.forEach((l) => l());

  const tick = () => {
    if (!playing || !ac) return;
    const pos = (ac.currentTime - startedAt) + offset;
    if (pos >= MELODY_DURATION) {
      stopSources();
      scheduleFrom(0);
      emit();
      return;
    }
    emit();
  };

  return {
    duration: MELODY_DURATION,
    subscribe(fn) {
      listeners.push(fn);
      return () => {
        listeners = listeners.filter((l) => l !== fn);
      };
    },
    isPlaying: () => playing,
    getPosition: () => {
      if (!playing || !ac) return offset;
      return Math.min(MELODY_DURATION, (ac.currentTime - startedAt) + offset);
    },
    setVolume(v) {
      volume = Math.max(0, Math.min(1, v));
      if (master) master.gain.value = volume;
    },
    play(from) {
      if (!ensure()) return false;
      if (playing) return true;
      stopSources();
      playing = true;
      scheduleFrom(typeof from === "number" ? from : offset);
      timer = setInterval(tick, 250);
      emit();
      return true;
    },
    pause() {
      if (!playing) return;
      const pos = this.getPosition();
      playing = false;
      clearInterval(timer);
      timer = null;
      stopSources();
      offset = pos;
      if (ac && ac.state === "running") ac.suspend().catch(() => {});
      emit();
    },
    seek(pos) {
      const wasPlaying = playing;
      if (playing) {
        this.pause();
      }
      offset = Math.max(0, Math.min(MELODY_DURATION, pos));
      if (ac && ac.state === "suspended") ac.resume().catch(() => {});
      if (wasPlaying) this.play(offset);
      emit();
    },
    stop() {
      playing = false;
      clearInterval(timer);
      timer = null;
      stopSources();
      offset = 0;
      emit();
    },
  };
}

export default createMelodyPlayer;
