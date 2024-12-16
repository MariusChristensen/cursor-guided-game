import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/cursor-guided-game/",
  build: {
    target: "esnext",
    outDir: "../docs", // Changed from '../dist' to '../docs' for GitHub Pages
    emptyOutDir: true,
  },
  envDir: "../",
});
