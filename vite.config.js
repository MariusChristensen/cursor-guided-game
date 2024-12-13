import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/cursor-guided-game/", // Add this line - should match your repo name
  build: {
    target: "esnext",
    outDir: "../dist", // Add this line
    emptyOutDir: true, // Add this line
  },
  envDir: "../",
});
