import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBOaqM6PMTIxr0AkAsNaLSFNTAjpgykuMU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ast-macrame.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ast-macrame",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ast-macrame.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "894497035146",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:894497035146:web:e9c7a3abc6c5a74948ee73",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-N6QN73N31G"
};

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
