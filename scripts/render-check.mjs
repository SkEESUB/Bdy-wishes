/**
 * SSR render smoke test — renders every section in isolation to catch runtime
 * errors (missing imports, bad hooks, invalid SVG/JSX) without a browser.
 * Run with:  npm run check:render
 */
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  url: "http://localhost/",
  pretendToBeVisual: true,
});

const w = dom.window;
global.window = w;
global.document = w.document;
try { global.navigator = w.navigator; } catch {}
global.HTMLElement = w.HTMLElement;
global.HTMLIFrameElement = w.HTMLIFrameElement;
global.SVGElement = w.SVGElement;
global.Element = w.Element;
global.Node = w.Node;
global.getComputedStyle = w.getComputedStyle.bind(w);
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);

if (!w.matchMedia) {
  w.matchMedia = (q) => ({
    matches: false,
    media: q,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
  });
}
global.matchMedia = w.matchMedia;

class FakeIO {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
w.IntersectionObserver = FakeIO;
global.IntersectionObserver = FakeIO;

if (!w.ResizeObserver) {
  class FakeRO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  w.ResizeObserver = FakeRO;
  global.ResizeObserver = FakeRO;
}

const results = [];
let mod;
try {
  mod = await import("../dist-ssr/ssr-entry.js");
} catch (e) {
  console.error("IMPORT FAILED:", e);
  process.exit(1);
}

for (const name of Object.keys(mod.scenes)) {
  const start = Date.now();
  try {
    const html = mod.scenes[name]();
    const len = html.length;
    if (len < 200) throw new Error(`suspiciously small output (${len} chars)`);
    results.push(`PASS ${name} (${len} chars, ${Date.now() - start}ms)`);
  } catch (e) {
    results.push(`FAIL ${name}: ${e && e.message}\n${(e && e.stack || "").split("\n").slice(0, 4).join("\n")}`);
  }
}

console.log(results.join("\n"));
const failed = results.filter((r) => r.startsWith("FAIL"));
console.log(failed.length ? `\n${failed.length} FAILURES` : "\nALL COMPONENTS RENDER OK");
process.exit(failed.length ? 1 : 0);
