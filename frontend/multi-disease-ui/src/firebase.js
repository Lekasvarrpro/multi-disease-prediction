// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";           // Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Firestore Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsFKJl1vOWHxeCBPw67ubbgfAyHfyXUR4",
  authDomain: "predictranova.firebaseapp.com",
  projectId: "predictranova",
  storageBucket: "predictranova.firebasestorage.app",
  messagingSenderId: "291802393707",
  appId: "1:291802393707:web:fcfa18fcee0602d492d52e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;