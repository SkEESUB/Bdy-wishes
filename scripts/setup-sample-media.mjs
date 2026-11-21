import fs from "fs";
import path from "path";

const dirs = [
  "public/assets/music",
  "src/assets/music",
  "public/assets/videos",
  "src/assets/videos",
];

dirs.forEach((d) => {
  const p = path.resolve(d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// Create minimal valid MP3 frame (MPEG-1 Layer 3, 128kbps, 44.1kHz, silent/padding)
// Sync word 0xFFFB (or 0xFFF3)
const mp3Frame = Buffer.from([
  0xff, 0xfb, 0x90, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
]);
const mp3Buffer = Buffer.concat(Array.from({ length: 60 }, () => mp3Frame));

["public/assets/music", "src/assets/music"].forEach((dir) => {
  fs.writeFileSync(path.join(dir, "sample-song-01.mp3"), mp3Buffer);
  fs.writeFileSync(path.join(dir, "sample-song-02.mp3"), mp3Buffer);
});

// Create placeholder MP4 container header
const mp4Header = Buffer.from([
  0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, // ftyp box length 24
  0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00, 0x02, 0x00, // isom
  0x69, 0x73, 0x6f, 0x6d, 0x69, 0x73, 0x6f, 0x32,
  0x00, 0x00, 0x00, 0x08, 0x66, 0x72, 0x65, 0x65, // free box
]);

["public/assets/videos", "src/assets/videos"].forEach((dir) => {
  fs.writeFileSync(path.join(dir, "sample-video-01.mp4"), mp4Header);
  fs.writeFileSync(path.join(dir, "sample-video-02.mp4"), mp4Header);
});

console.log("Created sample-song-01.mp3, sample-song-02.mp3, sample-video-01.mp4, sample-video-02.mp4");
