import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";

// Get all users (admin only)
export function subscribeToUsers(callback, errorCallback) {
  const q = query(collection(db, "users"), orderBy("lastLogin", "desc"));
  
  return onSnapshot(q, 
    (snapshot) => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(users);
    },
    (error) => {
      console.error("Error fetching users:", error);
      errorCallback && errorCallback(error);
    }
  );
}

// Make user admin
export async function makeAdmin(uid) {
  try {
    await setDoc(doc(db, "admins", uid), {
      role: "admin",
      addedAt: serverTimestamp()
    });
    console.log(`User ${uid} is now an admin`);
  } catch (error) {
    console.error("Error making user admin:", error);
    throw error;
  }
}

// Revoke admin status
export async function revokeAdmin(uid) {
  try {
    await deleteDoc(doc(db, "admins", uid));
    console.log(`Admin status revoked for user ${uid}`);
  } catch (error) {
    console.error("Error revoking admin:", error);
    throw error;
  }
}

// Check if user is admin (for admin panel access)
export async function checkAdminStatus(uid) {
  if (!uid) return false;
  try {
    const adminDoc = await getDoc(doc(db, "admins", uid));
    return adminDoc.exists();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

// Format timestamp for display
export function formatTimestamp(timestamp) {
  if (!timestamp || !timestamp.seconds) return "Never";
  return new Date(timestamp.seconds * 1000).toLocaleString();
}

// Filter users by search term (name or email)
export function filterUsers(users, searchTerm) {
  if (!searchTerm) return users;
  
  const term = searchTerm.toLowerCase();
  return users.filter(user => 
    (user.name && user.name.toLowerCase().includes(term)) ||
    (user.email && user.email.toLowerCase().includes(term))
  );
}

// Filter users by provider
export function filterUsersByProvider(users, provider) {
  if (!provider || provider === "all") return users;
  return users.filter(user => user.provider === provider);
}
