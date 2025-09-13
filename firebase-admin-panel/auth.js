import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { auth, googleProvider, db } from "./firebase";

// Upsert user document in Firestore when user signs in
export async function upsertUser(user) {
  if (!user) return;
  
  const userRef = doc(db, "users", user.uid);
  const provider = user.providerData?.[0]?.providerId || "password";
  
  // Check if user document already exists to preserve createdAt
  const userDoc = await getDoc(userRef);
  const userData = {
    uid: user.uid,
    name: user.displayName || user.email?.split('@')[0] || null,
    email: user.email || null,
    provider: provider,
    lastLogin: serverTimestamp()
  };
  
  // Only set createdAt if this is a new user
  if (!userDoc.exists()) {
    userData.createdAt = serverTimestamp();
  }
  
  await setDoc(userRef, userData, { merge: true });
  console.log(`User ${user.email} logged in via ${provider}`);
}

// Check if user is admin
export async function isUserAdmin(uid) {
  if (!uid) return false;
  try {
    const adminDoc = await getDoc(doc(db, "admins", uid));
    return adminDoc.exists();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

// Google Sign-In
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await upsertUser(result.user);
    return result.user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
}

// Email/Password Sign-In
export async function loginWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await upsertUser(result.user);
    return result.user;
  } catch (error) {
    console.error("Email sign-in error:", error);
    throw error;
  }
}

// Email/Password Sign-Up
export async function signUpWithEmail(email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await upsertUser(result.user);
    return result.user;
  } catch (error) {
    console.error("Email sign-up error:", error);
    throw error;
  }
}

// Sign Out
export async function logout() {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Sign-out error:", error);
    throw error;
  }
}

// Auth state listener
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
