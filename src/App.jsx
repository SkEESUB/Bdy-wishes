import { useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Heart, RotateCcw, Sparkles } from "lucide-react";

import ScrapbookBackground from "./components/decor/ScrapbookBackground.jsx";
import Countdown from "./components/Countdown.jsx";
import PasswordScreen from "./components/PasswordScreen.jsx";
import CandleCake from "./components/CandleCake.jsx";
import BirthdayCelebration from "./components/BirthdayCelebration.jsx";
import PhotoCollage from "./components/PhotoCollage.jsx";
import SurpriseGrid from "./components/SurpriseGrid.jsx";
import BirthdayLetter from "./components/BirthdayLetter.jsx";
import GiftBox from "./components/GiftBox.jsx";
import VinylPlayer from "./components/VinylPlayer.jsx";
import VideoGallery from "./components/VideoGallery.jsx";
import MemoryMap from "./components/MemoryMap.jsx";
import JourneyNav from "./components/JourneyNav.jsx";
import { LockedChapterCard, ScrollInvitation } from "./components/decor/JourneyLock.jsx";

import useLocalStorage from "./hooks/useLocalStorage.js";
import { useConfetti } from "./hooks/useConfetti.js";
import { birthday as cfg } from "./config/birthday.config.js";
import { sfx } from "./lib/sfx.js";
import { Balloon, Flower, Heart as HeartSticker, Sparkle } from "./components/decor/Stickers.jsx";

const CHAPTERS = [
  { id: "candles", number: 1, label: "The Candles", hint: "Blow out the candles above to unlock the celebration 🎂" },
  { id: "celebration", number: 2, label: "The Celebration", hint: "Celebrate with confetti above to open the photo album 📸" },
  { id: "collage", number: 3, label: "Polaroids & Paper", hint: "Explore your polaroid memories to discover the 12 surprises 🎁" },
  { id: "surprises", number: 4, label: "Twelve Surprises", hint: "Open at least 3 surprises to reveal the secret letter 💌" },
  { id: "letter", number: 5, label: "A Letter For You", hint: "Open the letter above to unveil the special gift box 🎀" },
  { id: "gift", number: 6, label: "The Surprise Gift", hint: "Unwrap the gift box to start our vinyl song 🎵" },
  { id: "music", number: 7, label: "Our Little Record", hint: "Listen to the melody to view our two video memories 📽️" },
  { id: "videos", number: 8, label: "Little Films", hint: "Reach the end of the videos to uncover our memory map 🗺️" },
  { id: "map", number: 9, label: "Our Memory Map", hint: "Follow the dotted path to reach the finale 🎉" },
];

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

function Scrapbook() {
  const confetti = useConfetti();
  const [unlocked, setUnlocked] = useLocalStorage("bs:unlocked-chapters", ["candles"]);

  const unlockedList = useMemo(() => {
    return Array.isArray(unlocked) && unlocked.length > 0 ? unlocked : ["candles"];
  }, [unlocked]);

  const unlockNext = useCallback(
    (currentId) => {
      const idx = CHAPTERS.findIndex((c) => c.id === currentId);
      if (idx !== -1 && idx < CHAPTERS.length - 1) {
        const nextId = CHAPTERS[idx + 1].id;
        setUnlocked((prev) => {
          const list = Array.isArray(prev) ? prev : ["candles"];
          if (list.includes(nextId)) return list;
          return [...list, nextId];
        });
      }
    },
    [setUnlocked]
  );

  const isUnlocked = useCallback((id) => unlockedList.includes(id), [unlockedList]);

  // Find the immediate next locked chapter to show as a locked preview card
  const nextLockedChapter = useMemo(() => {
    return CHAPTERS.find((c) => !unlockedList.includes(c.id)) || null;
  }, [unlockedList]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <JourneyNav unlockedSections={unlockedList} />

      {/* opening header */}
      <header className="relative mx-auto w-full max-w-4xl px-4 pt-14 pb-4 text-center sm:pt-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <Balloon className="anim-float absolute left-[8%] top-[6%]" size={30} color="#F9C8D9" />
          <Balloon className="anim-float absolute right-[10%] top-[12%]" size={26} color="#BBDFF5" style={{ animationDelay: "1.2s" }} />
          <Flower className="anim-sway absolute left-[16%] bottom-[10%]" size={24} petal="#DCD4F2" center="#FFE9B8" />
          <Sparkle className="anim-twinkle absolute right-[20%] bottom-[18%]" size={16} color="#fff" />
        </div>
        <span className="sticker inline-flex rotate-[-3deg] items-center gap-2 rounded-full border-[3px] border-white bg-white/85 px-4 py-1.5 font-cute text-sm text-pink-deep shadow-sm">
          <Sparkles size={15} /> a hand-made scrapbook for {cfg.recipient.name}
        </span>
        <h1 className="mt-4 font-hand text-5xl leading-tight font-bold text-blue-ink sm:text-6xl md:text-7xl">
          Happy Birthday,
          <br />
          {cfg.recipient.name}!
        </h1>
        <p className="mx-auto mt-3 max-w-xl font-body text-base text-blue-ink/80 sm:text-lg">
          {cfg.recipient.tagline}
        </p>
        <p className="mt-2 font-cute text-base text-blue-deep/80">9 little chapters · scroll slowly 🤍</p>
        <button
          type="button"
          onClick={() => scrollToId("candles")}
          className="mt-6 inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-blue-deep px-5 py-3 font-cute text-base font-bold text-white shadow-scrap transition hover:scale-105 active:scale-95"
        >
          <ArrowDown size={16} /> start with the candles
        </button>
      </header>

      {/* CHAPTER 1 — CANDLES */}
      <CandleCake
        onComplete={() => {
          unlockNext("candles");
          setTimeout(() => scrollToId("celebration"), 400);
        }}
      />

      {isUnlocked("celebration") && (
        <ScrollInvitation
          targetId="celebration"
          targetLabel="The Celebration"
          chapterNumber={2}
          onScrollClick={() => scrollToId("celebration")}
        />
      )}

      {/* CHAPTER 2 — CELEBRATION */}
      {isUnlocked("celebration") && (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <BirthdayCelebration
            onComplete={() => {
              unlockNext("celebration");
            }}
          />
        </motion.div>
      )}

      {isUnlocked("celebration") && isUnlocked("collage") && (
        <ScrollInvitation
          targetId="collage"
          targetLabel="Photo Memories"
          chapterNumber={3}
          onScrollClick={() => scrollToId("collage")}
        />
      )}

      {/* CHAPTER 3 — MEMORIES (PHOTO COLLAGE) */}
      {isUnlocked("collage") && (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <PhotoCollage
            onComplete={() => {
              unlockNext("collage");
            }}
          />
        </motion.div>
      )}

      {isUnlocked("collage") && isUnlocked("surprises") && (
        <ScrollInvitation
          targetId="surprises"
          targetLabel="12 Surprises"
          chapterNumber={4}
          onScrollClick={() => scrollToId("surprises")}
        />
      )}

      {/* CHAPTER 4 — 12 SURPRISES */}
      {isUnlocked("surprises") && (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <SurpriseGrid
            onComplete={() => {
              unlockNext("surprises");
            }}
          />
        </motion.div>
      )}

      {isUnlocked("surprises") && isUnlocked("letter") && (
        <ScrollInvitation
          targetId="letter"
          targetLabel="The Secret Letter"
          chapterNumber={5}
          onScrollClick={() => scrollToId("letter")}
        />
      )}

      {/* CHAPTER 5 — BIRTHDAY LETTER */}
      {isUnlocked("letter") && (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <BirthdayLetter
            onComplete={() => {
              unlockNext("letter");
            }}
          />
        </motion.div>
      )}

      {isUnlocked("letter") && isUnlocked("gift") && (
        <ScrollInvitation
          targetId="gift"
          targetLabel="The Special Gift"
          chapterNumber={6}
          onScrollClick={() => scrollToId("gift")}
        />
      )}

      {/* CHAPTER 6 — GIFT BOX */}
      {isUnlocked("gift") && (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <GiftBox
            onComplete={() => {
              unlockNext("gift");
            }}
          />
        </motion.div>
      )}

      {isUnlocked("gift") && isUnlocked("music") && (
        <ScrollInvitation
          targetId="music"
          targetLabel="Our Melody Record"
          chapterNumber={7}
          onScrollClick={() => scrollToId("music")}
        />
      )}

      {/* CHAPTER 7 — VINYL PLAYER */}
      {isUnlocked("music") && (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <VinylPlayer
            onComplete={() => {
              unlockNext("music");
            }}
          />
        </motion.div>
      )}

      {isUnlocked("music") && isUnlocked("videos") && (
        <ScrollInvitation
          targetId="videos"
          targetLabel="Two Little Films"
          chapterNumber={8}
          onScrollClick={() => scrollToId("videos")}
        />
      )}

      {/* CHAPTER 8 — VIDEO GALLERY (EXACTLY TWO VIDEOS) */}
      {isUnlocked("videos") && (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <VideoGallery
            onComplete={() => {
              unlockNext("videos");
            }}
          />
        </motion.div>
      )}

      {isUnlocked("videos") && isUnlocked("map") && (
        <ScrollInvitation
          targetId="map"
          targetLabel="Our Memory Map"
          chapterNumber={9}
          onScrollClick={() => scrollToId("map")}
        />
      )}

      {/* CHAPTER 9 — MEMORY MAP */}
      {isUnlocked("map") && (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <MemoryMap
            onComplete={() => {
              /* Finale unlocked */
            }}
          />
        </motion.div>
      )}

      {/* LOCKED CHAPTER PREVIEW — ONLY FOR THE IMMEDIATE NEXT LOCKED CHAPTER */}
      {nextLockedChapter && (
        <LockedChapterCard
          number={nextLockedChapter.number}
          label={nextLockedChapter.label}
          hint={nextLockedChapter.hint}
        />
      )}

      {/* FINALE FOOTER */}
      <footer className="relative mx-auto w-full max-w-3xl px-4 pt-10 pb-20 text-center">
        <div className="paper paper-dashed p-6 sm:p-8">
          <div className="mb-3 flex items-center justify-center gap-2" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <HeartSticker key={i} className="anim-float" size={20} color={["#E48BB0", "#6FA8D6", "#A48FD0"][i]} style={{ animationDelay: `${i * 0.25}s` }} />
            ))}
          </div>
          <h2 className="font-hand text-3xl font-bold text-blue-ink sm:text-4xl">
            the end of the scrapbook, the start of your year
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-blue-ink/80">
            Made by hand, byte by byte, for {cfg.recipient.name}. Every name, photo, wish and surprise
            in here can be edited in one central file: <code className="rounded bg-white px-1.5 py-0.5">src/config/birthday.config.js</code>.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                confetti.bigBang();
                sfx.party();
              }}
              className="inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-pink-deep px-5 py-3 font-cute text-base font-bold text-white shadow-scrap transition hover:scale-105 active:scale-95"
            >
              <Sparkles size={16} /> one last confetti
            </button>
            <button
              type="button"
              onClick={() => {
                try {
                  Object.keys(window.localStorage)
                    .filter((k) => k.startsWith("bs:"))
                    .forEach((k) => window.localStorage.removeItem(k));
                } catch {
                  /* ignore */
                }
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 rounded-full border-2 border-blue-deep/40 bg-white px-5 py-3 font-cute text-base text-blue-ink transition hover:bg-blue-soft active:scale-95"
            >
              <RotateCcw size={15} /> start the whole surprise over
            </button>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border-2 border-blue-deep/40 bg-white px-5 py-3 font-cute text-base text-blue-ink transition hover:bg-pink-soft active:scale-95"
            >
              <ArrowDown size={15} className="rotate-180" /> back to the top
            </button>
          </div>
          <p className="mt-5 flex items-center justify-center gap-1.5 font-cute text-sm text-blue-deep/70">
            made with <Heart size={13} color="#E48BB0" /> and far too much frosting
          </p>
        </div>
      </footer>
    </motion.div>
  );
}

export default function App() {
  const [stage, setStage] = useLocalStorage("bs:stage", "countdown");
  const confetti = useConfetti();

  const unlock = useCallback(() => {
    confetti.bigBang();
    setStage("scrapbook");
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [confetti, setStage]);

  return (
    <div className="relative min-h-[100svh] w-full overflow-x-clip">
      <ScrapbookBackground variant="blue" floaters={18} />

      <AnimatePresence mode="wait">
        {stage === "countdown" && (
          <motion.div key="countdown" exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }} transition={{ duration: 0.5 }}>
            <Countdown
              onOpen={() => setStage("password")}
              onSkip={() => {
                try {
                  localStorage.setItem("bs:countdown-bypassed", "true");
                } catch {}
                setStage("password");
              }}
            />
          </motion.div>
        )}

        {stage === "password" && (
          <motion.div
            key="password"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
            transition={{ duration: 0.5 }}
          >
            <PasswordScreen onUnlock={unlock} />
          </motion.div>
        )}

        {stage === "scrapbook" && (
          <motion.div key="scrapbook" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Scrapbook />
          </motion.div>
        )}
      </AnimatePresence>

      <span className="sr-only">
        Interactive birthday scrapbook with countdown, password, candles, celebration,
        photos, surprises, letter, gift, music, videos and memory map.
      </span>
    </div>
  );
}
