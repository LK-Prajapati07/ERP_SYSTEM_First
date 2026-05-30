import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean);

const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null;
export const auth = app ? getAuth(app) : null;
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

if (auth) {
  setPersistence(auth, browserLocalPersistence).catch(() => {});
}

export const assertFirebaseConfig = () => {
  if (!hasFirebaseConfig || !auth) {
    throw new Error(
      "Firebase is not configured. Add the Vite Firebase env values before signing in."
    );
  }
};
