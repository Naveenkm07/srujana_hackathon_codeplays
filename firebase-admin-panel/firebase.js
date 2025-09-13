import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq6YoBVWBwhEHvhUKNRhYhYCO1gTb3ABC",
  authDomain: "windsurf-admin-demo.firebaseapp.com",
  projectId: "windsurf-admin-demo", 
  storageBucket: "windsurf-admin-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456789"
};

// Instructions:
// 1. Go to Firebase Console: https://console.firebase.google.com/
// 2. Create a new project or select existing one
// 3. Go to Project Settings → General → Your apps
// 4. Add web app and copy the config object
// 5. Replace the placeholder values above with your actual config

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
