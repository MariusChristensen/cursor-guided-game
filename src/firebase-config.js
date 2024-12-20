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
  apiKey: "AIzaSyDi-8StlfNmKlZVPPhS8CKCjDCIqrJfNFc",
  authDomain: "snakeysnake-34426.firebaseapp.com",

  // Project Settings
  projectId: "snakeysnake-34426",
  storageBucket: "snakeysnake-34426.firebasestorage.app",

  // Messaging
  messagingSenderId: "701773775110",

  // App Identifiers
  appId: "1:701773775110:web:252b8dd41bcb28ea545e87",
  measurementId: "G-S95YBN43ME",
};

// Add this logging
console.log("Firebase Config:", {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? "exists" : "missing",
  appId: firebaseConfig.appId ? "exists" : "missing",
});

//=============================================================================
// FIREBASE INITIALIZATION
//=============================================================================

/** Initialize Firebase application instance */
const app = initializeApp(firebaseConfig);

/** Initialize Firestore database instance */
const db = getFirestore(app);

export { db };
