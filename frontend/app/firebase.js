import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvLL1QLVIZ84HroYkXnG2zIirkAddVnH8",
  authDomain: "posturize-ff73a.firebaseapp.com",
  projectId: "posturize-ff73a",
  storageBucket: "posturize-ff73a.appspot.com",
  messagingSenderId: "690220820681",
  appId: "1:690220820681:web:37bc586f4c81fbbaa20518",
  measurementId: "G-NTSSRZZQ0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);