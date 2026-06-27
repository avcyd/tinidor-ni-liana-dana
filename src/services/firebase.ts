import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlvY87qPvP68wOZjCUXj68ugID1Bxt37A",
  authDomain: "new-media-fst.firebaseapp.com",
  projectId: "new-media-fst",
  storageBucket: "new-media-fst.firebasestorage.app",
  messagingSenderId: "1025036095673",
  appId: "1:1025036095673:web:90387d3752168dc6aa4b68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
