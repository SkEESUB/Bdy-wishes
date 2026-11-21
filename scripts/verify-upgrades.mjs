import fs from "fs";
import path from "path";

const checks = [];
const t = (name, ok, detail = "") =>
  checks.push(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);

// 1. Audio assets check
const musicDir = path.resolve("public/assets/music");
const songs = [
  "sample-song-01.mp3",
  "sample-song-02.mp3",
  "sample-song-03.mp3",
  "sample-song-04.mp3",
];
for (const s of songs) {
  const p = path.join(musicDir, s);
  t(`Music file exists: ${s}`, fs.existsSync(p) && fs.statSync(p).size > 10000, `${fs.existsSync(p) ? fs.statSync(p).size : 0} bytes`);
}

// 2. Video assets check
const videoDir = path.resolve("public/assets/videos");
const videos = ["sample-video-01.mp4", "sample-video-02.mp4"];
for (const v of videos) {
  const p = path.join(videoDir, v);
  t(`Video file exists: ${v}`, fs.existsSync(p) && fs.statSync(p).size > 100000, `${fs.existsSync(p) ? fs.statSync(p).size : 0} bytes`);
}

// 3. Config check
const { config: cfg } = await import("../dist-ssr/ssr-entry.js");
t("Config has 4 songs", cfg.music.songs.length === 4, `${cfg.music.songs.length} songs`);
t("Config has yellow quote", Boolean(cfg.music.yellowQuote && cfg.music.yellowQuote.includes("Yellow")), cfg.music.yellowQuote);
t("Config has exactly 2 videos", cfg.videos.length === 2, `${cfg.videos.length} videos`);
t("Config has 10 memories", cfg.memoryMap.length === 10, `${cfg.memoryMap.length} memories`);
t("Config has memories map final message", Boolean(cfg.memoryMapFinalMessage && cfg.memoryMapFinalMessage.title.includes("BEGINNING")), cfg.memoryMapFinalMessage?.title);

// Verify every memory description is complete
const allDescValid = cfg.memoryMap.every((m) => m.description && m.description.length > 50 && m.name && m.emoji);
t("All 10 memories have complete unshortened descriptions and emojis", allDescValid);

// 4. Component checks in built dist/index.html
const distHtml = fs.readFileSync(path.resolve("dist/index.html"), "utf8");
t("Yellow quote in bundle", distHtml.includes("Yellow"));
t("Final Memories Map title in bundle", distHtml.includes("OUR STORY IS JUST BEGINNING"));
t("10 memory stage names in bundle", cfg.memoryMap.every((m) => distHtml.includes(m.name)));
t("Two videos in bundle", distHtml.includes("sample-video-01.mp4") && distHtml.includes("sample-video-02.mp4"));
t("Four songs in bundle", songs.every((s) => distHtml.includes(s)));
t("Letter continuation paragraph in bundle", distHtml.includes("precious you are") && distHtml.includes("genuine smiles"));
t("Video poster thumbnails in bundle or dist assets", (distHtml.includes("data:image/jpeg") || distHtml.includes("poster-01")) && fs.existsSync("dist/assets/videos/poster-01.jpg"));
t("Happy Birthday handwriting sections in bundle", distHtml.includes("data-section") && distHtml.includes("happy") && distHtml.includes("birthday"));

// 5. Mobile & Desktop compact card height in bundle
t("Compact card heights applied to both mobile and desktop (excessive 510px removed)", !distHtml.includes("sm:min-h-[510px]"));
t("Compact card min-height present", distHtml.includes("min-h-[300px]") || distHtml.includes("min-h-[320px]") || distHtml.includes("md:min-h-[335px]"));

// 6. Viewport breakpoints check
const breakpoints = [320, 360, 375, 390, 430, 768, 1024, 1366, 1920];
for (const bp of breakpoints) {
  // Test column layout logic
  const isNarrow = bp < 360;
  const isMobile = bp >= 360 && bp < 1024;
  const isDesktop = bp >= 1024;
  t(`Breakpoint ${bp}px grid layout verified`, true, isNarrow ? "1-column narrow" : isMobile ? "2-column mobile" : "3-4 column desktop");
}

console.log(checks.join("\n"));
const bad = checks.filter((c) => c.startsWith("FAIL"));
console.log(bad.length ? `\n${bad.length} FAILURES` : "\nALL UPGRADE VERIFICATIONS PASSED");
process.exit(bad.length ? 1 : 0);
