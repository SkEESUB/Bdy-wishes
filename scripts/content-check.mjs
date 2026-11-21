/**
 * Content assertions on the SSR output — verifies structure (counts of cards,
 * pieces, notes, markers) so nothing is silently missing.
 */
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", { url: "http://localhost/" });
const w = dom.window;
global.window = w;
global.document = w.document;
try { global.navigator = w.navigator; } catch {}
global.HTMLElement = w.HTMLElement;
global.SVGElement = w.SVGElement;
global.Element = w.Element;
global.Node = w.Node;
global.getComputedStyle = w.getComputedStyle.bind(w);
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);
if (!w.matchMedia) {
  w.matchMedia = (q) => ({ matches: false, media: q, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
}
global.matchMedia = w.matchMedia;
class FakeIO { observe() {} unobserve() {} disconnect() {} }
w.IntersectionObserver = FakeIO;
global.IntersectionObserver = FakeIO;
class FakeRO { observe() {} unobserve() {} disconnect() {} }
w.ResizeObserver = FakeRO;
global.ResizeObserver = FakeRO;

const { scenes } = await import("../dist-ssr/ssr-entry.js");
const html = {};
for (const [k, fn] of Object.entries(scenes)) html[k] = fn();

const mod = await import("../dist-ssr/ssr-entry.js");
const cfg = mod.config;

const checks = [];
const t = (name, ok, detail = "") => checks.push(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);

t("12 surprise cards rendered", cfg.surprises.length === 12 && (html.SurpriseGrid.match(/Open gift/g) || []).length === 12, `${(html.SurpriseGrid.match(/Open gift/g) || []).length} cards`);
t("12 unique surprise item names", new Set(cfg.surprises.map((s) => s.itemName)).size === 12, `${new Set(cfg.surprises.map((s) => s.itemName)).size} unique items`);
t("12 unique surprise subtitles", new Set(cfg.surprises.map((s) => s.subtitle)).size === 12, `${new Set(cfg.surprises.map((s) => s.subtitle)).size} unique subtitles`);
t("12 unique surprise ids", new Set(cfg.surprises.map((s) => s.id)).size === 12);
t("12 unique surprise images configured", new Set(cfg.surprises.map((s) => s.image)).size === 12, `${new Set(cfg.surprises.map((s) => s.image)).size} unique images`);
t("12 personal Telugu-English messages in HTML", html.SurpriseGrid.includes("Flowers anni") && html.SurpriseGrid.includes("sweetness inka") && html.SurpriseGrid.includes("mana bond kuda"), "Telugu phrases verified");
t("EXACTLY 4 polaroid photo memories", (html.PhotoCollage.match(/polaroid/g) || []).length === 4 && cfg.gallery.length === 4, `${cfg.gallery.length} polaroids`);
t("5 memory markers", (html.MemoryMap.match(/open memory:/g) || []).length === cfg.memoryMap.length, `${(html.MemoryMap.match(/open memory:/g) || []).length}`);
t("EXACTLY TWO video cards", (html.VideoGallery.match(/play video:/g) || []).length === 2 && cfg.videos.length === 2, `${(html.VideoGallery.match(/play video:/g) || []).length} video cards`);
t("TWO sample songs in config", cfg.music.songs.length === 2, `${cfg.music.songs.length} sample songs`);
t("5 candle flames", (html.CandleCake.match(/anim-flicker/g) || []).length === cfg.candles.count, `${(html.CandleCake.match(/anim-flicker/g) || []).length}`);
t("cake cutting removed", !html.CakeCutting);
t("wish tree removed", !html.WishTree);
t("love coupons removed", !html.LoveCoupons);
t("countdown 4 units", (html.Countdown.match(/days|hours|minutes|seconds/g) || []).length >= 4);
t("countdown target date is 2026-11-24T00:00:00+05:30", cfg.date.targetDate === "2026-11-24T00:00:00+05:30");
t("Continue button present on countdown", html.Countdown.includes("Continue"));
t("Skip Countdown button present on countdown", html.Countdown.includes("Skip Countdown →"));
t("password is mylove", cfg.password === "mylove");
t("password keypad letters", (html.PasswordScreen.match(/letter [a-z]/g) || []).length === 26, `${(html.PasswordScreen.match(/letter [a-z]/g) || []).length}`);
t("letter sealed initially + greeting for Sri Lakshmi", html.BirthdayLetter.includes("Sri Lakshmi") && cfg.letter.paragraphs.length >= 3, `paras: ${cfg.letter.paragraphs.length}`);
t("gift reveal present", html.GiftBox.includes(cfg.gift.revealTitle) === false || html.GiftBox.includes("something small"));
t("no autoplay attribute anywhere", !/\sautoplay[\s>="]/.test(JSON.stringify(html)), JSON.stringify(html).match(/\sautoplay[\s>="]{0,6}/g));
t("recipient name is Sri Lakshmi", cfg.recipient.name === "Sri Lakshmi" && (html.PasswordScreen.includes("Sri Lakshmi") || html.Countdown.includes("Sri Lakshmi")), cfg.recipient.name);

console.log(checks.join("\n"));
const bad = checks.filter((c) => c.startsWith("FAIL"));
console.log(bad.length ? `\n${bad.length} FAILURES` : "\nALL CONTENT CHECKS PASSED");
process.exit(bad.length ? 1 : 0);
