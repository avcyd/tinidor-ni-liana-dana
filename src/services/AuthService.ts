import {signInWithEmailAndPassword, signOut, onAuthStateChanged, } from 'firebase/auth'
import {auth} from './firebase';
import type {User} from 'firebase/auth';

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
