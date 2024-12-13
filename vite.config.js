import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/cursor-guided-game/", // Must match your repo name exactly
  build: {
    target: "esnext",
    outDir: "../dist",
    emptyOutDir: true,
  },
  envDir: "../",
});
