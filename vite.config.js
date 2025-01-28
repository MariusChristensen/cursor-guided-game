import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "./",
  build: {
    target: "esnext",
    outDir: "../docs",
    emptyOutDir: true,
  },
  envDir: "../",
});
