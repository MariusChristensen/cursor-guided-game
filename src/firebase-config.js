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

//=============================================================================
// FIREBASE INITIALIZATION
//=============================================================================

/** Initialize Firebase application instance */
const app = initializeApp(firebaseConfig);

/** Initialize Firestore database instance */
const db = getFirestore(app);

export { db };
