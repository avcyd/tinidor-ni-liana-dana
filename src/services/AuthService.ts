import {signInWithEmailAndPassword, signOut, onAuthStateChanged, } from 'firebase/auth'
import {auth} from './firebase';
import type {User} from 'firebase/auth';

const firebaseAuthErrors: Record<string, string> = {
  "auth/invalid-email": "The email address format is invalid. Please check and try again.",
  "auth/email-already-in-use": "This email is already registered. Try logging in instead.",
  "auth/weak-password": "Password is too weak. Use at least 8 characters with a mix of letters and numbers.",
  "auth/user-not-found": "No account found with this email address.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
};

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    for (const [code, msg] of Object.entries(firebaseAuthErrors)) {
      if (error.message.includes(code)) return msg;
    }
  }
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}

export const login = async (email: string, password: string): Promise<User> => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export const logout = async(): Promise<void> => {
  await signOut(auth);
}

export const getCurrentUser = (): User | null =>{
  return auth.currentUser;
}

export const doOnAuthStateChange = (callback: (user:User | null)=>void) =>{
  return onAuthStateChanged(auth, callback);
}
