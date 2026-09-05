import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOaqM6PMTIxr0AkAsNaLSFNTAjpgykuMU",
  authDomain: "ast-macrame.firebaseapp.com",
  projectId: "ast-macrame",
  storageBucket: "ast-macrame.firebasestorage.app",
  messagingSenderId: "894497035146",
  appId: "1:894497035146:web:e9c7a3abc6c5a74948ee73",
  measurementId: "G-N6QN73N31G"
};

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
