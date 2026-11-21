import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Separate config used ONLY by the render smoke test (npm run check:render).
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: path.resolve(__dirname, "scripts/ssr-entry.jsx"),
    outDir: "dist-ssr",
    emptyOutDir: true,
    minify: false,
    rollupOptions: { output: { format: "es" } },
  },
});
