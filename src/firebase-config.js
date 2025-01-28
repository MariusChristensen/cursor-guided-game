/**
 * Firebase Configuration and Initialization
 * Sets up Firebase connection for high score management
 */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//=============================================================================
// FIREBASE CONFIGURATION
//=============================================================================

/**
 * Firebase configuration object
 * All sensitive values are loaded from environment variables
 * @see .env file for variable definitions
 */
const firebaseConfig = {
  // Authentication
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

  // Project Settings
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

  // Messaging
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,

  // App Identifiers
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Add this at the top of your config validation
const requiredEnvVars = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
  "VITE_FIREBASE_MEASUREMENT_ID",
];

const missingEnvVars = requiredEnvVars.filter(
  (varName) => !import.meta.env[varName]
);

if (missingEnvVars.length > 0) {
  console.error("Missing required environment variables:", missingEnvVars);
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
}

// Add detailed logging
console.log("Initializing Firebase with config:", {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? "exists" : "missing",
  appId: firebaseConfig.appId ? "exists" : "missing",
  projectId: firebaseConfig.projectId,
});

//=============================================================================
// FIREBASE INITIALIZATION
//=============================================================================

let db;

try {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  db = getFirestore(app);

  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

export { db };
