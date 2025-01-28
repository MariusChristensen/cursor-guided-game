import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  console.log("Current working directory:", process.cwd());
  console.log("Environment variables:", {
    VITE_FIREBASE_API_KEY: env.VITE_FIREBASE_API_KEY ? "exists" : "missing",
    VITE_FIREBASE_AUTH_DOMAIN: env.VITE_FIREBASE_AUTH_DOMAIN
      ? "exists"
      : "missing",
    VITE_FIREBASE_PROJECT_ID: env.VITE_FIREBASE_PROJECT_ID
      ? "exists"
      : "missing",
    VITE_FIREBASE_STORAGE_BUCKET: env.VITE_FIREBASE_STORAGE_BUCKET
      ? "exists"
      : "missing",
    VITE_FIREBASE_MESSAGING_SENDER_ID: env.VITE_FIREBASE_MESSAGING_SENDER_ID
      ? "exists"
      : "missing",
    VITE_FIREBASE_APP_ID: env.VITE_FIREBASE_APP_ID ? "exists" : "missing",
    VITE_FIREBASE_MEASUREMENT_ID: env.VITE_FIREBASE_MEASUREMENT_ID
      ? "exists"
      : "missing",
  });

  return {
    root: "src",
    base: "./",
    build: {
      target: "esnext",
      outDir: "../docs",
      emptyOutDir: true,
    },
    envDir: "../",
    define: {
      "import.meta.env.VITE_FIREBASE_API_KEY": JSON.stringify(
        env.VITE_FIREBASE_API_KEY
      ),
      "import.meta.env.VITE_FIREBASE_AUTH_DOMAIN": JSON.stringify(
        env.VITE_FIREBASE_AUTH_DOMAIN
      ),
      "import.meta.env.VITE_FIREBASE_PROJECT_ID": JSON.stringify(
        env.VITE_FIREBASE_PROJECT_ID
      ),
      "import.meta.env.VITE_FIREBASE_STORAGE_BUCKET": JSON.stringify(
        env.VITE_FIREBASE_STORAGE_BUCKET
      ),
      "import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
        env.VITE_FIREBASE_MESSAGING_SENDER_ID
      ),
      "import.meta.env.VITE_FIREBASE_APP_ID": JSON.stringify(
        env.VITE_FIREBASE_APP_ID
      ),
      "import.meta.env.VITE_FIREBASE_MEASUREMENT_ID": JSON.stringify(
        env.VITE_FIREBASE_MEASUREMENT_ID
      ),
    },
  };
});
