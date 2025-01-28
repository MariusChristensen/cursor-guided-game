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
  define: {
    "import.meta.env.VITE_FIREBASE_API_KEY":
      "'AIzaSyDi-8StlfNmKlZVPPhS8CKCjDCIqrJfNFc'",
    "import.meta.env.VITE_FIREBASE_AUTH_DOMAIN":
      "'snakeysnake-34426.firebaseapp.com'",
    "import.meta.env.VITE_FIREBASE_PROJECT_ID": "'snakeysnake-34426'",
    "import.meta.env.VITE_FIREBASE_STORAGE_BUCKET":
      "'snakeysnake-34426.firebasestorage.app'",
    "import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID": "'701773775110'",
    "import.meta.env.VITE_FIREBASE_APP_ID":
      "'1:701773775110:web:252b8dd41bcb28ea545e87'",
    "import.meta.env.VITE_FIREBASE_MEASUREMENT_ID": "'G-S95YBN43ME'",
  },
});
