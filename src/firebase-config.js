import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDi-8StlfNmKlZVPPhS8CKCjDCIqrJfNFc",
  authDomain: "snakeysnake-34426.firebaseapp.com",
  projectId: "snakeysnake-34426",
  storageBucket: "snakeysnake-34426.firebasestorage.app",
  messagingSenderId: "701773775110",
  appId: "1:701773775110:web:252b8dd41bcb28ea545e87",
  measurementId: "G-S95YBN43ME",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
