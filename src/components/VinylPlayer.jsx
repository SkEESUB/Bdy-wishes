import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX, Music4, AlertCircle, Disc } from "lucide-react";
import Section from "./decor/Section.jsx";
import { birthday as cfg } from "../config/birthday.config.js";
import { createMelodyPlayer, MELODY_DURATION } from "../lib/melody.js";
import { sfx } from "../lib/sfx.js";
import { Flower, Heart, Sparkle, Note } from "./decor/Stickers.jsx";

const fmt = (s) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
};

/**
 * SECTION 07 — Vinyl record player with four personal songs.
 * Supports switching between four songs, local MP3 playback, and Web Audio
 * music box synthesis fallback. Never autoplays.
 */
export default function VinylPlayer({ onComplete }) {
  const songs = cfg.music?.songs || [
    {
      id: "song-1",
      title: "Happy Birthday Music Box",
      artist: "Handmade Music Box Melody",
      src: "/assets/music/sample-song-01.mp3",
      durationLabel: "looping melody",
    },
    {
      id: "song-2",
      title: "Soft Acoustic Serenade",
      artist: "Birthday Acoustic Box",
      src: "/assets/music/sample-song-02.mp3",
      durationLabel: "gentle loop",
    },
    {
      id: "song-3",
      title: "Sweet Yellow Memories",
      artist: "Acoustic Melody For You",
      src: "/assets/music/sample-song-03.mp3",
      durationLabel: "sweet melody",
    },
    {
      id: "song-4",
      title: "Our Special Tune",
      artist: "Heartfelt Keepsake",
      src: "/assets/music/sample-song-04.mp3",
      durationLabel: "keepsake",
    },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const currentSong = songs[currentIdx] || songs[0];

  const audioRef = useRef(null);
  const melodyRef = useRef(null);
  const [mode, setMode] = useState(currentSong.src ? "file" : "melody");
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(null);
  const reduce = useReducedMotion();
  const [notes, setNotes] = useState([]);

  // Progress ticker for melody synthesizer fallback
  useEffect(() => {
    if (!playing || mode !== "melody") return undefined;
    const id = setInterval(() => {
      if (melodyRef.current) {
        setPos(melodyRef.current.getPosition());
      }
    }, 250);
    return () => clearInterval(id);
  }, [playing, mode]);

  // Clean stop and release on unmount
  useEffect(() => {
    return () => {
      melodyRef.current?.stop();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeAttribute("src");
        audioRef.current.load();
      }
    };
  }, []);

  const stopCurrent = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    melodyRef.current?.stop();
    setPlaying(false);
  }, []);

  const selectTrack = (idx) => {
    if (idx === currentIdx) return;
    const wasPlaying = playing;
    stopCurrent();

    setCurrentIdx(idx);
    setPos(0);
    setDuration(0);
    setError(null);

    const nextSong = songs[idx];
    setMode(nextSong.src ? "file" : "melody");
    sfx.key();

    // If song was actively playing, cleanly start the new song
    if (wasPlaying && nextSong.src && audioRef.current) {
      audioRef.current.src = nextSong.src;
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setPlaying(true))
          .catch((err) => {
            console.warn("Audio play rejected:", err);
            setError("Playback failed — click play to start.");
            setPlaying(false);
          });
      }
    }
  };

  const toggle = () => {
    onComplete?.();
    if (playing) {
      if (mode === "file" && audioRef.current) {
        audioRef.current.pause();
      } else {
        melodyRef.current?.pause();
      }
      setPlaying(false);
      return;
    }

    sfx.pop();
    if (mode === "file" && audioRef.current) {
      // Ensure source is current
      if (!audioRef.current.src || !audioRef.current.src.includes(currentSong.src)) {
        audioRef.current.src = currentSong.src;
        audioRef.current.load();
      }
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlaying(true);
            setError(null);
          })
          .catch((err) => {
            console.warn("Local song file playback issue:", err);
            setError("Local song not ready — playing music box melody.");
            setMode("melody");
            if (!melodyRef.current) melodyRef.current = createMelodyPlayer();
            melodyRef.current.play();
            setDuration(MELODY_DURATION);
            setPlaying(true);
          });
      }
      return;
    }

    if (!melodyRef.current) melodyRef.current = createMelodyPlayer();
    melodyRef.current.play();
    setDuration(MELODY_DURATION);
    setPlaying(true);
  };

  const applyVolume = (v) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    melodyRef.current?.setVolume(v);
  };

  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetDuration = duration || (mode === "melody" ? MELODY_DURATION : 0);
    const next = ratio * targetDuration;
    setPos(next);
    if (mode === "file" && audioRef.current) {
      audioRef.current.currentTime = next;
    } else {
      melodyRef.current?.seek(next);
    }
  };

  // floating music notes while playing
  useEffect(() => {
    if (!playing || reduce) return undefined;
    const id = setInterval(() => {
      const nid = Math.random().toString(36).slice(2, 7);
      const note = {
        id: nid,
        x: 35 + Math.random() * 30,
        size: 16 + Math.floor(Math.random() * 12),
        color: ["#E48BB0", "#6FA8D6", "#A48FD0", "#D9A94B"][Math.floor(Math.random() * 4)],
      };
      setNotes((prev) => [...prev.slice(-6), note]);
      setTimeout(() => setNotes((prev) => prev.filter((n) => n.id !== nid)), 3000);
    }, 700);
    return () => clearInterval(id);
  }, [playing, reduce]);

  const effectiveDuration = duration > 0 ? duration : (mode === "melody" ? MELODY_DURATION : 0);
  const pct = effectiveDuration > 0 ? Math.min(100, (pos / effectiveDuration) * 100) : 0;

  return (
    <Section id="music" number={7} title="Our Little Record" kicker="press play whenever you like" palette="#6FA8D6">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-full max-w-lg">
          {/* floating notes */}
          <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
            {notes.map((n) => (
              <motion.span
                key={n.id}
                className="absolute bottom-6"
                style={{ left: `${n.x}%` }}
                initial={{ opacity: 0, y: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 1, 0], y: -110, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, ease: "easeOut" }}
              >
                <Note size={n.size} color={n.color} />
              </motion.span>
            ))}
          </div>

          <div className="paper paper-dashed p-5 sm:p-7 shadow-scrap">
            {/* Track Selector Tabs — All 4 songs */}
            <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {songs.map((song, idx) => {
                const isSelected = idx === currentIdx;
                return (
                  <button
                    key={song.id}
                    type="button"
                    onClick={() => selectTrack(idx)}
                    className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 sm:px-3.5 py-1 sm:py-1.5 font-cute text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? "border-pink-deep bg-pink-deep text-white shadow-xs scale-105"
                        : "border-white bg-white/80 text-blue-deep hover:bg-pink-pastel"
                    }`}
                    aria-label={`Select Track ${idx + 1}: ${song.title}`}
                    aria-pressed={isSelected}
                  >
                    <Disc size={13} className={isSelected && playing ? "animate-spin" : ""} />
                    Track {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-7">
              {/* turntable */}
              <div className="relative aspect-square w-44 shrink-0 sm:w-52">
                <div className="absolute inset-0 rounded-full bg-blue-ink/10 shadow-inner" />
                <motion.div
                  animate={playing && !reduce ? { rotate: 360 } : {}}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 grid place-items-center rounded-full border-4 border-white shadow-scrap-lg"
                  style={{
                    background: "radial-gradient(circle, #2a3340 0%, #1e2530 65%, #151a22 100%)",
                  }}
                >
                  {[0.82, 0.68, 0.54].map((scale, i) => (
                    <div
                      key={i}
                      className="pointer-events-none absolute rounded-full border border-white/10"
                      style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
                    />
                  ))}
                  <div className="relative grid h-16 w-16 place-items-center rounded-full border-2 border-white bg-pink-pastel p-1 text-center shadow-xs">
                    <span className="font-cute text-[9px] font-bold text-pink-deep line-clamp-2">
                      {currentSong.title.slice(0, 14)}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-blue-ink" />
                  </div>
                </motion.div>

                {/* tone-arm */}
                <motion.div
                  animate={{ rotate: playing ? 24 : 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="pointer-events-none absolute right-2 top-2 h-20 w-3 origin-top"
                >
                  <div className="h-3 w-3 rounded-full border-2 border-white bg-[#C4A87A] shadow-xs" />
                  <div className="mx-auto h-16 w-[3px] bg-[#C4A87A]" />
                  <span className="absolute -left-[3px] bottom-0 h-2 w-2.5 rounded-sm bg-pink-deep" />
                </motion.div>
              </div>

              {/* track info + controls */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Music4 size={16} className="text-blue-deep" />
                  <p className="font-cute text-xs uppercase tracking-[0.25em] text-blue-deep">
                    Track {currentIdx + 1} of {songs.length}
                  </p>
                </div>
                <h4 className="truncate font-hand text-2xl font-bold text-blue-ink sm:text-3xl">
                  {currentSong.title}
                </h4>
                <p className="truncate font-body text-sm text-blue-ink/70">
                  {currentSong.artist}
                </p>

                <div
                  className="mt-3 h-3 w-full cursor-pointer rounded-full bg-blue-soft"
                  onClick={seek}
                  role="slider"
                  aria-label="seek"
                  aria-valuenow={Math.round(pct)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  tabIndex={0}
                >
                  <div className="relative h-full rounded-full bg-gradient-to-r from-pink-deep to-lav-deep transition-[width] duration-200" style={{ width: `${pct}%` }}>
                    <span className="absolute -right-1.5 -top-1 h-5 w-5 rounded-full border-[3px] border-white bg-pink-deep shadow-sm" />
                  </div>
                </div>
                <div className="mt-1 flex justify-between font-ui text-[11px] text-blue-ink/60">
                  <span>{fmt(pos)}</span>
                  <span>{currentSong.durationLabel || "looping"} · {fmt(effectiveDuration)}</span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggle}
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-[3px] border-white bg-pink-deep text-white shadow-scrap transition hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label={playing ? "Pause" : "Play"}
                  >
                    {playing ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
                  </button>
                  <div className="flex flex-1 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const next = !muted;
                        setMuted(next);
                        applyVolume(next ? 0 : 0.7);
                        sfx.key();
                      }}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-blue-deep/40 bg-white text-blue-ink cursor-pointer hover:bg-pink-pastel"
                      aria-label={muted ? "Unmute" : "Mute"}
                    >
                      {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={muted ? 0 : volume}
                      onChange={(e) => {
                        setMuted(false);
                        applyVolume(Number(e.target.value));
                      }}
                      className="h-1.5 flex-1 cursor-pointer accent-pink-deep"
                      aria-label="Volume"
                    />
                  </div>
                </div>

                <p className="mt-3 font-cute text-xs text-blue-deep/75">
                  mode: {mode === "file" ? "local audio file" : "synthesised music box"}
                </p>
                {error && (
                  <p className="mt-1 flex items-center gap-1 font-body text-xs text-pink-deep">
                    <AlertCircle size={12} /> {error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Directly below the music player: Yellow Quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg text-center px-2"
        >
          <div className="paper paper-dashed relative mx-auto inline-block rounded-2xl border-2 border-[#F6E7B9] bg-[#FFFDF5]/95 px-5 py-3 sm:px-7 sm:py-3.5 shadow-scrap">
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl select-none" aria-hidden="true">💛</span>
              <p className="font-hand text-xl sm:text-2xl font-bold tracking-wide text-blue-ink">
                {cfg.music.yellowQuote || "In a world full of colours, you're my Yellow. 💛"}
              </p>
              <span className="text-lg sm:text-xl select-none" aria-hidden="true">💛</span>
            </div>
          </div>
        </motion.div>

        {/* hidden single audio element for current song with preload="none" */}
        {currentSong.src && (
          <audio
            ref={audioRef}
            src={currentSong.src}
            preload="none"
            playsInline
            onTimeUpdate={(e) => {
              if (mode === "file") {
                setPos(e.currentTarget.currentTime || 0);
              }
            }}
            onLoadedMetadata={(e) => {
              if (Number.isFinite(e.currentTarget.duration)) {
                setDuration(e.currentTarget.duration);
              }
            }}
            onDurationChange={(e) => {
              if (Number.isFinite(e.currentTarget.duration)) {
                setDuration(e.currentTarget.duration);
              }
            }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => {
              setPlaying(false);
              setPos(0);
            }}
            onError={() => {
              setMode("melody");
            }}
          />
        )}

        <div className="flex flex-wrap items-center justify-center gap-2 font-cute text-sm text-blue-deep/80">
          <Sparkle size={14} className="text-pink-deep" />
          <span>four special songs · select anytime above</span>
          <Heart size={14} color="#E48BB0" />
        </div>
      </div>
    </Section>
  );
}
